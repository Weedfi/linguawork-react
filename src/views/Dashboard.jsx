import { useEffect, useState } from 'react';
import { lessonsApi } from '../api.js';
import { useAuth } from '../AuthContext.jsx';

const COMPETENCIES = [
  { name: 'Komunikacja pisemna', percent: 82, level: 'high' },
  { name: 'Rozmowy zawodowe', percent: 71, level: 'med' },
  { name: 'Słownictwo biznesowe', percent: 65, level: 'med' },
  { name: 'Gramatyka', percent: 88, level: 'high' },
  { name: 'Prezentacje', percent: 59, level: 'low' }
];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' }) +
    ' · ' + d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
}
function fullDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lessonsApi.stats().then(s => {
      setStats(s);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('[data-progress]').forEach(el => {
        el.style.width = el.dataset.progress + '%';
      });
    });
  }, [stats]);

  if (loading || !stats) {
    return <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-mute)' }}>
      <div className="typing-dots" style={{ display: 'inline-flex' }}><span/><span/><span/></div>
    </div>;
  }

  const sessions = stats.recentSessions;

  return (
    <div className="view-wrap">
      <div className="greeting">
        <h2>Witaj z powrotem, {user.firstName} 👋</h2>
        <p>Twój plan na dziś: krótka sesja konwersacyjna + ćwiczenia słownictwa.</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">Poziom językowy</div>
          <div className="kpi-value">{user.cefrLevel}</div>
          <div className="kpi-trend">Twój aktualny poziom</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Ukończone lekcje</div>
          <div className="kpi-value">{stats.lessonsDone}</div>
          <div className="kpi-trend">{stats.lessonsDone > 0 ? 'ukończonych z 8' : '—'}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Sesje AI</div>
          <div className="kpi-value">{stats.sessions}</div>
          <div className="kpi-trend">{stats.sessions > 0 ? 'łącznie przeprowadzonych' : '—'}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Nowe słownictwo</div>
          <div className="kpi-value">{stats.words}</div>
          <div className="kpi-trend">{stats.words > 0 ? 'słów w bazie' : '—'}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="section-title">Kompetencje językowe</h3>
          <p className="section-subtitle">Twój postęp w pięciu obszarach Business English</p>
          {COMPETENCIES.map(c => (
            <div key={c.name} className="competency">
              <div className="competency-head">
                <span>{c.name}</span>
                <span className="competency-percent">{c.percent}%</span>
              </div>
              <div className="progress">
                <div className={'progress-fill ' + c.level} data-progress={c.percent} style={{ width: 0 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="section-title">Ostatnia aktywność</h3>
          <p className="section-subtitle">Twoje najnowsze sesje AI</p>
          {sessions.length === 0 ? (
            <div className="activity-item">
              <span className="activity-dot blue"></span>
              <div className="activity-text">
                <div>Witaj w LinguaWork AI! Zacznij pierwszą sesję.</div>
                <div className="activity-date">Dziś</div>
              </div>
            </div>
          ) : sessions.map((s, i) => {
            const colors = ['blue', 'green', 'violet', 'warning', 'blue'];
            return (
              <div key={s.id} className="activity-item">
                <span className={`activity-dot ${colors[i % colors.length]}`}></span>
                <div className="activity-text">
                  <div>Sesja AI: <strong>{s.scenarioLabel}</strong> · wynik <strong>{s.avg}%</strong></div>
                  <div className="activity-date">{formatDate(s.date)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 22 }}>
        <h3 className="section-title">Historia sesji AI</h3>
        <p className="section-subtitle">Twoje ostatnie 5 sesji z asystentem AI</p>
        {sessions.length === 0 ? (
          <div style={{ color: 'var(--text-mute)', fontSize: 13, padding: '12px 0' }}>
            Brak zapisanych sesji. Przeprowadź rozmowę i kliknij „Zakończ i oceń".
          </div>
        ) : sessions.map(s => {
          const color = s.avg >= 80 ? 'var(--success)' : s.avg >= 60 ? 'var(--accent)' : 'var(--warning)';
          return (
            <div key={s.id} className="activity-item" style={{ alignItems: 'center' }}>
              <span className="activity-dot blue"></span>
              <div className="activity-text" style={{ flex: 1 }}>
                <div><strong>{s.scenarioLabel}</strong></div>
                <div className="activity-date">
                  {fullDate(s.date)} · Gramatyka {s.grammar}% · Słownictwo {s.vocabulary}% · Komunikacja {s.communication}%
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color, marginLeft: 12 }}>{s.avg}%</div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 className="section-title">Rekomendacje AI</h3>
        <p className="section-subtitle">Spersonalizowane sugestie oparte na Twoich danych</p>
        <div className="rec-grid">
          <div className="rec-card priority">
            <span className="rec-tag">Priorytet</span>
            <div className="rec-title">Skup się na prezentacjach</div>
            <div className="rec-desc">To Twój najsłabszy obszar (59%). Zacznij od lekcji „Prezentacja wyników kwartalnych".</div>
          </div>
          <div className="rec-card continue">
            <span className="rec-tag">Kontynuuj</span>
            <div className="rec-title">Świetny postęp w mailach</div>
            <div className="rec-desc">Komunikacja pisemna na poziomie 82%. Spróbuj zaawansowanej korespondencji formalnej.</div>
          </div>
          <div className="rec-card suggest">
            <span className="rec-tag">Sugestia</span>
            <div className="rec-title">Słownictwo negocjacyjne</div>
            <div className="rec-desc">Awans na B2 wymaga 30 nowych słów z obszaru negocjacji. Otwórz zestaw fiszek.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
