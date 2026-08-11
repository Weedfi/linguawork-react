import { useState, useEffect, useRef } from 'react';
import { SCENARIOS } from '../data.js';
import { aiApi } from '../api.js';

export default function Simulation({ initialScenario, onShowToast }) {
  const [scenario, setScenario] = useState(initialScenario || 'client');
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const messagesRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (initialScenario) setScenario(initialScenario);
  }, [initialScenario]);

  useEffect(() => { startConversation(); }, [scenario]);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, thinking]);

  async function startConversation() {
    setMessages([]);
    setHistory([]);
    setFeedback(null);
    setThinking(true);
    try {
      const { text } = await aiApi.chat(scenario, []);
      setHistory([{ role: 'model', parts: [{ text }] }]);
      setMessages([{ role: 'ai', text }]);
    } catch (e) {
      setMessages([{ role: 'system', text: 'Błąd połączenia z AI: ' + e.message }]);
    } finally {
      setThinking(false);
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || thinking) return;
    setMessages(m => [...m, { role: 'user', text }]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setThinking(true);
    try {
      const { text: aiText } = await aiApi.chat(scenario, history, text);
      const newHistory = [...history, { role: 'user', parts: [{ text }] }, { role: 'model', parts: [{ text: aiText }] }];
      setHistory(newHistory);
      setMessages(m => [...m, { role: 'ai', text: aiText }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'system', text: 'Błąd połączenia z AI: ' + e.message }]);
    } finally {
      setThinking(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function autoResize(e) {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }

  async function endAndEvaluate() {
    if (history.length < 2) {
      onShowToast('Najpierw przeprowadź rozmowę.');
      return;
    }
    setFeedbackLoading(true);
    setFeedback(null);
    try {
      const result = await aiApi.evaluate(scenario, history);
      setFeedback(result.scores);
      onShowToast(`Sesja zapisana. Średni wynik: ${result.avg}%`);
    } catch (e) {
      setFeedback({ error: 'Nie udało się ocenić rozmowy: ' + e.message });
    } finally {
      setFeedbackLoading(false);
    }
  }

  return (
    <div className="view-wrap">
      <div className="greeting">
        <h2>Symulacja rozmowy z AI</h2>
        <p>Praktyka prawdziwych biznesowych scenariuszy. AI dostosuje się do Twoich odpowiedzi w czasie rzeczywistym.</p>
      </div>

      <div className="scenario-tabs">
        {Object.entries(SCENARIOS).map(([key, s]) => (
          <button
            key={key}
            className={'scenario-tab' + (scenario === key ? ' active' : '')}
            onClick={() => setScenario(key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="chat-container">
        <div className="chat-panel">
          <div className="chat-header">
            <div className="msg-avatar" style={{ background: 'var(--violet)' }}>AI</div>
            <div className="chat-header-info">
              <div className="chat-header-title">{SCENARIOS[scenario].label}</div>
              <div className="chat-header-desc">{SCENARIOS[scenario].desc}</div>
            </div>
            <button className="btn-secondary" onClick={startConversation}>↻ Nowa sesja</button>
            <button className="btn-primary" onClick={endAndEvaluate}>Zakończ i oceń</button>
          </div>

          <div className="chat-messages" ref={messagesRef}>
            {messages.map((m, i) => (
              <div key={i} className={'msg ' + m.role}>
                <div className="msg-avatar">
                  {m.role === 'user' ? 'TY' : m.role === 'ai' ? 'AI' : '!'}
                </div>
                <div className="msg-bubble">{m.text}</div>
              </div>
            ))}
            {thinking && (
              <div className="msg ai">
                <div className="msg-avatar">AI</div>
                <div className="typing-dots"><span/><span/><span/></div>
              </div>
            )}
          </div>

          <div className="chat-input-bar">
            <textarea
              ref={textareaRef}
              className="chat-input"
              placeholder="Wpisz wiadomość po angielsku... (Shift+Enter = nowa linia)"
              rows={1}
              value={input}
              onChange={autoResize}
              onKeyDown={handleKeyDown}
            />
            <button className="send-btn" onClick={sendMessage} disabled={thinking || !input.trim()} title="Wyślij">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>

        <aside className="feedback-panel">
          <h3 className="section-title">Ocena rozmowy</h3>
          <p className="section-subtitle">Zakończ sesję, aby otrzymać analizę AI</p>

          {feedbackLoading ? (
            <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-mute)' }}>
              <div className="typing-dots" style={{ display: 'inline-flex', marginBottom: 14 }}><span/><span/><span/></div>
              <div style={{ fontSize: 13 }}>Analiza rozmowy przez AI...</div>
            </div>
          ) : feedback ? (
            feedback.error ? (
              <div style={{ whiteSpace: 'pre-wrap', fontSize: 12.5, color: 'var(--text-soft)', lineHeight: 1.6 }}>
                {feedback.error}
              </div>
            ) : (
              <>
                <div className="feedback-scores">
                  <div className="feedback-score-card"><div className="feedback-score-value">{feedback.grammar_score}%</div><div className="feedback-score-label">Gramatyka</div></div>
                  <div className="feedback-score-card"><div className="feedback-score-value">{feedback.vocabulary_score}%</div><div className="feedback-score-label">Słownictwo</div></div>
                  <div className="feedback-score-card"><div className="feedback-score-value">{feedback.formality_score}%</div><div className="feedback-score-label">Formalność</div></div>
                  <div className="feedback-score-card"><div className="feedback-score-value">{feedback.communication_score}%</div><div className="feedback-score-label">Komunikacja</div></div>
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Sugestie ulepszeń</h4>
                <ul className="suggestions-list">
                  {(feedback.suggestions || []).map((s, i) => (
                    <li key={i} className="suggestion-item">{s}</li>
                  ))}
                </ul>
              </>
            )
          ) : (
            <div className="feedback-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, marginBottom: 12 }}>
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              <div>Po zakończeniu rozmowy otrzymasz tu szczegółową ocenę i sugestie ulepszeń.</div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
