import Sidebar from './Sidebar.jsx';

export default function AppShell({ modules, activeModule, onSelectModule, session, onLogout, children }) {
  const icons = {
    auth: '🏠',
    roles: '👥',
    attendance: '📋',
    dashboard: '📊',
    xp: '⚡',
    achievements: '🏆',
    atlas: '🤖',
    parents: '👨‍👩‍👧‍👦',
    routes: '🧭'
  };

  // Si hay sesión, mostrar layout con sidebar
  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
        <Sidebar 
          session={session} 
          activeModule={activeModule} 
          onSelectModule={onSelectModule} 
          onLogout={onLogout} 
        />
        <main className="ml-56 min-h-screen">
          <div className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-slate-900">INARA</h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-slate-100 transition-all text-xl">🔔</button>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {session.user?.firstName?.[0]}{session.user?.lastName?.[0]}
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    );
  }

  // Si no hay sesión, mostrar layout simple (login)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {children}
    </div>
  );
}
