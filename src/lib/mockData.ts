export const mockAIRankings = [
  { rank: 1, name: "Claude 4 Opus",    score: 96.4, change: +0.2 },
  { rank: 2, name: "GPT-5",            score: 93.1, change: -0.3 },
  { rank: 3, name: "Gemini 2.5 Pro",   score: 89.7, change: +1.1 },
  { rank: 4, name: "Grok 3",           score: 85.2, change: +0.5 },
  { rank: 5, name: "DeepSeek R2",      score: 82.8, change: -0.1 },
  { rank: 6, name: "Llama 4 405B",     score: 79.3, change: +2.3 },
  { rank: 7, name: "Mistral Large 3",  score: 76.1, change: 0    },
  { rank: 8, name: "Command R+",       score: 72.4, change: -0.8 },
];

export const mockNews = [
  { id: 1, category: "IA",          title: "Claude 4 Opus supera a GPT-5 en razonamiento complejo", time: "Hace 8 min",  score: 94 },
  { id: 2, category: "Marketing",   title: "Cómo las marcas usan IA generativa en campañas 2026",  time: "Hace 23 min", score: 60 },
  { id: 3, category: "Programación",title: "Antigravity lanza Agent Manager para múltiples tasks",  time: "Hace 1h",     score: 78 },
  { id: 4, category: "IA",          title: "Gemini 2.5 Pro mejora un 12% en benchmarks de código", time: "Hace 2h",     score: 88 },
  { id: 5, category: "Marketing",   title: "Las mejores herramientas de IA para social media 2026", time: "Hace 3h",     score: 71 },
  { id: 6, category: "Programación",title: "Trae IDE integra Claude 4 en Builder Mode gratis",      time: "Hace 4h",     score: 83 },
];

export const mockMetrics = [
  { label: "IAs Rankeadas", value: "142", trend: "+12%" },
  { label: "Noticias hoy", value: "28", trend: "+5" },
  { label: "Fuentes activas", value: "18", trend: "Estable" },
  { label: "Actualización", value: "8m", trend: "Realtime" },
];
