import { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';

export default function Login({ onSwitchToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'employee') {
      setEmail('jan.kowalski@linguawork.demo');
      setPassword('demo123');
    } else if (role === 'trainer') {
      setEmail('trener@linguawork.demo');
      setPassword('trainer123');
    } else if (role === 'admin') {
      setEmail('admin@linguawork.demo');
      setPassword('admin123');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="14" fill="#1e6fbf"/>
            <path d="M14 36V20H18V32H26V36H14Z" fill="white"/>
            <path d="M30 36V20H42V24H34V26H40V30H34V32H42V36H30Z" fill="white"/>
            <circle cx="44" cy="14" r="3" fill="white" opacity="0.7"/>
          </svg>
        </div>
        <h1 className="auth-title">LinguaWork AI</h1>
        <p className="auth-subtitle">Zaloguj się do platformy rozwoju kompetencji językowych</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jan.kowalski@firma.pl"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Hasło</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Twoje hasło"
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <div className="auth-divider">
          <span>lub</span>
        </div>

        <div className="demo-accounts">
          <div className="demo-label">Konta demo</div>
          <div className="demo-buttons">
            <button className="btn-secondary demo-btn" onClick={() => fillDemo('employee')} type="button">
              👤 Pracownik
            </button>
            <button className="btn-secondary demo-btn" onClick={() => fillDemo('trainer')} type="button">
              👨‍🏫 Trener
            </button>
            <button className="btn-secondary demo-btn" onClick={() => fillDemo('admin')} type="button">
              ⚙️ Admin
            </button>
          </div>
        </div>

        <div className="auth-switch">
          Nie masz jeszcze konta? <a onClick={onSwitchToRegister}>Zarejestruj się</a>
        </div>
      </div>
    </div>
  );
}
