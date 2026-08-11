import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext.jsx';
import { lessonsApi } from '../api.js';

export default function Topbar({ title, theme, onToggleTheme }) {
  const { user } = useAuth();
  const [streak, setStreak] = useState(user?.streak || 0);
  const isDark = theme === 'dark';

  useEffect(() => {
    let mounted = true;
    lessonsApi.stats().then(s => {
      if (mounted && typeof s.streak === 'number') setStreak(s.streak);
    }).catch(() => {});
    return () => { mounted = false; };
  }, [user?.id]);

  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <span className="topbar-badge streak">🔥 {streak} {streak === 1 ? 'dzień' : 'dni'} z rzędu</span>
      <span className="topbar-badge ai-active">✅ <span>Gemini AI aktywne</span></span>
      <button className="icon-btn" onClick={onToggleTheme} title="Przełącz motyw">
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        )}
      </button>
    </header>
  );
}
