import React, { useState, useEffect, useMemo } from 'react';

// --- DADOS MOCKADOS DE EVENTOS (EMBUTIDOS para resolver o erro de fetch) ---
// O conteúdo de events.json foi movido para cá para garantir o carregamento
const mockEventsData = [
    {
        "id": "show-banda-a",
        "name": "Show de Lançamento - Banda A",
        "date": "15/12/2025",
        "location": "Arena Principal",
        "price": 120.00,
        "description": "A turnê de lançamento mais aguardada do ano. Um espetáculo de luz e som com a Banda A.",
        "availability": 1500
    },
    {
        "id": "congresso-tech-2026",
        "name": "Congresso de Tecnologia 2026",
        "date": "20/01/2026",
        "location": "Centro de Convenções",
        "price": 450.00,
        "description": "Três dias de imersão no futuro da IA e desenvolvimento web. Palestrantes internacionais e workshops práticos.",
        "availability": 500
    },
    {
        "id": "festival-cinema",
        "name": "Festival de Cinema Independente",
        "date": "05/03/2026",
        "location": "Cine Arte",
        "price": 50.00,
        "description": "Exibição dos melhores curtas e longas-metragens da cena independente nacional. Vote no seu favorito!",
        "availability": 300
    },
    {
        "id": "expo-automovel",
        "name": "Expo Automóvel Luxo",
        "date": "10/04/2026",
        "location": "Pavilhão Metropolitano",
        "price": 280.00,
        "description": "Uma vitrine com os carros mais exclusivos e lançamentos de marcas de luxo globais.",
        "availability": 1000
    }
];

// --- COMPONENTE SLIDER (Embutido) ---
const slidesData = [
    { 
        id: "show-banda-a", 
        title: "Lançamento Exclusivo: O Novo Filósofo do Rock", 
        description: "Única apresentação na capital. Compre seu ingresso VIP antes que acabe!", 
        image: "https://placehold.co/1200x450/00bcd4/ffffff?text=Show+Exclusivo+DESTAQUE+1" 
    },
    { 
        id: "congresso-tech-2026",
        title: "Mega Festival de Verão: Sunburst 2025", 
        description: "Três dias de música, arte e gastronomia com os maiores DJs do mundo.", 
        image: "https://placehold.co/1200x450/536dfe/ffffff?text=Festival+DESTAQUE+2" 
    },
    { 
        id: "festival-cinema",
        title: "Peça Clássica: A Dama das Camélias", 
        description: "Releitura moderna do romance atemporal. Uma experiência imperdível.", 
        image: "https://placehold.co/1200x450/4caf50/ffffff?text=Teatro+DESTAQUE+3" 
    },
];

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const navigate = (direction) => {
        const totalSlides = slidesData.length;
        setCurrentSlide(prev => {
            if (direction === 'next') {
                return (prev + 1) % totalSlides;
            } else {
                return (prev - 1 + totalSlides) % totalSlides;
            }
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            navigate('next');
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="sliderContainer">
            {slidesData.map((slide, index) => (
                <div 
                    key={slide.id} 
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="slideContent">
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                        <a href={`/eventos/${slide.id}`} className="navButtonAction">
                            Ver Detalhes &rarr;
                        </a>
                    </div>
                </div>
            ))}

            <button className="navButton prev" onClick={() => navigate('prev')}>&lt;</button>
            <button className="navButton next" onClick={() => navigate('next')}>&gt;</button>

            <div className="dotsContainer">
                {slidesData.map((_, index) => (
                    <span 
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

// --- COMPONENTE HOME ---
export default function Home() {
  const [events, setEvents] = useState([]);

  // Fetch data CORRIGIDO: Agora usa os dados embutidos (mockEventsData)
  useEffect(() => {
    // Simula o carregamento instantâneo do JSON
    setEvents(mockEventsData); 
    
    // Antiga lógica removida (fetch('/events.json')...)
  }, []);

  return (
    <div className="mainContainer">
      {/* Head simulado (Next.js Head não funciona no preview isolado) */}
      <div style={{display: 'none'}}>
        <title>Ingresso Online - Home</title>
      </div>

      <main>
        {/* Seção Hero com Título */}
        <section className="heroSection">
            <h1 className="title">
            Bem-vindo ao Ingresso Online!
            </h1>
            <p className="subtitle">
            Descubra e compre ingressos para os melhores eventos.
            </p>
        </section>

        {/* Slider de Destaques */}
        <Slider />

        {/* Grid de Eventos */}
        <div className="cardsGrid">
          {Array.isArray(events) && events.length > 0 ? (
            events.map(event => (
                <a key={event.id} href={`/eventos/${event.id}`} className="eventCard">
                <h3>{event.name} &rarr;</h3>
                <p>{event.date} - {event.location}</p>
                </a>
            ))
          ) : (
            <p style={{textAlign: 'center', width: '100%', color: '#aaa'}}>
                Nenhum evento encontrado no momento.
            </p>
          )}
        </div>
      </main>

      <footer className="footer">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by{' '}
          <span className="logo">
             Ingresso Online
          </span>
        </a>
      </footer>

      {/* --- ESTILOS CSS CONSOLIDADOS --- */}
      <style>{`
        :root {
            --accent-color: #00bcd4;
            --text-color: #e0e0e0;
            --background-dark: rgba(0, 0, 0, 0.7);
            --bg-color: #121212;
            --card-bg: #1f1f1f;
            --border-color: #333;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Inter', sans-serif;
            margin: 0;
        }

        /* Hero e Layout */
        .mainContainer {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem 4rem 1rem;
            min-height: 100vh;
        }

        .heroSection {
            text-align: center;
            padding: 4rem 1rem 2rem 1rem;
            color: var(--text-color);
        }

        .title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(90deg, #00bcd4, #5c6bc0);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
        }

        .subtitle {
            font-size: 1.5rem;
            font-weight: 300;
            color: var(--text-color);
            margin-bottom: 2rem;
            opacity: 0.85;
        }

        /* Slider Styles */
        .sliderContainer {
            width: 100%;
            max-width: 1200px; 
            height: 250px; 
            margin: -2rem auto 2rem auto; /* Margem negativa para colar no texto */
            overflow: hidden;
            position: relative;
            border-radius: 16px; 
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
            z-index: 5;
        }

        .slide {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0; left: 0;
            opacity: 0;
            transition: opacity 0.7s ease-in-out; 
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: flex-end;
        }

        .slide.active {
            opacity: 1;
            z-index: 10;
        }

        .slideContent {
            background: linear-gradient(to top, var(--background-dark) 0%, rgba(0, 0, 0, 0) 100%);
            color: #fff;
            padding: 1.5rem; 
            width: 100%;
            z-index: 20;
        }

        .slideContent h2 {
            margin: 0 0 0.25rem 0; 
            font-size: 1.8rem; 
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        .slideContent p {
            margin: 0;
            font-size: 1rem; 
            color: var(--accent-color); 
            font-weight: 600; 
        }
        
        .navButtonAction {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 16px;
            background: var(--accent-color);
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: bold;
        }

        .navButton {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.3); 
            color: #fff;
            border: none;
            padding: 0.8rem 0.5rem; 
            cursor: pointer;
            z-index: 30;
            font-size: 1.5rem; 
        }
        .navButton:hover { background: rgba(0,0,0,0.6); }
        .prev { left: 0; border-radius: 0 16px 16px 0; }
        .next { right: 0; border-radius: 16px 0 0 16px; }

        .dotsContainer {
            position: absolute;
            bottom: 10px;
            width: 100%;
            display: flex;
            justify-content: center;
            z-index: 40;
        }
        .dot {
            height: 8px; width: 8px; margin: 0 5px;
            background-color: rgba(255,255,255,0.4);
            border-radius: 50%;
            cursor: pointer;
        }
        .dot.active { background-color: var(--accent-color); transform: scale(1.2); }

        /* Grid de Eventos */
        .cardsGrid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            padding-top: 1rem;
        }

        .eventCard {
            padding: 1.5rem;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--card-bg);
            transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
            display: block;
            text-decoration: none;
            color: var(--text-color);
        }

        .eventCard:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.5);
            border-color: var(--accent-color);
        }

        .eventCard h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
            color: var(--accent-color);
        }

        .footer {
            padding: 2rem;
            text-align: center;
            border-top: 1px solid var(--border-color);
            margin-top: 2rem;
            color: #777;
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
            .title { font-size: 2.5rem; }
            .sliderContainer { height: 200px; margin: -1.5rem auto 1.5rem auto; }
            .navButton { display: none; }
        }
      `}</style>
    </div>
  );
}