# 🎓 LinguaWork AI — Frontend

> Interactive AI-powered language learning platform for corporate employees.
> Built as a bachelor's thesis at University of Gdańsk.

**🌐 Live demo:** [weedfi.github.io/linguawork-react](https://weedfi.github.io/linguawork-react)

**🔧 Backend repo:** [Weedfi/linguawork-backend](https://github.com/Weedfi/linguawork-backend)

---

## ✨ Features

- 🎯 **5 AI conversation scenarios** — customer service, HR interview, team meeting, presentation, contract negotiation
- 📊 **AI-powered evaluation** — grammar, vocabulary, formality and communication scoring
- 💡 **Personalized feedback** — specific improvement suggestions in Polish after each session
- 📚 **Lesson library** — 8 curated lessons across 4 business categories
- 🎴 **3D flashcards** — interactive vocabulary practice with flip animation
- ❓ **Interactive quizzes** — with contextual hints
- 📈 **Progress analytics** — Chart.js line and doughnut charts
- 👥 **Trainer panel** — RBAC-protected view for managers
- 🔐 **JWT authentication** — secure login with role-based access
- 🌗 **Dark/light mode** — system preference detection

---

## 🛠 Tech Stack

- **React 18** — component-based UI library
- **Vite 5** — modern build tool with HMR
- **Chart.js + react-chartjs-2** — data visualizations
- **Google Fonts** — Inter (body) + Instrument Serif (display)
- **CSS3** with custom properties — full design system
- **REST API** integration with backend

---

## 🚀 Getting started

### Prerequisites
- Node.js 20+
- Running backend (see [linguawork-backend](https://github.com/Weedfi/linguawork-backend))

### Local development

```bash
# Clone the repo
git clone https://github.com/Weedfi/linguawork-react.git
cd linguawork-react

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your backend API URL

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

```env
VITE_API_URL=http://localhost:4000/api
```

---

## 📁 Project structure

```
src/
├── main.jsx              # Application entry point
├── App.jsx               # Root component + routing
├── AuthContext.jsx       # Authentication state
├── api.js                # REST API client with JWT
├── data.js               # Static data (scenarios, quiz)
├── styles.css            # Complete design system
├── components/
│   ├── Sidebar.jsx       # Navigation sidebar
│   ├── Topbar.jsx        # Top bar with theme toggle
│   └── Toast.jsx         # Notification system
└── views/
    ├── Login.jsx         # Login screen
    ├── Register.jsx      # Registration form
    ├── Dashboard.jsx     # Main dashboard with KPIs
    ├── Lessons.jsx       # Lesson library
    ├── Simulation.jsx    # AI conversation module
    ├── Vocabulary.jsx    # Flashcards + quiz
    ├── Progress.jsx      # Analytics with charts
    └── TrainerPanel.jsx  # Trainer dashboard (RBAC)
```

---

## 🎓 Academic Context

This project is the practical component of a bachelor's thesis:

**"Wykorzystanie technologii sztucznej inteligencji opartej na modelach językowych dla rozwijania kompetencji językowych pracowników"**

**Institution:** Uniwersytet Gdański
**Faculty:** Informatyka i Ekonometria
**Supervisor:** dr hab. Michał Kuciapski
**Year:** 2026

---

## 👤 Author

**Dawid Filas**
- 📧 dawidfilasdf@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/dawidfilas)
- 🐙 [GitHub](https://github.com/Weedfi)

Open to Junior Fullstack Developer opportunities!

---

## 📄 License

MIT
