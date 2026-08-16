<div align="center">

# 🎓 LinguaWork AI

### AI-powered language learning platform for corporate employees

Interactive business English training with real-time conversation simulations powered by Google Gemini.

<br>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Try_it_now-1e6fbf?style=for-the-badge)](https://weedfi.github.io/linguawork-react/)
[![Backend Repo](https://img.shields.io/badge/🐙_Backend-Source_Code-24292f?style=for-the-badge)](https://github.com/Weedfi/linguawork-backend)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<br>

**🚀 [Open the live demo →](https://weedfi.github.io/linguawork-react/)**

</div>

---

## 🎯 About the Project

**LinguaWork AI** solves a real business problem: corporate employees need to develop language skills but traditional training doesn't scale, is expensive, and lacks personalization.

This platform leverages **Large Language Models** to deliver:

- **On-demand conversation practice** — no more waiting for scheduled lessons with a tutor
- **Realistic business scenarios** — customer calls, job interviews, contract negotiations, board presentations
- **Instant personalized feedback** — grammatical, vocabulary and communication assessment after each session
- **Structured learning paths** — from A2 to C1 (CEFR framework)
- **Trainer analytics** — HR managers can monitor team progress and assign scenarios

---

## ✨ Key Features

### 🗣️ AI Conversation Simulation
Practice **5 real-world business scenarios** with an AI role-playing customers, recruiters, board members and negotiation partners. Each scenario uses a carefully engineered system prompt that shapes the AI's persona, tone, and behavior.

### 📊 Automated Assessment
After every conversation, the AI analyzes the full transcript and returns a **structured JSON evaluation**: grammar score, vocabulary score, formality score, communication score, plus 3 specific improvement suggestions in Polish.

### 📚 Interactive Lessons
**8 business English lessons** across 4 categories (Communication, Meetings, Presentations, Negotiations), each mapped to a corresponding AI conversation scenario.

### 🎴 Vocabulary System
- **3D flip flashcards** with phonetic transcription and business context examples
- **Interactive quiz** with contextual hints and immediate feedback
- **6 thematic vocabulary sets** (negotiations, presentations, telecommunications, HR, finance, formal correspondence)

### 📈 Progress Analytics
Chart.js-powered dashboards showing session results over time, activity distribution, competency mapping, and most common error patterns.

### 👥 Trainer Panel
Role-based dashboard for L&D specialists to manage team members, assign learning scenarios with deadlines, and monitor collective progress metrics.

### 🌗 Dark/Light Mode
Full theme support with automatic system preference detection and manual toggle. WCAG AA color contrast verified.

### 🔥 Gamification
Daily activity streak tracker to build learning habits.

---

## 🏗️ Architecture

The project implements a **secure client-server architecture** with a critical security concern addressed: the Gemini API key is never exposed to the client. Instead, requests are proxied through a **Cloudflare Worker** that holds the key as an encrypted environment variable.

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│                     │  HTTPS  │                     │  HTTPS  │                     │
│  Static Frontend    │────────▶│  Cloudflare Worker  │────────▶│   Google Gemini     │
│  (GitHub Pages)     │  POST   │  Serverless Proxy   │  POST   │       API           │
│                     │◀────────│  [API key stored    │◀────────│                     │
│  ✅ Zero API keys   │  JSON   │   as env variable]  │  JSON   │                     │
└─────────────────────┘         └─────────────────────┘         └─────────────────────┘
```

Client-side applications that integrate with third-party APIs face a fundamental security dilemma: **API keys cannot be safely embedded in client code** because they become visible in browser DevTools. This project demonstrates the industry-standard pattern for solving this — the same pattern used by production applications integrating with OpenAI, Stripe, Google Maps and similar services.

---

## 🛠️ Tech Stack

<table>
<tr>
<td>

### Frontend
- **Vanilla JavaScript (ES6+)** — demo version
- **React 18 + Vite** — full-stack version
- **Chart.js** — data visualization
- **Google Fonts** — Inter + Instrument Serif
- **CSS3** with custom properties — design system

</td>
<td>

### Infrastructure
- **GitHub Pages** — static hosting
- **Cloudflare Workers** — serverless API proxy
- **Google Gemini API** — LLM (gemini-flash-latest)
- **localStorage** — client-side persistence

</td>
</tr>
</table>

---

## 🚀 Getting Started

Want to run your own instance locally?

```bash
# Clone the repository
git clone https://github.com/Weedfi/linguawork-react.git
cd linguawork-react

# Serve the docs folder with any static server
npx serve docs

# Open http://localhost:3000
```

You'll need to deploy your own Cloudflare Worker with a Gemini API key ([get one free](https://aistudio.google.com/app/apikey)) and update the `PROXY_URL` constant in `docs/index.html`.

---

## 👤 Author

<div align="center">

### Dawid Filas

[![Email](https://img.shields.io/badge/Email-dawidfilasdf@gmail.com-24292f?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dawidfilasdf@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dawid_Filas-0077b5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/dawidfilas)
[![GitHub](https://img.shields.io/badge/GitHub-@Weedfi-24292f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Weedfi)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[🌐 Try the live demo](https://weedfi.github.io/linguawork-react/)** · **[🐙 View backend code](https://github.com/Weedfi/linguawork-backend)**

</div>
