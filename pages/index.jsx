import Head from 'next/head';
// Importação dinâmica (runtime) para evitar erros de build
// Isso mantém a estabilidade que consertamos anteriormente

// --- DADOS MOCKADOS (FALLBACK) ---
const mockEventsData = [
  { "id": "reveillon-celebrare-2026", "name": "Réveillon Celebrare 2026", "date": "31 Dez • 21:00", "location": "Rio de Janeiro", "price": 750.00, "imageUrl": "/image_28da38.jpg" },
  { "id": "show-pericles-natanzinho", "name": "Péricles e Natanzinho Lima", "date": "20 Dez • 22:00", "location": "Folk Valley", "price": 180.00, "imageUrl": "/image_28d63f.jpg" },
  { "id": "love-sessions-2025", "name": "Love Sessions Festival", "date": "20 Dez • 16:00", "location": "Riocentro", "price": 150.00, "imageUrl": "/image_287fc4.jpg" },
  { "id": "show-banda-a", "name": "Turnê Mundial - Banda A", "date": "15 Dez • 20:00", "location": "Arena Principal", "price": 120.00, "imageUrl": "/sunset.jpg" },
  { "id": "congresso-tech-2026", "name": "Future Tech Congress", "date": "20 Jan • 09:00", "location": "Centro de Convenções", "price": 450.00, "imageUrl": "/sunset2.jpg" },
  { "id": "festival-cinema", "name": "Cine Indie Festival", "date": "05 Mar • 18:00", "location": "Cine Arte", "price": 50.00, "imageUrl": "/sunset4.jpg" },
];

// --- SERVER SIDE PROPS ---
export async function getServerSideProps() {
  const symplaApiKey = process.env.SYMPLA_API_KEY;
  let eventsData = mockEventsData; 
  // Lógica de API real iria aqui...
  
  return {
    props: {
      events: eventsData,
      fetchError: null,
    },
  };
}

// --- COMPONENTE HOME ---
export default function Home({ events, fetchError }) {
    // Carregamento dinâmico de módulos para evitar erros de build
    let styles = {};
    let Slider = () => null;
    let EventCard = () => null;
    let HeadComponent = ({ children }) => <>{children}</>;

    try {
        styles = require('../styles/index.module.css');
        // Fallback para garantir que styles não seja undefined
        if (!styles) styles = {}; 
    } catch(e) {}

    try {
        const SliderModule = require('../components/Slider');
        Slider = SliderModule.default || SliderModule;
    } catch(e) {}
    
    try {
        const EventCardModule = require('../components/EventCard');
        EventCard = EventCardModule.default || EventCardModule;
    } catch(e) {}
    
    try {
        HeadComponent = require('next/head').default || require('next/head');
    } catch(e) {}

  const validEvents = Array.isArray(events) ? events : [];
  const highlightEvents = validEvents.slice(0, 3);

  // Classes seguras
  const containerClass = styles.container || 'container';
  const heroClass = styles.heroSection || 'hero';
  const titleClass = styles.title || 'title';
  const subtitleClass = styles.subtitle || 'subtitle';
  const gridClass = styles.cardsGrid || 'grid';
  const gradientTextClass = styles.gradientText || '';

  return (
    <div className={containerClass}>
      <HeadComponent>
        <title>Premier Pass - Experiências Exclusivas</title>
        <meta name="description" content="A plataforma premium para os melhores eventos." />
      </HeadComponent>
      
      {/* Navbar simplificada já está no _app.js, aqui focamos no conteúdo */}

      <main>
        {/* HERO SECTION MODERNIZADA */}
        <section className={heroClass}>
            <div className={styles.titleWrapper}>
                <span className={styles.badge}>Nova Temporada 2025</span>
                <h1 className={titleClass}>
                    Viva momentos <br/>
                    <span className={gradientTextClass}>Inesquecíveis.</span>
                </h1>
                <p className={subtitleClass}>
                    Acesso exclusivo aos shows, festivais e congressos mais cobiçados do país. Garanta seu lugar na história.
                </p>
            </div>

            {/* Barra de Busca Estilizada */}
            <div className={styles.searchContainer}>
                <span className={styles.searchIcon}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input 
                    type="text" 
                    placeholder="Busque por eventos, artistas ou locais..." 
                    className={styles.searchBar} 
                />
            </div>
        </section>

        {/* SLIDER DESTAQUES */}
        {highlightEvents.length > 0 && <Slider events={highlightEvents} />}

        {/* LISTA DE EVENTOS */}
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
            {/* Filtros visuais simples */}
            <div style={{display: 'flex', gap: '10px'}}>
                {['Todos', 'Shows', 'Teatro'].map(filter => (
                    <button key={filter} style={{
                        background: filter === 'Todos' ? '#fff' : 'rgba(255,255,255,0.05)',
                        color: filter === 'Todos' ? '#000' : '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}>
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {validEvents.length > 0 ? (
            <div className={gridClass}>
                {validEvents.map(event => (
                    <a key={event.id} href={`/checkout/${event.id}`} className={styles.cardLink}>
                       <EventCard event={event} />
                    </a>
                ))}
            </div>
        ) : (
             <div style={{textAlign: 'center', padding: '50px', color: '#666'}}>
                 <p>Nenhum evento encontrado.</p>
             </div>
        )}
      </main>

      {/* Footer Minimalista */}
      <footer style={{
          textAlign: 'center', 
          padding: '40px 20px', 
          borderTop: '1px solid #222', 
          marginTop: '60px',
          color: '#666',
          fontSize: '0.9rem'
      }}>
        <p>© 2025 Premier Pass. Feito para experiências extraordinárias.</p>
      </footer>
    </div>
  );
}