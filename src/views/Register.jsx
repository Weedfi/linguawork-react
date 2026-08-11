import { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';

export default function Register({ onSwitchToLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'employee',
    cefrLevel: 'B1',
    position: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card auth-card-wide">
        <div className="auth-logo">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="14" fill="#1e6fbf"/>
            <path d="M14 36V20H18V32H26V36H14Z" fill="white"/>
            <path d="M30 36V20H42V24H34V26H40V30H34V32H42V36H30Z" fill="white"/>
            <circle cx="44" cy="14" r="3" fill="white" opacity="0.7"/>
          </svg>
        </div>
        <h1 className="auth-title">Utwórz konto</h1>
        <p className="auth-subtitle">Dołącz do platformy LinguaWork AI</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>Imię</label>
              <input
                type="text"
                className="form-input"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Nazwisko</label>
              <input
                type="text"
                className="form-input"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email służbowy</label>
            <input
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="jan.kowalski@firma.pl"
              required
            />
          </div>

          <div className="form-group">
            <label>Hasło (min. 6 znaków)</label>
            <input
              type="password"
              className="form-input"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rola</label>
              <select className="form-select" value={form.role} onChange={(e) => update('role', e.target.value)}>
                <option value="employee">Pracownik</option>
                <option value="trainer">Trener / HR</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <div className="form-group">
              <label>Poziom językowy</label>
              <select className="form-select" value={form.cefrLevel} onChange={(e) => update('cefrLevel', e.target.value)}>
                <option value="A2">A2 (Podstawowy)</option>
                <option value="B1">B1 (Średnio zaawansowany)</option>
                <option value="B2">B2 (Ponad średni)</option>
                <option value="C1">C1 (Zaawansowany)</option>
                <option value="C2">C2 (Biegły)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stanowisko (opcjonalnie)</label>
              <input
                type="text"
                className="form-input"
                value={form.position}
                onChange={(e) => update('position', e.target.value)}
                placeholder="np. Sales Specialist"
              />
            </div>
            <div className="form-group">
              <label>Dział (opcjonalnie)</label>
              <input
                type="text"
                className="form-input"
                value={form.department}
                onChange={(e) => update('department', e.target.value)}
                placeholder="np. Sprzedaż"
              />
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Tworzenie konta...' : 'Zarejestruj się'}
          </button>
        </form>

        <div className="auth-switch">
          Masz już konto? <a onClick={onSwitchToLogin}>Zaloguj się</a>
        </div>
      </div>
    </div>
  );
}
