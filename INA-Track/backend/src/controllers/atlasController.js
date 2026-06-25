import { readData } from '../data/store.js';

export function askAtlas(req, res) {
  const data = readData();
  const question = req.body.question?.trim();

  if (!question) return res.status(400).json({ message: 'Escribe una pregunta para Atlas IA' });

  const student = data.users.find((user) => user.role === 'student');
  const attendance = data.attendance.filter((record) => record.userId === student?.id);
  const present = attendance.filter((record) => record.status === 'present').length;
  const attendanceRate = attendance.length ? Math.round((present / attendance.length) * 100) : 0;
  const streak = data.streaks.find((item) => item.userId === student?.id);
  const nextLevel = data.levels.find((level) => level.minXp > student.totalXp);

  return res.json({
    answer: `${student.firstName} tiene ${student.totalXp} XP, nivel ${student.currentLevel}, asistencia de ${attendanceRate}% y racha actual de ${streak?.currentCount || 0} dias. ${nextLevel ? `Le faltan ${nextLevel.minXp - student.totalXp} XP para el nivel ${nextLevel.name}.` : 'Ya alcanzo el nivel maximo configurado.'}`,
    suggestions: [
      'Registrar asistencia en las proximas sesiones',
      'Revisar estudiantes con baja continuidad',
      'Crear retos cortos para ganar XP'
    ]
  });
}
