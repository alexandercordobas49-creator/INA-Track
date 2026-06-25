export default function AppShell({ modules, activeModule, onSelectModule, session, onLogout, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-col">
                <p className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">🎓 INA-Track</p>
                <p className="text-xs font-bold text-neutral-500 tracking-wider uppercase">Plataforma educativa inteligente</p>
              </div>
              {session && (
                <p className="mt-1 text-sm text-neutral-600">
                  {session.user.firstName} {session.user.lastName} - {session.user.role}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <nav className="flex max-w-full gap-1 overflow-x-auto pb-0">
                {modules.map((module) => {
                  const icons = {
                    'auth': '🏠',
                    'roles': '👥',
                    'attendance': '📋',
                    'dashboard': '📊',
                    'xp': '⚡',
                    'achievements': '🏆',
                    'atlas': '🤖'
                  };
                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => onSelectModule(module.id)}
                      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                        activeModule === module.id
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-white text-neutral-700 border-2 border-neutral-300 hover:border-green-400 hover:text-green-700'
                      }`}
                    >
                      <span className="text-lg">{icons[module.id] || '📌'}</span>
                      {module.label}
                    </button>
                  );
                })}
              </nav>
              {session && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:bg-neutral-100 hover:border-neutral-400"
                >
                  Salir
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
