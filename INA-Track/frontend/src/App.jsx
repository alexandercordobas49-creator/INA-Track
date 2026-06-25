import { useEffect, useState } from 'react';
import { api } from './api.js';
import AppShell from './components/AppShell.jsx';
import Achievements from './pages/Achievements.jsx';
import Atlas from './pages/Atlas.jsx';
import Attendance from './pages/Attendance.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Roles from './pages/Roles.jsx';
import XPLevels from './pages/XPLevels.jsx';
import ParentView from './pages/ParentView.jsx';
import CompetencyRoutes from './pages/CompetencyRoutes.jsx';

const modules = [
  { id: 'auth', label: 'Login y registro' },
  { id: 'roles', label: 'Roles' },
  { id: 'parents', label: 'Vista padre' },
  { id: 'routes', label: 'Rutas INATEC' },
  { id: 'attendance', label: 'Asistencia' },
  { id: 'dashboard', label: 'Dashboard estudiante' },
  { id: 'xp', label: 'XP y niveles' },
  { id: 'achievements', label: 'Logros y rachas' },
  { id: 'atlas', label: 'Atlas IA' }
];

export default function App() {
  const [activeModule, setActiveModule] = useState('auth');
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('ina-track-session');
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadCatalogs();
  }, [refreshKey]);

  async function loadCatalogs() {
    try {
      const [usersData, coursesData] = await Promise.all([api('/users'), api('/courses')]);
      setUsers(usersData);
      setCourses(coursesData);
    } catch (error) {
      console.error(error);
    }
  }

  function saveSession(nextSession) {
    setSession(nextSession);
    localStorage.setItem('ina-track-session', JSON.stringify(nextSession));
    setActiveModule('dashboard');
    reload();
  }

  function logout() {
    setSession(null);
    localStorage.removeItem('ina-track-session');
    setActiveModule('auth');
  }

  function reload() {
    setRefreshKey((value) => value + 1);
  }

  const selectedStudent =
    session?.user?.role === 'student' ? session.user : users.find((user) => user.role === 'student');
  const pageProps = { session, users, courses, selectedStudent, reload };

  return (
    <AppShell
      modules={modules}
      activeModule={activeModule}
      onSelectModule={setActiveModule}
      session={session}
      onLogout={logout}
    >
      {activeModule === 'auth' && <Auth onSession={saveSession} />}
      {activeModule === 'roles' && <Roles {...pageProps} />}
      {activeModule === 'attendance' && <Attendance {...pageProps} />}
      {activeModule === 'dashboard' && <Dashboard {...pageProps} />}
      {activeModule === 'xp' && <XPLevels {...pageProps} />}
      {activeModule === 'achievements' && <Achievements {...pageProps} />}
      {activeModule === 'atlas' && <Atlas />}
      {activeModule === 'parents' && session?.user?.role === 'parent' && <ParentView session={session} />}
      {activeModule === 'routes' && <CompetencyRoutes session={session} />}
    </AppShell>
  );
}
