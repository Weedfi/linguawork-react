export const SCENARIOS = {
  client: {
    label: 'Rozmowa z klientem',
    desc: 'Obsługa klienta po angielsku — rozmowa o produkcie',
    system: "You are a customer calling a company to inquire about their software product. The user is the customer service representative. Ask about features, pricing, and delivery. Be polite but persistent. Keep your responses to 2-3 sentences. Start the conversation."
  },
  hr: {
    label: 'Rozmowa rekrutacyjna',
    desc: 'Rozmowa kwalifikacyjna na stanowisko managerskie',
    system: "You are an HR recruiter conducting a job interview for a senior manager position at an international company. The user is the candidate. Ask professional questions about experience, leadership, and motivation. Keep responses to 2-3 sentences. Start the conversation."
  },
  meeting: {
    label: 'Meeting zespołowy',
    desc: 'Spotkanie statusowe projektu z członkiem zespołu',
    system: "You are a team member in a project status meeting. The user is the team lead. Discuss project progress, raise concerns about timelines, ask for guidance. Keep responses natural and concise (2-3 sentences). Start the conversation."
  },
  presentation: {
    label: 'Prezentacja projektu',
    desc: 'Prezentacja przed zarządem — krytyczne pytania',
    system: "You are a board member listening to a project presentation. The user is presenting. Ask critical questions about ROI, risks, and strategy. Be professional but demanding. Keep responses to 2-3 sentences. Start by asking the user to begin their presentation."
  },
  negotiation: {
    label: 'Negocjacje kontraktu',
    desc: 'Negocjacje warunków usługi z dostawcą',
    system: "You are a supplier negotiating a service contract. The user is the client/buyer. Discuss pricing, payment terms, and service levels. Be professional but firm about your prices. Keep responses concise (2-3 sentences). Start the conversation by introducing your offer."
  }
};

export const LESSONS = [
  { id: 1, emoji: '✉️', title: 'Formalny e-mail do klienta', desc: 'Naucz się pisać profesjonalne wiadomości handlowe.', level: 'B1', time: '20 min', cat: 'Komunikacja', scenario: 'client' },
  { id: 2, emoji: '📞', title: 'Rozmowa telefoniczna z klientem', desc: 'Obsługa zapytań przez telefon — standardowe zwroty.', level: 'B1', time: '25 min', cat: 'Komunikacja', scenario: 'client' },
  { id: 3, emoji: '🚀', title: 'Spotkanie kick-off projektu', desc: 'Rozpoczynanie projektu i ustalanie celów z zespołem.', level: 'B2', time: '30 min', cat: 'Spotkania', scenario: 'meeting' },
  { id: 4, emoji: '📊', title: 'Prezentacja wyników kwartalnych', desc: 'Skuteczne komunikowanie wyników biznesowych.', level: 'B2', time: '35 min', cat: 'Prezentacje', scenario: 'presentation' },
  { id: 5, emoji: '🤝', title: 'Negocjacje warunków kontraktu', desc: 'Twarda gra negocjacyjna — cena, warunki, SLA.', level: 'C1', time: '40 min', cat: 'Negocjacje', scenario: 'negotiation' },
  { id: 6, emoji: '☕', title: 'Small talk w środowisku pracy', desc: 'Naturalne rozmowy z kolegami z międzynarodowych zespołów.', level: 'B1', time: '15 min', cat: 'Komunikacja', scenario: 'meeting' },
  { id: 7, emoji: '💬', title: 'Meeting z feedbackiem', desc: 'Konstruktywne udzielanie i przyjmowanie informacji zwrotnej.', level: 'B2', time: '30 min', cat: 'Spotkania', scenario: 'meeting' },
  { id: 8, emoji: '👋', title: 'Onboarding nowego pracownika', desc: 'Wprowadzanie nowych członków zespołu — kultura firmy.', level: 'B1', time: '25 min', cat: 'Komunikacja', scenario: 'meeting' }
];

export const LESSON_CATEGORIES = ['Komunikacja', 'Spotkania', 'Negocjacje', 'Prezentacje'];

export const VOCAB_SETS = [
  { icon: '🤝', title: 'Negocjacje', count: 30, level: 'B2' },
  { icon: '📊', title: 'Prezentacje i raporty', count: 25, level: 'B1' },
  { icon: '✉️', title: 'Korespondencja formalna', count: 40, level: 'B1' },
  { icon: '📞', title: 'Telekonferencje', count: 20, level: 'B2' },
  { icon: '👥', title: 'HR i rekrutacja', count: 35, level: 'C1' },
  { icon: '💰', title: 'Finanse i budżet', count: 28, level: 'B2' }
];

export const FLASHCARDS = [
  { word: 'to negotiate', phonetic: '/nɪˈɡoʊʃieɪt/', translation: 'negocjować', example: '"We need to negotiate better payment terms with the supplier."' },
  { word: 'stakeholder', phonetic: '/ˈsteɪkˌhoʊldər/', translation: 'interesariusz', example: '"All stakeholders should be involved in the decision-making process."' },
  { word: 'to escalate', phonetic: '/ˈɛskəleɪt/', translation: 'eskalować, podnieść wyżej', example: '"We need to escalate this issue to the management team."' },
  { word: 'deliverable', phonetic: '/dɪˈlɪvərəbl/', translation: 'rezultat, produkt projektu', example: '"The deliverables for this phase include a technical report and a prototype."' },
  { word: 'to align', phonetic: '/əˈlaɪn/', translation: 'uzgodnić, dopasować', example: '"Let\'s align on the priorities for the next quarter."' },
  { word: 'follow-up', phonetic: '/ˈfɒloʊˌʌp/', translation: 'działanie kontynuujące', example: '"I\'ll send a follow-up email with the meeting summary."' },
  { word: 'bandwidth', phonetic: '/ˈbændˌwɪdθ/', translation: 'możliwości czasowe / zasoby', example: '"I don\'t have the bandwidth to take on a new project this month."' },
  { word: 'to streamline', phonetic: '/ˈstriːmlaɪn/', translation: 'usprawnić, uprościć', example: '"We need to streamline our internal processes to reduce costs."' }
];

export const QUIZ = [
  { q: 'Jakie angielskie słowo oznacza „dostarczyć wyniki" w kontekście projektu?',
    options: ['to deliver', 'to bring', 'to send', 'to give'], correct: 0,
    hint: '„To deliver results" to standardowy zwrot w angielskim biznesowym — oznacza dostarczyć/osiągnąć wyniki.' },
  { q: 'Najbardziej formalne zakończenie e-maila biznesowego to:',
    options: ['Cheers', 'Best regards', 'Talk soon', 'Bye'], correct: 1,
    hint: '„Best regards" lub „Kind regards" to standard formalnej korespondencji. „Cheers" jest bardzo nieformalne.' },
  { q: 'Co oznacza zwrot „to table an issue" w brytyjskim angielskim?',
    options: ['odłożyć temat na potem', 'omówić na spotkaniu', 'usunąć z agendy', 'zapisać w notatkach'], correct: 1,
    hint: 'W brytyjskim angielskim „to table" oznacza zgłosić do dyskusji — co jest pułapką dla Amerykanów, którzy używają tego dokładnie odwrotnie.' },
  { q: 'Uzupełnij zdanie: „We need to ___ our priorities given the new constraints."',
    options: ['revisit', 'visit again', 'go back', 'see again'], correct: 0,
    hint: '„To revisit" oznacza ponownie przeanalizować/zweryfikować coś — idealne w kontekście biznesowym.' },
  { q: 'Zwrot „All things considered" na zakończenie prezentacji oznacza:',
    options: ['wszystko zostało zrobione', 'biorąc wszystko pod uwagę', 'mamy wiele do zrobienia', 'rozważyliśmy wszystko'], correct: 1,
    hint: '„All things considered" = „biorąc wszystko pod uwagę / w sumie" — to klasyczna formuła podsumowująca prezentację.' }
];

export const EMPLOYEES = [
  { name: 'Anna Kowalska', initials: 'AK', level: 'B1→B2', sessions: 28, score: 78, active: true },
  { name: 'Marek Nowak', initials: 'MN', level: 'A2→B1', sessions: 18, score: 65, active: true },
  { name: 'Katarzyna Wójcik', initials: 'KW', level: 'B2→C1', sessions: 42, score: 88, active: true },
  { name: 'Piotr Zając', initials: 'PZ', level: 'B1', sessions: 22, score: 70, active: true },
  { name: 'Agnieszka Lewandowska', initials: 'AL', level: 'A2', sessions: 8, score: 55, active: false },
  { name: 'Tomasz Wiśniewski', initials: 'TW', level: 'B2', sessions: 35, score: 83, active: true }
];

export const VIEW_TITLES = {
  dashboard: 'Dashboard',
  lessons: 'Lekcje',
  simulation: 'Symulacja AI',
  vocabulary: 'Słownictwo branżowe',
  progress: 'Postępy',
  trainer: 'Panel trenera'
};
