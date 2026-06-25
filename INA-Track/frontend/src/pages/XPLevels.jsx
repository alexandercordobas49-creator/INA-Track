import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';

export default function XPLevels({ selectedStudent }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (selectedStudent?.id) {
      api(`/xp/${selectedStudent.id}`).then(setSummary).catch(console.error);
    }
  }, [selectedStudent?.id]);

  if (!selectedStudent) {
    return <ModuleHeader eyebrow="Modulo 5" title="XP y niveles" description="Selecciona un estudiante." />;
  }

  if (!summary) return <p className="text-neutral-600">Cargando XP...</p>;

  const nextMinXp = summary.nextLevel?.minXp || summary.user.totalXp;
  const currentMinXp = summary.currentLevel?.minXp || 0;
  const progress = nextMinXp === currentMinXp ? 100 : Math.min(100, Math.round(((summary.user.totalXp - currentMinXp) / (nextMinXp - currentMinXp)) * 100));

  return (
    <>
      <ModuleHeader eyebrow="Modulo 5" title="XP y niveles" description="Sistema de progreso alimentado por asistencia y logros." />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <Panel title="Progreso actual">
          <p className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">{summary.user.totalXp} XP</p>
          <p className="mt-3 text-lg font-semibold text-neutral-700">Nivel {summary.currentLevel?.levelNumber} - {summary.currentLevel?.name}</p>
          <div className="mt-6 h-4 overflow-hidden rounded-full bg-gradient-to-r from-neutral-200 to-neutral-300 shadow-md">
            <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-4 text-sm font-medium text-neutral-600">{summary.nextLevel ? `🎯 Siguiente: ${summary.nextLevel.name}` : '🏆 Nivel maximo alcanzado'}</p>
        </Panel>
        <Panel title="Historial de XP">
          <div className="space-y-3">
            {summary.xpEvents.map((event) => (
              <div className="flex justify-between rounded-xl border border-neutral-200 p-4 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 hover:shadow-md" key={event.id}>
                <span>{event.description}</span>
                <strong>{event.points} XP</strong>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
