import { useState, useEffect } from 'react';
import { LESSON_CATEGORIES, SCENARIOS } from '../data.js';
import { lessonsApi } from '../api.js';

export default function Lessons({ onOpenScenario, onShowToast }) {
  const [filter, setFilter] = useState('all');
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLessons = () => {
    setLoading(true);
    lessonsApi.list().then(({ lessons }) => {
      setLessons(lessons);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(loadLessons, []);

  const items = filter === 'all' ? lessons : lessons.filter(l => l.category === filter);

  const handleClick = async (lesson) => {
    try {
      const wasNew = !lesson.done;
      await lessonsApi.complete(lesson.id);
      onShowToast((wasNew ? '✅ Lekcja oznaczona jako ukończona! ' : '') + 'Scenariusz: ' + SCENARIOS[lesson.scenarioKey].label);
      onOpenScenario(lesson.scenarioKey);
      loadLessons();
    } catch (e) {
      onShowToast('Błąd: ' + e.message);
    }
  };

  return (
    <div className="view-wrap">
      <div className="greeting">
        <h2>Biblioteka lekcji</h2>
        <p>Wybierz lekcję dopasowaną do Twojego poziomu i obszaru rozwoju.</p>
      </div>

      <div className="filter-bar">
        <button className={'filter-chip' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>
          Wszystkie
        </button>
        {LESSON_CATEGORIES.map(cat => (
          <button key={cat} className={'filter-chip' + (filter === cat ? ' active' : '')} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-mute)' }}>Ładowanie...</div>
      ) : (
        <div className="lessons-grid">
          {items.map(l => (
            <div key={l.id} className={'lesson-card' + (l.done ? ' done' : '')} onClick={() => handleClick(l)}>
              <span className="lesson-emoji">{l.emoji}</span>
              <div className="lesson-title">{l.title}</div>
              <div className="lesson-desc">{l.description}</div>
              <div className="lesson-meta">
                <span className={`level-badge level-${l.level}`}>{l.level}</span>
                <span className="lesson-time">⏱ {l.durationMin} min</span>
                <span className="category-tag">{l.category}</span>
                {l.done && <span className="lesson-done-badge">✓ Ukończono</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
