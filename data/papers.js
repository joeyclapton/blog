const items = [
  {
    title: 'Evaluating Quality Attributes in Web Development: A Comparative Study of Rendering Strategies',
    type: { en: 'Journal', pt: 'Periódico' },
    venue: 'Journal of Software Engineering Research and Development (JSERD)',
    year: 2026,
    authors: ['Joey Clapton', 'João Pedro Oliveira Batisteli', 'Hugo Bastos de Paula', 'Danilo Boechat Seufitelli', 'Cleiton Tavares'],
    summary: {
      en: 'Extends the CSR vs SSR study with six experimental conditions across five JSON payload sizes, adding minification and Gzip. SSR wins on LCP and TTI at every size, and Gzip is the biggest lever: up to 93% less LCP on the largest payload.',
      pt: 'Amplia o estudo CSR vs SSR com seis condições experimentais em cinco tamanhos de payload JSON, somando minificação e Gzip. SSR vence em LCP e TTI em todos os tamanhos, e o Gzip é a maior alavanca: até 93% menos LCP no maior payload.',
    },
    links: [
      { label: 'PDF', url: 'https://journals-sol.sbc.org.br/index.php/jserd/article/view/8015/4388' },
      { label: 'DOI', url: 'https://doi.org/10.5753/jserd.2026.8015' },
    ],
  },
  {
    title: 'Client-Side vs Server-Side Rendering: Impacts on Performance and User Experience in Web Applications',
    type: { en: 'Conference', pt: 'Conferência' },
    venue: 'Simpósio Brasileiro de Qualidade de Software (SBQS 2025)',
    year: 2025,
    highlights: [
      { icon: '🏆', en: 'Distinguished Paper Award', pt: 'Prêmio Distinguished Paper' },
      { icon: '🌎', en: 'Selected for the Brazilian Software Engineering Showcase at ICSE 2026, Rio de Janeiro', pt: 'Selecionado para o Brazilian Software Engineering Showcase no ICSE 2026, Rio de Janeiro' },
    ],
    authors: ['Joey Clapton', 'Hugo Bastos', 'João Pedro Oliveira Batisteli', 'Danilo Boechat Seufitelli', 'Cleiton Tavares'],
    summary: {
      en: 'Compares CSR and SSR in photo-gallery web apps across five data sizes using Core Web Vitals. SSR did better on TTI and LCP; CSR did better on FCP and Speed Index for smaller datasets.',
      pt: 'Compara CSR e SSR em apps web de galeria de fotos com cinco tamanhos de dados, medindo Core Web Vitals. SSR foi melhor em TTI e LCP; CSR foi melhor em FCP e Speed Index com poucos dados.',
    },
    links: [
      { label: 'PDF', url: 'https://sol.sbc.org.br/index.php/sbqs/article/view/39005/38777' },
      { label: 'DOI', url: 'https://doi.org/10.5753/sbqs.2025.15078' },
    ],
  },
  {
    title: 'Client-side vs Server-side Rendering: Impactos no Desempenho e Experiência do Usuário em Aplicações Web',
    type: { en: 'Thesis', pt: 'TCC' },
    venue: { en: 'B.Sc. Software Engineering, PUC Minas', pt: 'Bacharelado em Engenharia de Software, PUC Minas' },
    year: 2024,
    authors: ['Joey Clapton'],
    summary: {
      en: 'Undergraduate thesis where the research started: CSR vs SSR compared on performance, computational cost and user experience through Core Web Vitals.',
      pt: 'TCC onde a pesquisa começou: CSR vs SSR comparados em desempenho, custo computacional e experiência do usuário pelas Core Web Vitals.',
    },
    links: [
      { label: 'PDF', url: 'https://bib.pucminas.br/pergamumweb/download/F59A3A80-652B-4878-ADDE-56728D415EDB.pdf' },
    ],
  },
]

export default items
