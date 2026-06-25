import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';

export default function Attendance({ users, courses, reload }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    userId: '',
    courseId: '',
    sessionDate: new Date().toISOString().slice(0, 10),
    status: 'present',
    notes: ''
  });
  const students = users.filter((user) => user.role === 'student');

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    if (!form.userId && students[0]) setForm((value) => ({ ...value, userId: students[0].id }));
    if (!form.courseId && courses[0]) setForm((value) => ({ ...value, courseId: courses[0].id }));
  }, [students, courses, form.userId, form.courseId]);

  async function loadRecords() {
    setRecords(await api('/attendance'));
  }

  async function saveRecord() {
    await api('/attendance', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    await loadRecords();
    reload();
  }

  return (
    <>
      <ModuleHeader eyebrow="Modulo 3" title="Sistema de asistencia" description="Registra asistencia. Presente y tarde suman XP y actualizan rachas." />
      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <Panel title="Nuevo registro">
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <select className="w-full rounded-lg border border-neutral-300 px-4 py-3 font-medium transition-all duration-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-neutral-50" value={form.userId} onChange={(event) => setForm({ ...form, userId: event.target.value })}>
              {students.map((student) => <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>)}
            </select>
            <select className="w-full rounded-lg border border-neutral-300 px-4 py-3 font-medium transition-all duration-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-neutral-50" value={form.courseId} onChange={(event) => setForm({ ...form, courseId: event.target.value })}>
              {courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}
            </select>
            <input className="w-full rounded-lg border border-neutral-300 px-4 py-3 font-medium transition-all duration-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-neutral-50" type="date" value={form.sessionDate} onChange={(event) => setForm({ ...form, sessionDate: event.target.value })} />
            <select className="w-full rounded-lg border border-neutral-300 px-4 py-3 font-medium transition-all duration-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-neutral-50" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
              <option value="present">Presente</option>
              <option value="late">Tarde</option>
              <option value="absent">Ausente</option>
              <option value="excused">Justificado</option>
            </select>
            <textarea className="w-full rounded-lg border border-neutral-300 px-4 py-3 font-medium transition-all duration-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-neutral-50" placeholder="Notas" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
            <button className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95" type="button" onClick={saveRecord}>Guardar</button>
          </form>
        </Panel>
        <Panel title="Registros">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b-2 border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50">
                <tr><th className="py-3 font-bold text-primary-700">Estudiante</th><th className="font-bold text-primary-700">Curso</th><th className="font-bold text-primary-700">Fecha</th><th className="font-bold text-primary-700">Estado</th></tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors" key={record.id}>
                    <td className="py-3 font-medium">{record.user?.firstName} {record.user?.lastName}</td>
                    <td>{record.course?.name}</td>
                    <td>{record.sessionDate}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}
