import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';

export default function ParentView({ session }) {
  const [children, setChildren] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!session?.user) return;
    loadChildren();
  }, [session]);

  async function loadChildren() {
    try {
      const res = await api(`/dashboard/parent/${session.user.id}/children`);
      setChildren(res.children || []);
      if (res.children?.[0]) {
        setSelected(res.children[0].id);
        loadDetail(res.children[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadDetail(childId) {
    try {
      const data = await api(`/dashboard/parent/${session.user.id}/child/${childId}`);
      setDetail(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <ModuleHeader eyebrow="Modulo" title="Vista Padre" description="Consulta de progreso (solo lectura)" />

      <div className="grid lg:grid-cols-4 gap-6">
        <Panel title="Children" className="lg:col-span-1">
          <div className="space-y-2">
            {children.map((c) => (
              <button key={c.id} onClick={() => { setSelected(c.id); loadDetail(c.id); }} className={`w-full text-left p-3 rounded-lg ${selected === c.id ? 'bg-green-50 border-2 border-green-200' : 'bg-white border border-neutral-100'}`}>
                <div className="font-semibold">{c.firstName} {c.lastName}</div>
                <div className="text-xs text-neutral-500">{c.email}</div>
              </button>
            ))}
            {children.length === 0 && <div className="text-sm text-neutral-500">No tiene hijos vinculados.</div>}
          </div>
        </Panel>

        <div className="lg:col-span-3 grid grid-cols-1 gap-6">
          <Panel title="Resumen académico">
            {!detail && <div className="text-sm text-neutral-500">Seleccione un hijo para ver su progreso.</div>}
            {detail && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-500">Nombre</div>
                    <div className="font-bold text-lg">{detail.student.firstName} {detail.student.lastName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-500">Nivel</div>
                    <div className="font-extrabold text-3xl">{detail.xp.currentLevel}</div>
                    <div className="text-sm text-neutral-600">XP: {detail.xp.total}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">Asistencia</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-neutral-50 rounded-lg text-center">
                      <div className="text-xs text-neutral-500">Total</div>
                      <div className="font-bold">{detail.attendanceSummary.total}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <div className="text-xs text-neutral-500">Presentes</div>
                      <div className="font-bold text-green-700">{detail.attendanceSummary.present}</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                      <div className="text-xs text-neutral-500">Ausentes</div>
                      <div className="font-bold text-red-600">{detail.attendanceSummary.absent}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">Racha</div>
                  <div className="p-3 bg-neutral-50 rounded-lg inline-block">
                    <div className="text-xs text-neutral-500">Actual</div>
                    <div className="font-bold text-xl">{detail.streak?.currentCount || 0}</div>
                    <div className="text-sm text-neutral-600">Mejor: {detail.streak?.bestCount || 0}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">Logros recientes</div>
                  <div className="flex gap-3 flex-wrap">
                    {detail.achievements.length === 0 && <div className="text-sm text-neutral-500">Sin logros aun</div>}
                    {detail.achievements.map((a) => (
                      <div key={a.id} className="bg-white p-3 rounded-lg border border-neutral-100">
                        <div className="font-semibold">{a.achievement.name}</div>
                        <div className="text-xs text-neutral-500">{a.earnedAt}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">Alertas</div>
                  <div className="space-y-2">
                    {detail.alerts.length === 0 && <div className="text-sm text-neutral-500">Sin alertas</div>}
                    {detail.alerts.map((al, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${al.level === 'high' ? 'bg-red-50 border border-red-200 text-red-700' : al.level === 'medium' ? 'bg-amber-50 border border-amber-200 text-amber-700' : 'bg-neutral-50 border border-neutral-100 text-neutral-700'}`}>
                        <div className="font-semibold">{al.message}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
