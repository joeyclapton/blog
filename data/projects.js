const items = [
  {
    title: 'Mesa Posta',
    icon: '/static/images/projects/mesa-posta.png',
    url: 'https://mesaposta.app',
    status: { en: 'Closed beta', pt: 'Beta fechado' },
    description: {
      en: 'An app that helps a household decide what to eat, see what is in the pantry and shop without forgetting anything. Weekly meal planning, a shared shopping list and a cooking mode with a timer in a Live Activity.',
      pt: 'App pra casa decidir o que comer, ver o que tem na despensa e ir ao mercado sem esquecer nada. Planejamento da semana, lista de compras compartilhada e modo cozinhar com cronômetro na Live Activity.',
    },
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'Widgets iOS', 'Live Activities'],
  },
  {
    title: 'Tá Vindo',
    icon: '/static/images/projects/tavindo.png',
    status: { en: 'In development', pt: 'Em desenvolvimento' },
    description: {
      en: 'Real-time buses in Belo Horizonte. It opens straight to the stops near you, with the minutes until the bus arrives, and tells you whether each time is live, scheduled or has no signal. Made to be easy to read for everyone, from students to older people.',
      pt: 'Ônibus em tempo real em Belo Horizonte. Abre direto nos pontos perto de você com os minutos até o ônibus chegar e diz se o horário é ao vivo, programado ou sem sinal. Feito pra ser legível por todo mundo, de estudante a idoso.',
    },
    stack: ['Expo', 'React Native', 'Node.js', 'GTFS-Realtime', 'MapLibre', 'Apple Watch', 'Wear OS'],
  },
]

export default items
