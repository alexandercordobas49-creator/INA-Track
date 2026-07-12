export default function Sidebar({ session, activeModule, onSelectModule, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' },
    { id: 'progress', label: 'Mi progreso', icon: '📊' },
    { id: 'courses', label: 'Mis clases', icon: '📚' },
    { id: 'goals', label: 'Metas', icon: '🎯' },
    { id: 'rewards', label: 'Recompensas', icon: '🎁' },
    { id: 'atlas', label: 'Asistente IA', icon: '🤖' },
    { id: 'community', label: 'Comunidad', icon: '👥' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white border-r border-slate-200 p-6 flex flex-col shadow-lg overflow-y-auto">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg">
            🎓
          </div>
          <div>
            <p className="text-sm font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              INARA
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Plataforma educativa
            </p>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 space-y-2">
        <div className="mb-6">
          <button
            onClick={() => onSelectModule('dashboard')}
            className={`w-full rounded-lg px-4 py-3 font-bold transition-all duration-300 flex items-center gap-3 ${
              activeModule === 'dashboard'
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg">🏠</span>
            <span>Inicio</span>
          </button>
        </div>

        <div className="space-y-1">
          {menuItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeModule === item.id
                  ? 'bg-slate-100 text-emerald-600 border-l-4 border-emerald-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Racha */}
      <div className="mb-6 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-4 border border-orange-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🔥</span>
          <p className="text-sm font-bold text-slate-900">Racha actual</p>
        </div>
        <p className="text-2xl font-black text-orange-600">12 días</p>
        <p className="text-xs text-slate-600 mt-1">¡Sigue así, lo estás logrando!</p>
      </div>

      {/* Perfil */}
      {session?.user && (
        <div className="space-y-4 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xl font-bold text-white">
              {session.user.firstName?.[0]}{session.user.lastName?.[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{session.user.firstName} {session.user.lastName}</p>
              <p className="text-xs text-slate-500 capitalize">{session.user.role}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <p className="text-xs font-semibold text-slate-600">XP</p>
              </div>
              <p className="font-black text-emerald-600">2,450</p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-lg px-3 py-2">
              <span className="text-lg">📊</span>
              <span className="text-xs font-bold text-emerald-700">Nivel 8</span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-300 hover:bg-slate-200 hover:text-slate-900"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* Footer icons */}
      <div className="flex gap-3 justify-center mt-4 pt-4 border-t border-slate-200">
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-all">⚙️</button>
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-all">❓</button>
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-all">📢</button>
      </div>
    </aside>
  );
}
