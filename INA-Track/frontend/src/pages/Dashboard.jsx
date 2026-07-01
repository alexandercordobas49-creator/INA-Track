import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';
import StatCard from '../components/StatCard.jsx';

export default function Dashboard({ selectedStudent }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedStudent?.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api(`/dashboard/student/${selectedStudent.id}`);

        if (!res) throw new Error('Respuesta vacía del servidor');

        setDashboard(res);
      } catch (err) {
        console.error(err);
        setError('Error cargando el dashboard. Revisa backend/API.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedStudent?.id]);

  // 🧠 ESTADO: sin estudiante
  if (!selectedStudent) {
    return (
      <div className="p-6">
        <ModuleHeader
          eyebrow="INA-Track"
          title="Dashboard del estudiante"
          description="Selecciona un estudiante para visualizar su progreso."
        />
        <div className="mt-6 text-neutral-500">
          ⚠️ No hay estudiante seleccionado
        </div>
      </div>
    );
  }

  // ⏳ LOADING PRO PRO
  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-6 w-1/3 bg-neutral-200 rounded mb-4"></div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-24 bg-neutral-200 rounded"></div>
          <div className="h-24 bg-neutral-200 rounded"></div>
          <div className="h-24 bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }

  // ❌ ERROR VISUAL PRO
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          🚨 {error}
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-6 text-neutral-500">
        No hay datos del dashboard.
      </div>
    );
  }

  const attendanceRate = dashboard.attendanceSummary?.total
    ? Math.round(
        (dashboard.attendanceSummary.present /
          dashboard.attendanceSummary.total) *
          100
      )
    : 0;

  const achievements = dashboard.achievements || [];
  const xpEvents = dashboard.xpEvents || [];
  const progressToNextLevel = dashboard.xp?.progressToNextLevel;
  const progressWidth = typeof progressToNextLevel === 'number' ? progressToNextLevel : 0;
  const progressLabel = typeof progressToNextLevel === 'number' ? `${progressToNextLevel}%` : 'N/A';

  return (
    <div className="p-6 space-y-6">

      {/* HEADER PRO */}
      <ModuleHeader
        eyebrow="Módulo 4"
        title="Dashboard del estudiante"
        description="Progreso en tiempo real, XP, asistencia y gamificación educativa."
      />

      {/* CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="XP"
          value={dashboard.xp?.total || 0}
          detail={`Nivel ${dashboard.xp?.currentLevel || 0}`}
        />

        <StatCard
          label="Asistencia"
          value={`${attendanceRate}%`}
          detail="Registro académico"
        />

        <StatCard
          label="Racha"
          value={`${dashboard.streak?.currentCount || 0} días`}
          detail="Continuidad de estudio"
        />
      </div>

      {/* PROGRESS BAR PRO */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <p className="text-sm text-neutral-500 mb-2">
          Progreso hacia siguiente nivel
        </p>

        <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full overflow-hidden shadow-md">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-700"
            style={{
              width: `${progressWidth}%`,
            }}
          />
        </div>
        <p className="mt-2 text-sm text-neutral-500">Progreso: {progressLabel}</p>
      </div>

      {/* PANELS */}
      <div className="grid lg:grid-cols-2 gap-5">

        <Panel title="🏆 Logros">
          {achievements.length === 0 ? (
            <p className="text-neutral-400">Sin logros aún</p>
          ) : (
            achievements.map((a) => (
              <div key={a.id} className="p-4 bg-gradient-to-r from-success-50 to-green-50 rounded-xl mb-3 border border-success-200 hover:shadow-md transition-all duration-300">
                <p className="font-bold text-success-700">🏅 {a.achievement?.name}</p>
                <p className="text-sm text-neutral-600 font-medium">
                  {a.achievement?.description}
                </p>
              </div>
            ))
          )}
        </Panel>

        <Panel title="⚡ Actividad reciente">
          {xpEvents.length === 0 ? (
            <p className="text-neutral-400">Sin actividad reciente</p>
          ) : (
            xpEvents.map((e) => (
              <div
                key={e.id}
                className="flex justify-between p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl mb-3 border border-primary-200 hover:shadow-md transition-all duration-300"
              >
                <span className="font-medium">⚡ {e.description}</span>
                <span className="text-primary-700 font-bold">
                  +{e.points} XP
                </span>
              </div>
            ))
          )}
        </Panel>

      </div>
    </div>
  );
}