import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Toast from './components/Toast.jsx';
import Dashboard from './views/Dashboard.jsx';
import Lessons from './views/Lessons.jsx';
import Simulation from './views/Simulation.jsx';
import Vocabulary from './views/Vocabulary.jsx';
import ProgressView from './views/Progress.jsx';
import TrainerPanel from './views/TrainerPanel.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import { VIEW_TITLES } from './data.js';
import { useAuth } from './AuthContext.jsx';

export default function App() {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [view, setView] = useState('dashboard');
  const [scenario, setScenario] = useState('client');
  const [theme, setTheme] = useState(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  const [toast, setToast] = useState({ visible: false, message: '' });

  useEffect(() => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);

  const showToast = (msg) => setToast({ visible: true, message: msg });
  const hideToast = () => setToast(t => ({ ...t, visible: false }));

  const openScenario = (key) => {
    setScenario(key);
    setView('simulation');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="typing-dots"><span/><span/><span/></div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login'
      ? <Login onSwitchToRegister={() => setAuthMode('register')} />
      : <Register onSwitchToLogin={() => setAuthMode('login')} />;
  }

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard onShowToast={showToast} />;
      case 'lessons': return <Lessons onOpenScenario={openScenario} onShowToast={showToast} />;
      case 'simulation': return <Simulation initialScenario={scenario} onShowToast={showToast} />;
      case 'vocabulary': return <Vocabulary onShowToast={showToast} />;
      case 'progress': return <ProgressView />;
      case 'trainer': return <TrainerPanel onShowToast={showToast} />;
      default: return null;
    }
  };

  return (
    <>
      <div className="app">
        <Sidebar activeView={view} onNavigate={setView} />
        <Topbar
          title={VIEW_TITLES[view]}
          theme={theme}
          onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        />
        <main className="main">
          {renderView()}
        </main>
      </div>
      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />
    </>
  );
}
