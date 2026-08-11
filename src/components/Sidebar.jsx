import { useAuth } from '../AuthContext.jsx';

const ICONS = {
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  lessons: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  simulation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  vocabulary: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  progress: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  trainer: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
};

export default function Sidebar({ activeView, onNavigate }) {
  const { user, logout } = useAuth();
  const canSeeTrainerPanel = user.role === 'trainer' || user.role === 'admin';
  const initials = ((user.firstName?.[0] || '') + (user.lastName?.[0] || '')).toUpperCase();

  const navItem = (key, label) => (
    <button
      key={key}
      className={'nav-item' + (activeView === key ? ' active' : '')}
      onClick={() => onNavigate(key)}
    >
      {ICONS[key]}
      <span>{label}</span>
    </button>
  );

  const roleLabel = { employee: 'Pracownik', trainer: 'Trener', admin: 'Administrator' }[user.role];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <svg className="logo-svg" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="9" fill="#1e6fbf"/>
          <path d="M9 23V13H11.5V20.8H16.5V23H9Z" fill="white"/>
          <path d="M19 23V13H26.5V15.2H21.5V16.8H25.5V19H21.5V20.8H26.5V23H19Z" fill="white"/>
          <circle cx="28" cy="9.5" r="2" fill="white" opacity="0.85"/>
        </svg>
        <div className="brand">
          <span className="brand-name">LinguaWork AI</span>
          <span className="brand-tag">Business English</span>
        </div>
      </div>
      <nav className="nav">
        <div className="nav-group-label">Główne</div>
        {navItem('dashboard', 'Dashboard')}
        {navItem('lessons', 'Lekcje')}
        {navItem('simulation', 'Symulacja AI')}
        {navItem('vocabulary', 'Słownictwo')}
        <div className="nav-group-label">Analityka</div>
        {navItem('progress', 'Postępy')}
        {canSeeTrainerPanel && navItem('trainer', 'Panel trenera')}
        <div className="nav-group-label">Konto</div>
        <button className="nav-item" onClick={logout}>
          {ICONS.logout}
          <span>Wyloguj</span>
        </button>
      </nav>
      <div className="sidebar-user">
        <div className="user-avatar">{initials || '?'}</div>
        <div className="user-info">
          <div className="user-name">{user.firstName} {user.lastName}</div>
          <div className="user-role">
            {roleLabel} · {user.cefrLevel}
          </div>
        </div>
      </div>
    </aside>
  );
}
