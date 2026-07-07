import { attendanceStatuses } from '../models/Attendance.js';
import { awardXp, createId, publicUser, readData, unlockAchievement, writeData } from '../data/store.js';

export function listAttendance(req, res) {
  const data = readData();
  return res.json(
    data.attendance.map((record) => ({
      ...record,
      user: publicUser(data.users.find((user) => user.id === record.userId)),
      course: data.courses.find((course) => course.id === record.courseId)
    }))
  );
}

export function saveAttendance(req, res) {
  const data = readData();
  const { userId, courseId, sessionDate, status, notes = '' } = req.body;

  if (!userId || !courseId || !sessionDate || !status) {
    return res.status(400).json({ message: 'Completa estudiante, curso, fecha y estado' });
  }

  if (!attendanceStatuses.includes(status)) {
    return res.status(400).json({ message: 'Estado de asistencia invalido' });
  }

  const user = data.users.find((item) => item.id === userId);
  const course = data.courses.find((item) => item.id === courseId);

  if (!user || !course) {
    return res.status(404).json({ message: 'Estudiante o curso no encontrado' });
  }

  let record = data.attendance.find((item) => item.userId === userId && item.courseId === courseId && item.sessionDate === sessionDate);

  if (record) {
    record.status = status;
    record.notes = notes;
    record.recordedAt = new Date().toISOString();
  } else {
    record = {
      id: createId('attendance'),
      userId,
      courseId,
      sessionDate,
      status,
      notes,
      recordedAt: new Date().toISOString()
    };
    data.attendance.unshift(record);
  }

  if (status === 'present' || status === 'late') {
    awardXp(data, userId, status === 'present' ? 50 : 25, 'attendance', 'Asistencia registrada');
    unlockAchievement(data, userId, 'first-attendance');
    updateStreak(data, userId, courseId, sessionDate);
  }

  writeData(data);
  return res.status(201).json(record);
}

function updateStreak(data, userId, courseId, sessionDate) {
  let streak = data.streaks.find((item) => item.userId === userId && item.courseId === courseId);

  if (!streak) {
    streak = {
      id: createId('streak'),
      userId,
      courseId,
      currentCount: 0,
      bestCount: 0,
      lastActivityDate: null,
      updatedAt: new Date().toISOString()
    };
    data.streaks.push(streak);
  }

  if (streak.lastActivityDate === sessionDate) return streak;

  const previous = streak.lastActivityDate ? new Date(`${streak.lastActivityDate}T00:00:00`) : null;
  const current = new Date(`${sessionDate}T00:00:00`);
  const diffDays = previous ? Math.round((current - previous) / 86400000) : null;

  streak.currentCount = diffDays === 1 ? streak.currentCount + 1 : 1;
  streak.bestCount = Math.max(streak.bestCount, streak.currentCount);
  streak.lastActivityDate = sessionDate;
  streak.updatedAt = new Date().toISOString();

  if (streak.currentCount >= 5) unlockAchievement(data, userId, 'streak-5');
  return streak;
}
