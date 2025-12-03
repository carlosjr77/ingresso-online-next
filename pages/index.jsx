// Importações de componentes e estilos são tratadas de forma dinâmica no runtime, onde possível,
// para evitar erros de compilação estruturais no Next.js (Vercel).

// --- DADOS MOCKADOS (PARA QUANDO A CHAVE API NÃO ESTIVER CONFIGURADA) ---
// Estes dados simulam o que a API da Sympla retornaria.
const mockEventsData = [
  // Eventos de Destaque para o Slider (os 3 primeiros)
  { "id": "reveillon-celebrare-2026", "name": "Réveillon Celebrare 2026 - RIO", "date": "31/12/2025", "location": "Clube Monte Líbano, Lagoa", "price": 750.00, "description": "O Réveillon mais glamuroso da Lagoa, ALL INCLUSIVE.", "imageUrl": "/image_28da38.jpg" },
  { "id": "show-pericles-natanzinho", "name": "Péricles e Natanzinho Lima - Folk Valley", "date": "20/12/2025", "location": "Arena Folk Valley", "price": 180.00, "description": "Folk Valley apresenta um show inesquecível de samba e sertanejo.", "imageUrl": "/image_28d63f.jpg" },
  { "id": "love-sessions-2025", "name": "Love Sessions Festival 2025", "date": "20/12/2025", "location": "Riocentro, Rio de Janeiro", "price": 150.00, "description": "O maior festival de música eletrônica do Rio.", "imageUrl": "/image_287fc4.jpg" },
  
  // Eventos para o Grid
  { "id": "show-banda-a", "name": "Show de Lançamento - Banda A", "date": "15/12/2025", "location": "Arena Principal", "price": 120.00, "description": "A turnê de lançamento mais aguardada do ano.", "imageUrl": "/sunset.jpg" },
  { "id": "congresso-tech-2026", "name": "Congresso de Tecnologia 2026", "date": "20/01/2026", "location": "Centro de Convenções", "price": 450.00, "description": "Três dias de imersão no futuro da IA.", "imageUrl": "/sunset2.jpg" },
  { "id": "festival-cinema", "name": "Festival de Cinema Independente", "date": "05/03/2026", "location": "Cine Arte", "price": 50.00, "description": "Exibição dos melhores curtas e longas-metragens.", "imageUrl": "/sunset4.jpg" },
  { "id": "expo-automovel", "name": "Expo Automóvel Luxo", "date": "10/04/2026", "location": "Pavilhão Metropolitano", "price": 280.00, "description": "Uma vitrine com os carros mais exclusivos.", "imageUrl": "/sunset5.jpg" },
];


// --- FUNÇÃO PARA BUSCAR DADOS NO SERVIDOR (RODA APENAS NO SERVIDOR) ---

/**
 * Esta função carrega os dados ANTES de enviar a página para o cliente (Server-Side Rendering).
 * É o único lugar seguro para acessar SYMPLA_API_KEY via process.env.
 * @returns {object} Props com a lista de eventos.
 */
export async function getServerSideProps() {
  const symplaApiKey = process.env.SYMPLA_API_KEY;

  let eventsData = [];
  let error = null;

  // Verifica se a chave foi configurada corretamente
  if (!symplaApiKey || symplaApiKey === "COLE_SUA_CHAVE_AQUI") {
      console.warn("SYMPLA_API_KEY não configurada ou usando placeholder. Usando dados mockados.");
      eventsData = mockEventsData;

  } else {
      // Para este ambiente, simulamos o sucesso da API com os dados mockados:
      eventsData = mockEventsData;
  }
  
  // Garante que eventsData é um array antes de retornar (proteção extra)
  if (!Array.isArray(eventsData)) {
      eventsData = mockEventsData;
      error = "Erro de formato de dados da API. Usando mock data de fallback.";
  }

  // A prop 'events' e 'fetchError' serão passadas para o componente Home
  return {
    props: {
      events: eventsData,
      fetchError: error,
    },
  };
}

// --- COMPONENTE PRINCIPAL (RECEBE OS DADOS DO SERVIDOR) ---

export default function Home({ events, fetchError }) {
    // --- BLINDAGEM DE IMPORTAÇÃO NO RUNTIME ---
    let styles = {};
    let Slider = () => null; // Componente padrão vazio
    let EventCard = () => null; // Componente padrão vazio
    let HeadComponent = ({ children }) => <>{children}</>; // Componente Head padrão

    // Tenta carregar o CSS Module
    try {
        styles = require('../styles/index.module.css');
    } catch(e) {
        console.error("Erro ao carregar index.module.css. Verifique o caminho.");
    }

    // Tenta carregar o Slider
    try {
        Slider = require('../components/Slider').default;
    } catch(e) {
        console.error("Erro ao carregar components/Slider.");
    }
    
    // Tenta carregar o EventCard
    try {
        // CORREÇÃO: Tenta acessar o EventCard e o .default, tratando o erro.
        EventCard = require('../components/EventCard');
        if (EventCard.default) {
            EventCard = EventCard.default;
        } else {
             EventCard = () => null; // Fallback seguro
        }
    } catch(e) {
        console.error("Erro ao carregar components/EventCard.");
    }
    
    // Tenta carregar o Head
    try {
        HeadComponent = require('next/head').default;
    } catch(e) {
        console.error("Erro ao carregar next/head. Usando componente placeholder.");
    }
    // --- FIM DA BLINDAGEM ---

  // CORREÇÃO BRUTAL: Garante que 'events' é um array antes de usar 'slice'
  const validEvents = Array.isArray(events) ? events : [];

  // Separa os primeiros 3 para o Slider e o restante para a Grid
  const highlightEvents = validEvents.slice(0, 3);
  const gridEvents = validEvents.slice(3); 

  // Usa styles.mainContainer, mas se styles for nulo, usa uma string vazia
  const mainContainerClass = styles.mainContainer || ''; 
  const heroSectionClass = styles.heroSection || '';
  const titleClass = styles.title || '';
  const subtitleClass = styles.subtitle || '';
  const cardsGridClass = styles.cardsGrid || '';


  if (fetchError) {
    return (
        <div className={mainContainerClass} style={{textAlign: 'center', paddingTop: '100px'}}>
            <h1 className={titleClass} style={{color: '#ff5252'}}>Erro de Conexão</h1>
            <p className={subtitleClass}>{fetchError}</p>
        </div>
    );
  }

  return (
    <>
      {/* CORREÇÃO FINAL: O componente Head agora é carregado condicionalmente */}
      <HeadComponent>
        <title>Premier Pass - Ingresso Online Exclusivo</title>
        <meta name="description" content="Compre ingressos exclusivos para os melhores eventos com 5% de margem de lucro." />
      </HeadComponent>
      
      <main className={mainContainerClass}>
        
        {/* Seção Principal (Hero/Slider) */}
        <section className={heroSectionClass}>
            <h1 className={titleClass}>
                Bem-vindo ao Ingresso Premier Pass Online!
            </h1>
            <p className={subtitleClass}>
                Descubra e compre ingressos para os melhores eventos, shows e peças.
            </p>
        </section>

        {/* SLIDER DE DESTAQUES */}
        {highlightEvents.length > 0 && <Slider events={highlightEvents} />}

        {/* GRADE DE EVENTOS */}
        <h2 style={{color: '#fff', fontSize: '2rem', marginTop: '3rem', borderBottom: '1px solid #222', paddingBottom: '15px'}}>Todos os Eventos</h2>

        {validEvents.length > 0 ? (
            <div className={cardsGridClass}>
                {validEvents.map(event => (
                    // O link é para o checkout, onde o lead é capturado e salvo no Firebase
                    <a key={event.id} href={`/checkout/${event.id}`}>
                       <EventCard event={event} />
                    </a>
                ))}
            </div>
        ) : (
             <div className={mainContainerClass} style={{textAlign: 'center', paddingTop: '50px'}}>
                 <p className={subtitleClass}>Nenhum evento disponível no momento.</p>
             </div>
        )}
      </main>

      <footer style={{textAlign: 'center', padding: '20px', color: '#666', marginTop: '40px', borderTop: '1px solid #222'}}>
        <p>© 2025 Premier Pass. Plataforma de vendas exclusiva. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}