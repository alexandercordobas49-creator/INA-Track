import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';

export default function Achievements({ selectedStudent }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (selectedStudent?.id) {
      api(`/achievements/${selectedStudent.id}`).then(setSummary).catch(console.error);
    }
  }, [selectedStudent?.id]);

  if (!selectedStudent) {
    return <ModuleHeader eyebrow="Modulo 6" title="Logros y rachas" description="Selecciona un estudiante." />;
  }

  if (!summary) return <p className="text-neutral-600">Cargando logros...</p>;

  const earnedIds = new Set(summary.earnedAchievements.map((item) => item.achievementId));
  const streak = summary.streaks[0];

  return (
    <>
      <ModuleHeader eyebrow="Modulo 6" title="Logros y rachas" description="Reconocimientos y continuidad calculados automaticamente." />
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Panel title="Logros">
          <div className="grid gap-3">
            {summary.achievements.map((achievement) => (
              <div className="rounded-xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary-300 transition-all duration-300" key={achievement.id}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-neutral-900 text-lg">{achievement.name}</p>
                    <p className="text-sm text-neutral-600 font-medium mt-1">{achievement.description}</p>
                  </div>
                  <span className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${earnedIds.has(achievement.id) ? 'bg-gradient-to-r from-success-500 to-success-600 text-white shadow-lg' : 'bg-neutral-200 text-neutral-700'}`}>
                    {earnedIds.has(achievement.id) ? '✅ Obtenido' : `${achievement.xpReward} XP`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="🔥 Racha">
          <p className="text-5xl font-bold bg-gradient-to-r from-warning-500 to-orange-500 bg-clip-text text-transparent">{streak?.currentCount || 0} 🔥</p>
          <p className="mt-4 text-lg font-semibold text-neutral-700">Mejor racha: {streak?.bestCount || 0} días</p>
          <p className="mt-6 text-sm leading-6 text-neutral-600 bg-neutral-100 p-3 rounded-lg font-medium">⏰ Última actividad: {streak?.lastActivityDate || 'Sin actividad'}</p>
        </Panel>
      </div>
    </>
  );
}
