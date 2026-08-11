import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { lessonsApi } from '../api.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const COMPETENCIES = [
  { label: 'Speaking', percent: 71, color: 'var(--accent)', cls: 'med' },
  { label: 'Writing', percent: 82, color: 'var(--success)', cls: 'high' },
  { label: 'Vocabulary', percent: 65, color: 'var(--warning)', cls: 'low' },
  { label: 'Grammar', percent: 88, color: 'var(--success)', cls: 'high' },
  { label: 'Business Comm.', percent: 74, color: 'var(--accent)', cls: 'med' }
];

const ERRORS = [
  { name: 'Present Perfect vs Simple Past', width: 85, count: '17 błędów' },
  { name: 'Przedimki (a / an / the)', width: 60, count: '12 błędów' },
  { name: 'Conditional II (would + V)', width: 40, count: '8 błędów' }
];

export default function ProgressView() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lessonsApi.stats().then(s => setStats(s)).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('[data-progress]').forEach(el => {
        el.style.width = el.dataset.progress + '%';
      });
    });
  }, [stats]);

  if (loading || !stats) {
    return <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-mute)' }}>Ładowanie...</div>;
  }

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#b3bccd' : '#5a6478';
  const gridColor = isDark ? '#2a3349' : '#e2e6ef';

  let labels, chartData, chartDesc;
  if (stats.allSessions.length >= 2) {
    const last8 = stats.allSessions.slice(-8);
    labels = last8.map(s => new Date(s.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' }));
    chartData = last8.map(s => s.avg);
    chartDesc = `Ostatnie ${last8.length} sesji z asystentem AI`;
  } else {
    labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
    chartData = [58, 63, 67, 62, 71, 74, 76, 78];
    chartDesc = 'Dane przykładowe — przeprowadź sesje aby zobaczyć realne wyniki';
  }

  const lineData = {
    labels,
    datasets: [{
      label: 'Wynik sesji (%)', data: chartData,
      borderColor: '#1e6fbf', backgroundColor: 'rgba(30, 111, 191, 0.1)',
      tension: 0.35, fill: true, pointBackgroundColor: '#1e6fbf',
      pointRadius: 4, pointHoverRadius: 6, borderWidth: 2.5
    }]
  };

  const lineOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: false, min: 0, max: 100, grid: { color: gridColor }, ticks: { color: textColor, callback: v => v + '%' } },
      x: { grid: { display: false }, ticks: { color: textColor } }
    }
  };

  const donutData = {
    labels: ['Lekcje', 'Symulacje AI', 'Słownictwo', 'Quizy'],
    datasets: [{
      data: [35, 40, 15, 10],
      backgroundColor: ['#1e6fbf', '#8b5cf6', '#22c55e', '#f59e0b'],
      borderWidth: 0
    }]
  };

  const donutOpts = {
    responsive: true, maintainAspectRatio: false, cutout: '65%',
    plugins: { legend: { position: 'bottom', labels: { color: textColor, padding: 12, font: { size: 12 } } } }
  };

  return (
    <div className="view-wrap">
      <div className="greeting">
        <h2>Twoje postępy</h2>
        <p>Szczegółowa analityka Twojej nauki języka.</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi"><div className="kpi-label">Czas nauki</div><div className="kpi-value">{stats.hours}h</div><div className="kpi-trend">szac. na podst. aktywności</div></div>
        <div className="kpi"><div className="kpi-label">Średni wynik sesji</div><div className="kpi-value">{stats.avgScore !== null ? stats.avgScore + '%' : '—'}</div><div className="kpi-trend">{stats.sessions > 0 ? `z ${stats.sessions} sesji` : 'brak sesji'}</div></div>
        <div className="kpi"><div className="kpi-label">Seria dni</div><div className="kpi-value">{stats.streak}</div><div className="kpi-trend">🔥 dni z rzędu</div></div>
        <div className="kpi"><div className="kpi-label">Aktywne słowa</div><div className="kpi-value">{stats.words}</div><div className="kpi-trend">{stats.words > 0 ? 'poznanych słów' : '—'}</div></div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3 className="section-title">Wyniki sesji AI</h3>
          <p className="section-subtitle">{chartDesc}</p>
          <div className="chart-wrapper"><Line data={lineData} options={lineOpts} /></div>
        </div>
        <div className="chart-card">
          <h3 className="section-title">Rozkład aktywności</h3>
          <p className="section-subtitle">Jak dzielisz swój czas nauki</p>
          <div className="chart-wrapper"><Doughnut data={donutData} options={donutOpts} /></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 className="section-title">Kompetencje szczegółowe</h3>
        <p className="section-subtitle">Twoje wyniki w pięciu kluczowych obszarach</p>
        <div className="competencies-grid">
          {COMPETENCIES.map(c => (
            <div key={c.label} className="competency-card">
              <div className="competency-card-label">{c.label}</div>
              <div className="competency-card-value" style={{ color: c.color }}>{c.percent}%</div>
              <div className="progress">
                <div className={'progress-fill ' + c.cls} data-progress={c.percent} style={{ width: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Najczęstsze błędy</h3>
        <p className="section-subtitle">Obszary wymagające szczególnej uwagi</p>
        <div className="errors-list">
          {ERRORS.map(e => (
            <div key={e.name} className="error-item">
              <span className="error-name">{e.name}</span>
              <div className="error-bar"><div className="error-bar-fill" style={{ width: e.width + '%' }} /></div>
              <span className="error-count">{e.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
