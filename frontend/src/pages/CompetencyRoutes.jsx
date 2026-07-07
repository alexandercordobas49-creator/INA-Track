import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';

export default function CompetencyRoutes({ session }) {
  const [routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  async function loadRoutes() {
    try {
      const data = await api('/competency/routes');
      setRoutes(data.routes || []);
      if (data.routes?.[0]) setSelected(data.routes[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!selected || !session?.user) return;
    loadProgress();
  }, [selected, session]);

  async function loadProgress() {
    try {
      const data = await api(`/competency/users/${session.user.id}/progress`);
      setProgress(data.progress || []);
    } catch (error) {
      console.error(error);
    }
  }

  const route = routes.find((item) => item.id === selected);
  const routeProgress = progress.find((item) => item.routeId === selected);
  const completedMissions = routeProgress?.completedMissions || [];

  return (
    <>
      <ModuleHeader eyebrow="Modulo" title="Rutas INATEC" description="Avanza en rutas de competencias técnicas y completa misiones prácticas." />

      <div className="grid lg:grid-cols-4 gap-6">
        <Panel title="Rutas disponibles" className="lg:col-span-1">
          <div className="space-y-3">
            {routes.map((routeItem) => (
              <button
                key={routeItem.id}
                type="button"
                onClick={() => setSelected(routeItem.id)}
                className={`w-full text-left rounded-2xl p-4 transition-all border ${selected === routeItem.id ? 'border-green-300 bg-green-50 shadow' : 'border-neutral-200 bg-white hover:border-green-300'}`}
              >
                <div className="text-2xl">{routeItem.icon}</div>
                <div className="font-bold text-lg mt-2">{routeItem.name}</div>
                <p className="text-sm text-neutral-500 mt-1">{routeItem.description}</p>
              </button>
            ))}
          </div>
        </Panel>

        <div className="lg:col-span-3 grid gap-6">
          <Panel title="Detalle de ruta">
            {!route && <p className="text-neutral-500">Selecciona una ruta para ver misiones.</p>}
            {route && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-4xl">{route.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{route.name}</h2>
                    <p className="text-sm text-neutral-500">{route.description}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {route.missions.map((mission) => {
                    const done = completedMissions.includes(mission.id);
                    return (
                      <div key={mission.id} className={`rounded-3xl p-5 border ${done ? 'border-green-300 bg-green-50' : 'border-neutral-200 bg-white'} shadow-sm`}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-lg">{mission.title}</h3>
                            <p className="text-sm text-neutral-500">{mission.category}</p>
                          </div>
                          <span className="text-sm font-bold text-green-700">{mission.xp} XP</span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-3">{mission.description}</p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${done ? 'bg-green-600 text-white' : 'bg-neutral-100 text-neutral-700'}`}>{done ? 'Completada' : 'Pendiente'}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              await api('/competency/complete', {
                                method: 'POST',
                                body: JSON.stringify({
                                  userId: session.user.id,
                                  routeId: route.id,
                                  missionId: mission.id,
                                  evidence: {
                                    type: mission.evidenceType,
                                    title: `${mission.title} evidencia`,
                                    description: `Evidencia de la misión ${mission.title}`,
                                    url: 'https://via.placeholder.com/400x250'
                                  }
                                })
                              });
                              loadProgress();
                            }}
                            className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
                            disabled={done}
                          >
                            {done ? 'Listo' : 'Marcar completa'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Panel>

          <Panel title="Progreso del estudiante">
            {route && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-neutral-50 p-4">
                    <p className="text-sm text-neutral-500">Misiones completadas</p>
                    <p className="text-3xl font-bold">{completedMissions.length}/{route.missions.length}</p>
                  </div>
                  <div className="rounded-3xl bg-neutral-50 p-4">
                    <p className="text-sm text-neutral-500">XP total en ruta</p>
                    <p className="text-3xl font-bold">{route.missions.filter((mission) => completedMissions.includes(mission.id)).reduce((sum, mission) => sum + mission.xp, 0)}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-white p-4 border border-neutral-200">
                  <p className="text-sm font-semibold text-neutral-700">Evidencias</p>
                  <div className="space-y-3 mt-4">
                    {route.missions.filter((mission) => completedMissions.includes(mission.id)).map((mission) => (
                      <div key={mission.id} className="rounded-2xl bg-neutral-50 p-3">
                        <p className="font-semibold">{mission.title}</p>
                        <p className="text-xs text-neutral-500">{mission.evidenceType}</p>
                      </div>
                    ))}
                    {completedMissions.length === 0 && <p className="text-sm text-neutral-500">Aún no has completado ninguna misión de esta ruta.</p>}
                  </div>
                </div>
              </div>
            )}
            {!route && <p className="text-sm text-neutral-500">Selecciona una ruta para ver el progreso.</p>}
          </Panel>
        </div>
      </div>
    </>
  );
}
