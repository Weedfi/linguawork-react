<div align="center">

# 🎓 LinguaWork AI

### AI-powered language learning platform for corporate employees

Interactive business English training with real-time conversation simulations powered by Google Gemini.
Built as a bachelor's thesis at the **University of Gdańsk**.

<br>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Try_it_now-1e6fbf?style=for-the-badge)](https://weedfi.github.io/linguawork-react/)
[![Backend Repo](https://img.shields.io/badge/🐙_Backend-Source_Code-24292f?style=for-the-badge)](https://github.com/Weedfi/linguawork-backend)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<br>

**🚀 [Open the live demo →](https://weedfi.github.io/linguawork-react/)**

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Architecture](#️-architecture)
- [Tech Stack](#️-tech-stack)
- [Two Implementations](#-two-implementations)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Academic Context](#-academic-context)
- [Author](#-author)

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

## 📸 Screenshots

<div align="center">

> 💡 *Screenshots will be added here after the first deployment. See [How to add screenshots](#how-to-add-screenshots) below.*

<table>
  <tr>
    <td><b>Dashboard</b></td>
    <td><b>AI Simulation</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/dashboard.png" alt="Dashboard" width="400"/></td>
    <td><img src="docs/screenshots/simulation.png" alt="AI Simulation" width="400"/></td>
  </tr>
  <tr>
    <td><b>AI Evaluation</b></td>
    <td><b>Progress Analytics</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/evaluation.png" alt="Evaluation Panel" width="400"/></td>
    <td><img src="docs/screenshots/progress.png" alt="Progress Charts" width="400"/></td>
  </tr>
  <tr>
    <td><b>Vocabulary Flashcards</b></td>
    <td><b>Trainer Panel</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/flashcards.png" alt="Flashcards" width="400"/></td>
    <td><img src="docs/screenshots/trainer.png" alt="Trainer Panel" width="400"/></td>
  </tr>
</table>

</div>

---

## 🏗️ Architecture

### System Overview

The project implements a **secure client-server architecture** with a critical security concern addressed: the Gemini API key is never exposed to the client. Instead, requests are proxied through a **Cloudflare Worker** that holds the key as an encrypted environment variable.

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│                     │  HTTPS  │                     │  HTTPS  │                     │
│  Static Frontend    │────────▶│  Cloudflare Worker  │────────▶│   Google Gemini     │
│  (GitHub Pages)     │  POST   │  Serverless Proxy   │  POST   │       API           │
│                     │◀────────│  [API key stored    │◀────────│                     │
│  ✅ Zero API keys   │  JSON   │   as env variable]  │  JSON   │                     │
└─────────────────────┘         └─────────────────────┘         └─────────────────────┘
       weedfi.github.io           workers.dev                     generativelanguage
       .io                                                        .googleapis.com
```

### Why This Matters

Client-side applications that integrate with third-party APIs face a fundamental security dilemma: **API keys cannot be safely embedded in client code** because they become visible in browser DevTools. This project demonstrates the industry-standard pattern for solving this:

1. **Frontend contains zero credentials** — anyone can inspect the source
2. **Proxy service holds the key** — encrypted, restricted, monitored
3. **Requests flow through the proxy** — with optional rate limiting and abuse detection

This is the same pattern used by production applications integrating with OpenAI, Stripe, Google Maps and similar services.

---

## 🛠️ Tech Stack

<table>
<tr>
<td>

### Frontend
- **Vanilla JavaScript (ES6+)** — no framework dependencies for demo
- **React 18 + Vite** — for full-stack version
- **Chart.js** — data visualization
- **Google Fonts** — Inter + Instrument Serif
- **CSS3** with custom properties — full design system

</td>
<td>

### Infrastructure
- **GitHub Pages** — static hosting
- **Cloudflare Workers** — serverless API proxy
- **Google Gemini API** — LLM (gemini-flash-latest)
- **localStorage** — client-side persistence

</td>
</tr>
<tr>
<td>

### Full-Stack Version (Backend)
- **Node.js 20 + Express**
- **Prisma ORM**
- **SQLite / PostgreSQL**
- **JWT + bcrypt** authentication
- **Zod** — runtime validation

</td>
<td>

### Development
- **Git + GitHub**
- **VS Code**
- **Modern browser DevTools**

</td>
</tr>
</table>

---

## 🎭 Two Implementations

This repository contains **two complete implementations** demonstrating different architectural approaches:

### 🟢 Client-Side Prototype ([`docs/index.html`](docs/index.html))
- **Live at:** [weedfi.github.io/linguawork-react](https://weedfi.github.io/linguawork-react/)
- Single-page vanilla JavaScript application
- localStorage persistence
- Cloudflare Worker proxy for API key security
- **Best for:** quick demos, single-user prototypes

### 🔵 Full-Stack Web Application ([`src/`](src/))
- React 18 SPA with Vite build system
- REST API backend at [github.com/Weedfi/linguawork-backend](https://github.com/Weedfi/linguawork-backend)
- JWT-based authentication
- Role-based access control (Employee / Trainer / Admin)
- PostgreSQL database with Prisma ORM
- **Best for:** production deployments, multi-tenant environments

Both implementations share the same design system, feature set and user experience.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** (for the React version)
- **A modern browser** (for the vanilla version)
- **A Gemini API key** if running your own instance ([get one free](https://aistudio.google.com/app/apikey))

### Option 1: Run the Vanilla Demo Locally

```bash
# Clone the repository
git clone https://github.com/Weedfi/linguawork-react.git
cd linguawork-react

# Serve the docs folder with any static server
npx serve docs

# Open http://localhost:3000
```

⚠️ Note: the client will try to reach the Cloudflare Worker. To use it locally, either whitelist `http://localhost:3000` in the Worker code or run your own Worker instance.

### Option 2: Run the Full-Stack React App

```bash
# 1. Start the backend (in a separate terminal)
git clone https://github.com/Weedfi/linguawork-backend.git
cd linguawork-backend
npm install
cp .env.example .env  # then edit with your keys
npx prisma db push
node prisma/seed.js
node src/server.js

# 2. Start the frontend
cd ../linguawork-react
npm install
cp .env.example .env  # then edit VITE_API_URL
npm run dev

# Open http://localhost:5173
```

### Demo Accounts (backend seed)

| Role | Email | Password |
|---|---|---|
| 👤 Employee | jan.kowalski@linguawork.demo | demo123 |
| 👨‍🏫 Trainer | trener@linguawork.demo | trainer123 |
| ⚙️ Admin | admin@linguawork.demo | admin123 |

---

## 🌐 Deployment

The project is deployed using a **hybrid free-tier stack**:

| Service | Purpose | Cost |
|---|---|---|
| GitHub Pages | Static hosting for vanilla demo | Free forever |
| Cloudflare Workers | API proxy (API key holder) | 100k requests/day free |
| GitHub | Source code hosting | Free |

Total monthly cost: **$0.00**

### Deploy Your Own Instance

The [`docs/`](docs/) folder is configured for GitHub Pages deployment. To deploy:

1. Fork this repository
2. Deploy the Cloudflare Worker (code in [`worker/gemini-proxy.js`](docs/)) with your Gemini API key as `GEMINI_API_KEY` environment variable
3. Update `PROXY_URL` in `docs/index.html` to point to your Worker
4. Enable GitHub Pages in repository Settings → Pages, source: `main` branch, folder: `/docs`

---

## 🎓 Academic Context

This project is the practical implementation for a bachelor's thesis at the **University of Gdańsk**.

**Thesis title:**
> *Wykorzystanie technologii sztucznej inteligencji opartej na modelach językowych dla rozwijania kompetencji językowych pracowników*
>
> (English: *Application of AI language model technology for developing employees' language competencies*)

| Field | Detail |
|---|---|
| **Institution** | Uniwersytet Gdański |
| **Faculty** | Informatyka i Ekonometria |
| **Level** | Bachelor's (I stopnia) |
| **Supervisor** | dr hab. Michał Kuciapski |
| **Year** | 2026 |
| **Author** | Dawid Filas |

The thesis analyzes the intersection of **generative AI in corporate education**, focusing on:
- Language competencies as human capital in modern organizations
- Limitations of traditional language training methods
- Practical applications of Large Language Models in workplace learning
- Architecture design for AI-integrated educational platforms
- Ethical, legal (GDPR) and organizational implications

The **LinguaWork AI** platform is presented as a proof-of-concept demonstrating the theoretical framework in a working application.

---

## 👤 Author

<div align="center">

### Dawid Filas
**Junior Fullstack Developer** · Student at University of Gdańsk

Currently open to Junior Fullstack Developer positions in Poland (remote or on-site).

<br>

[![Email](https://img.shields.io/badge/Email-dawidfilasdf@gmail.com-24292f?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dawidfilasdf@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dawid_Filas-0077b5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/dawidfilas)
[![GitHub](https://img.shields.io/badge/GitHub-@Weedfi-24292f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Weedfi)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Feel free to use this codebase as inspiration for your own portfolio projects, educational purposes, or personal learning.

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a star!

**[🌐 Try the live demo](https://weedfi.github.io/linguawork-react/)** · **[🐙 View backend code](https://github.com/Weedfi/linguawork-backend)** · **[📧 Contact author](mailto:dawidfilasdf@gmail.com)**

Made with ☕ and generative AI · Gdańsk, Poland · 2026

</div>

---

<details>
<summary><b>How to add screenshots</b> (for author reference)</summary>

To make this README even more impressive, add screenshots:

1. **Take 6 screenshots** of the running application:
   - `dashboard.png` — main dashboard with KPIs
   - `simulation.png` — AI conversation in progress
   - `evaluation.png` — feedback panel with scores
   - `progress.png` — analytics with Chart.js visualizations
   - `flashcards.png` — vocabulary flashcard flipped
   - `trainer.png` — trainer panel with employee table

2. **Place them in** `docs/screenshots/` folder:
   ```
   docs/screenshots/
   ├── dashboard.png
   ├── simulation.png
   ├── evaluation.png
   ├── progress.png
   ├── flashcards.png
   └── trainer.png
   ```

3. **Recommended size**: 1200×800px (or 2400×1600px @2x for retina)

4. **Format**: PNG or optimized JPEG (< 500KB each)

5. **Commit and push** — GitHub will automatically render them.

Optional: Add a hero screenshot at the top of the README right after the title.

</details>
