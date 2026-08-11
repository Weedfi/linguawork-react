import { useState, useEffect } from 'react';
import { SCENARIOS } from '../data.js';
import { trainerApi } from '../api.js';

const ERRORS = [
  { name: 'Prezentacja danych liczbowych', width: 88 },
  { name: 'Negocjowanie warunków', width: 72 },
  { name: 'Idiomy biznesowe', width: 65 },
  { name: 'Wymowa terminów branżowych', width: 54 },
  { name: 'Formalna korespondencja', width: 42 }
];

export default function TrainerPanel({ onShowToast }) {
  const [employees, setEmployees] = useState([]);
  const [teamStats, setTeamStats] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [scenarioKey, setScenarioKey] = useState('client');
  const [date, setDate] = useState(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      trainerApi.employees(),
      trainerApi.teamStats()
    ]).then(([{ employees }, stats]) => {
      setEmployees(employees);
      setTeamStats(stats);
      if (employees.length > 0) setEmployeeId(employees[0].id);
    }).catch(e => {
      onShowToast('Błąd: ' + e.message);
    }).finally(() => setLoading(false));
  }, []);

  const handleAssign = async () => {
    if (!employeeId) return;
    try {
      await trainerApi.createAssignment({ employeeId, scenarioKey, dueDate: date });
      const emp = employees.find(e => e.id === employeeId);
      onShowToast(`Przypisano: ${SCENARIOS[scenarioKey].label} → ${emp?.name}`);
    } catch (e) {
      onShowToast('Błąd: ' + e.message);
    }
  };

  if (loading || !teamStats) {
    return <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-mute)' }}>Ładowanie danych zespołu...</div>;
  }

  return (
    <div className="view-wrap">
      <div className="greeting">
        <h2>Panel trenera</h2>
        <p>Zarządzaj rozwojem językowym swojego zespołu.</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi"><div className="kpi-label">Aktywni pracownicy</div><div className="kpi-value">{teamStats.totalEmployees}</div><div className="kpi-trend">w organizacji</div></div>
        <div className="kpi"><div className="kpi-label">Średni postęp grupy</div><div className="kpi-value">{teamStats.avgScore}%</div><div className="kpi-trend">średni wynik sesji</div></div>
        <div className="kpi"><div className="kpi-label">Sesje AI łącznie</div><div className="kpi-value">{teamStats.totalSessions}</div><div className="kpi-trend">wszystkich w zespole</div></div>
        <div className="kpi"><div className="kpi-label">Aktywność tygodniowa</div><div className="kpi-value">{teamStats.activityRate}%</div><div className="kpi-trend">{teamStats.activeThisWeek} osób aktywnych</div></div>
      </div>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Pracownik</th>
              <th>Poziom</th>
              <th>Sesje</th>
              <th>Wynik</th>
              <th>Postęp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id}>
                <td>
                  <div className="employee-cell">
                    <div className="employee-avatar">{e.initials}</div>
                    <div>
                      <strong>{e.name}</strong>
                      {e.position && <div style={{ fontSize: 11, color: 'var(--text-mute)' }}>{e.position}</div>}
                    </div>
                  </div>
                </td>
                <td><span className={`level-badge level-${e.level}`}>{e.level}</span></td>
                <td>{e.sessions}</td>
                <td><strong>{e.score}%</strong></td>
                <td>
                  <span className="mini-progress">
                    <span className="mini-progress-fill" style={{ width: e.score + '%' }} />
                  </span>
                </td>
                <td>
                  <span className={'status-badge ' + (e.active ? 'status-active' : 'status-inactive')}>
                    {e.active ? 'Aktywny' : 'Nieaktywny'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="trainer-grid">
        <div className="card">
          <h3 className="section-title">Przypisz scenariusz</h3>
          <p className="section-subtitle">Wybierz pracownika, scenariusz oraz termin realizacji</p>
          <form className="assign-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Pracownik</label>
              <select className="form-select" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Scenariusz</label>
              <select className="form-select" value={scenarioKey} onChange={(e) => setScenarioKey(e.target.value)}>
                {Object.entries(SCENARIOS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Termin realizacji</label>
              <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button className="btn-primary" style={{ alignSelf: 'flex-start' }} onClick={handleAssign}>
              Przypisz zadanie
            </button>
          </form>
        </div>

        <div className="card">
          <h3 className="section-title">Najczęstsze trudności w zespole</h3>
          <p className="section-subtitle">Obszary wymagające uwagi trenera</p>
          <div className="errors-list">
            {ERRORS.map(e => (
              <div key={e.name} className="error-item">
                <span className="error-name">{e.name}</span>
                <div className="error-bar"><div className="error-bar-fill" style={{ width: e.width + '%' }} /></div>
                <span className="error-count">{e.width}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
