import { useEffect, useState } from 'react';
import { api } from './api.js';
import AppShell from './components/AppShell.jsx';
import Achievements from './pages/Achievements.jsx';
import Atlas from './pages/Atlas.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Progress from './pages/Progress.jsx';
import Courses from './pages/Courses.jsx';
import Goals from './pages/Goals.jsx';
import Rewards from './pages/Rewards.jsx';
import Community from './pages/Community.jsx';

export default function App() {
  const [activeModule, setActiveModule] = useState('auth');
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('INARA-session');
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
    localStorage.setItem('INARA-session', JSON.stringify(nextSession));
    setActiveModule('dashboard');
    reload();
  }

  function logout() {
    setSession(null);
    localStorage.removeItem('INARA-session');
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
      activeModule={activeModule}
      onSelectModule={setActiveModule}
      session={session}
      onLogout={logout}
    >
      {activeModule === 'auth' && <Auth onSession={saveSession} />}
      {activeModule === 'dashboard' && <Dashboard {...pageProps} />}
      {activeModule === 'progress' && <Progress {...pageProps} />}
      {activeModule === 'courses' && <Courses {...pageProps} />}
      {activeModule === 'goals' && <Goals {...pageProps} />}
      {activeModule === 'rewards' && <Rewards {...pageProps} />}
      {activeModule === 'atlas' && <Atlas />}
      {activeModule === 'community' && <Community {...pageProps} />}
    </AppShell>
  );
}
