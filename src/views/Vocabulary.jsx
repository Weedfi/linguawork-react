import { useState } from 'react';
import { VOCAB_SETS, FLASHCARDS, QUIZ } from '../data.js';
import { lessonsApi } from '../api.js';

function Sets({ onSelectSet }) {
  return (
    <div className="sets-grid">
      {VOCAB_SETS.map(s => (
        <div key={s.title} className="set-card" onClick={() => onSelectSet(s)}>
          <div className="set-icon">{s.icon}</div>
          <div className="set-title">{s.title}</div>
          <div className="set-meta">
            <span className={`level-badge level-${s.level}`}>{s.level}</span>
            <span>{s.count} słów</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Flashcards() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const f = FLASHCARDS[idx];

  const prev = (e) => { e.stopPropagation(); if (idx > 0) { setIdx(idx - 1); setFlipped(false); } };
  const next = (e) => {
    e.stopPropagation();
    if (idx < FLASHCARDS.length - 1) {
      setIdx(idx + 1); setFlipped(false);
      lessonsApi.flashcardSeen().catch(() => {});
    }
  };

  return (
    <div className="flashcard-area">
      <div className={'flashcard' + (flipped ? ' flipped' : '')} onClick={() => setFlipped(!flipped)}>
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <div className="flashcard-word">{f.word}</div>
            <div className="flashcard-phonetic">{f.phonetic}</div>
            <div className="flashcard-hint">Kliknij, aby zobaczyć tłumaczenie</div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="flashcard-translation">{f.translation}</div>
            <div className="flashcard-example">{f.example}</div>
            <div className="flashcard-hint">Kliknij, aby wrócić</div>
          </div>
        </div>
      </div>
      <div className="flashcard-nav">
        <button className="flashcard-nav-btn" onClick={prev} disabled={idx === 0} title="Poprzednia">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="flashcard-counter">{idx + 1} / {FLASHCARDS.length}</div>
        <button className="flashcard-nav-btn" onClick={next} disabled={idx === FLASHCARDS.length - 1} title="Następna">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

function Quiz() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [locked, setLocked] = useState(false);

  if (idx >= QUIZ.length) {
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className="quiz-result-score">{score} / {QUIZ.length}</div>
          <div className="quiz-result-label">
            {score >= 4 ? 'Świetny wynik!' : score >= 3 ? 'Dobry wynik, jeszcze trochę praktyki.' : 'Spróbuj ponownie — powtórz słownictwo.'}
          </div>
          <button className="btn-primary" onClick={() => { setIdx(0); setScore(0); setPicked(null); setLocked(false); }}>
            Zacznij od nowa
          </button>
        </div>
      </div>
    );
  }

  const q = QUIZ[idx];

  const answer = (i) => {
    if (locked) return;
    setLocked(true);
    setPicked(i);
    if (i === q.correct) setScore(s => s + 1);
  };

  const nextQ = () => {
    const newIdx = idx + 1;
    if (newIdx >= QUIZ.length) {
      lessonsApi.quizResult(score, QUIZ.length).catch(() => {});
    }
    setIdx(newIdx);
    setPicked(null);
    setLocked(false);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        <span>Pytanie {idx + 1} z {QUIZ.length}</span>
        <span>Wynik: {score}</span>
      </div>
      <div className="quiz-question">
        <div className="quiz-question-text">{q.q}</div>
        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (locked) {
              cls += ' locked';
              if (i === q.correct) cls += ' correct';
              else if (i === picked) cls += ' wrong';
            }
            return (
              <button key={i} className={cls} onClick={() => answer(i)}>
                {opt}
              </button>
            );
          })}
        </div>
        {locked && (
          <>
            <div className="quiz-hint">{q.hint}</div>
            <div className="quiz-actions">
              <button className="btn-primary" onClick={nextQ}>Następne →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Vocabulary({ onShowToast }) {
  const [mode, setMode] = useState('sets');

  const handleSet = (s) => {
    setMode('flashcards');
    onShowToast('Otwarto zestaw: ' + s.title);
  };

  return (
    <div className="view-wrap">
      <div className="greeting">
        <h2>Słownictwo branżowe</h2>
        <p>Buduj zasób wyrazów potrzebnych w pracy zawodowej.</p>
      </div>

      <div className="vocab-tabs">
        <button className={'vocab-tab' + (mode === 'sets' ? ' active' : '')} onClick={() => setMode('sets')}>Zestawy</button>
        <button className={'vocab-tab' + (mode === 'flashcards' ? ' active' : '')} onClick={() => setMode('flashcards')}>Fiszki</button>
        <button className={'vocab-tab' + (mode === 'quiz' ? ' active' : '')} onClick={() => setMode('quiz')}>Quiz</button>
      </div>

      {mode === 'sets' && <Sets onSelectSet={handleSet} />}
      {mode === 'flashcards' && <Flashcards />}
      {mode === 'quiz' && <Quiz />}
    </div>
  );
}
