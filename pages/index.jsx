import React, { useState, useEffect, useMemo } from 'react';

// --- DADOS MOCKADOS DE EVENTOS (EMBUTIDOS) ---
// Mantemos os dados aqui para garantir que a Home carregue instantaneamente sem erros de fetch
const mockEventsData = [
    {
        "id": "show-banda-a",
        "name": "Show de Lançamento - Banda A",
        "date": "15/12/2025",
        "location": "Arena Principal"
    },
    {
        "id": "congresso-tech-2026",
        "name": "Congresso de Tecnologia 2026",
        "date": "20/01/2026",
        "location": "Centro de Convenções"
    },
    {
        "id": "festival-cinema",
        "name": "Festival de Cinema Independente",
        "date": "05/03/2026",
        "location": "Cine Arte"
    },
    {
        "id": "expo-automovel",
        "name": "Expo Automóvel Clássico",
        "date": "10/04/2026",
        "location": "Parque de Exposições"
    },
];

const slidesData = [
    { 
        id: "show-banda-a", // ID correspondente ao events.json
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


// --- COMPONENTE DO SLIDER (Embutido) ---
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

    // Auto-avanço do slide
    useEffect(() => {
        const timer = setInterval(() => {
            navigate('next');
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Memoiza o estilo da imagem de fundo
    const getSlideStyle = useMemo(() => (image) => ({
        backgroundImage: `url(${image})`,
    }), []);

    return (
        <div className="sliderContainer">
            {slidesData.map((slide, index) => (
                <div 
                    key={slide.id} 
                    className={`slide ${index === currentSlide ? 'slideActive' : ''}`}
                    style={getSlideStyle(slide.image)}
                >
                    <div className="slideContent">
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                        {/* CORREÇÃO: Link real para a página [id].jsx (sem #) */}
                        <a href={`/eventos/${slide.id}`} className="sliderBtn">
                            Ver Detalhes &rarr;
                        </a>
                    </div>
                </div>
            ))}

            <button 
                className="navButton prev" 
                onClick={() => navigate('prev')}
                aria-label="Slide anterior"
            >
                &lt;
            </button>
            <button 
                className="navButton next" 
                onClick={() => navigate('next')}
                aria-label="Próximo slide"
            >
                &gt;
            </button>

            <div className="dotsContainer">
                {slidesData.map((_, index) => (
                    <span 
                        key={index}
                        className={`dot ${index === currentSlide ? 'dotActive' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Ir para o slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};


// --- COMPONENTE DA PÁGINA PRINCIPAL (HOME) ---
export default function Home() {
  const [events, setEvents] = useState([]);

  // Carrega dados mockados diretamente
  useEffect(() => {
    setEvents(mockEventsData);
  }, []);

  return (
    <>
      {/* Placeholder para o Head */}
      <div style={{ display: 'none' }}>
        <title>Ingresso Online - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </div>

      <div className="mainContainer">
        <main>
          {/* Seção HERO */}
          <section className="heroSection">
            <h1 className="title">
              Bem-vindo ao Ingresso Online!
            </h1>
            <p className="subtitle">
              Descubra e compre ingressos para os melhores eventos, shows e peças.
            </p>
          </section>

          {/* SLIDER */}
          <Slider />

          {/* LISTAGEM DE EVENTOS */}
          <section>
            <h2 className="sectionTitle">Próximos Eventos</h2>

            <div className="cardsGrid">
              {events.map(event => (
                // CORREÇÃO: Link real para a página [id].jsx (sem #)
                <a key={event.id} href={`/eventos/${event.id}`} className="eventCard">
                  <h3>{event.name} &rarr;</h3>
                  <p>{event.date} - {event.location}</p>
                </a>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Feito com <span style={{ color: 'red' }}>&hearts;</span> por Ingresso Online
          </a>
        </footer>
      </div>

      {/* --- ESTILOS CONSOLIDADOS --- */}
      <style>{`
        /* VARIÁVEIS GLOBAIS (Tema Escuro) */
        :root {
            --bg-color: #121212;
            --text-color: #e0e0e0;
            --accent-color: #00bcd4; /* Ciano/Azul Destaque */
            --accent-secondary: #5c6bc0; /* Roxo/Azul Secundário */
            --card-bg: #1f1f1f;
            --border-color: #333;
            --footer-text: #777;
        }

        /* Reset Básico */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif; 
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        a {
            text-decoration: none;
            color: inherit;
            transition: color 0.3s;
        }
        
        /* Fontes (Simulação de next/head) */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        /* --- Estilos da Página (index.module.css) --- */

        .mainContainer {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem 4rem 1rem;
            min-height: 100vh;
        }

        .heroSection {
            text-align: center;
            padding: 6rem 1rem 4rem 1rem;
            color: var(--text-color); 
        }

        .title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(90deg, var(--accent-color), var(--accent-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .subtitle {
            font-size: 1.5rem;
            font-weight: 300;
            color: var(--text-color);
            margin-bottom: 3rem;
            opacity: 0.85;
        }

        .sectionTitle {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
            text-align: center;
            color: var(--text-color);
            padding-top: 1rem;
        }

        .cardsGrid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            padding: 0 1rem;
        }

        .eventCard {
            padding: 1.5rem;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--card-bg);
            transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
            display: block;
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

        .eventCard p {
            margin: 0;
            color: #a0a0a0;
        }

        .footer {
            padding: 2rem;
            text-align: center;
            border-top: 1px solid var(--border-color);
            margin-top: 2rem;
            color: var(--footer-text);
        }

        /* --- Estilos do Slider (Slider.module.css) --- */
        .sliderContainer {
            width: 100%;
            max-width: 1200px; 
            height: 450px; 
            margin: 3rem auto; 
            overflow: hidden;
            position: relative;
            border-radius: 16px; 
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05); 
        }

        .slide {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.7s ease-in-out; 
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: flex-end;
        }

        .slideActive {
            opacity: 1;
            z-index: 10;
        }

        .slideContent {
            width: 100%;
            padding: 40px;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            color: var(--text-color);
        }

        .slideContent h2 {
            font-size: 2.5rem;
            margin: 0 0 10px 0;
            color: var(--accent-color);
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .slideContent p {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }

        .sliderBtn {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(45deg, var(--accent-color), var(--accent-secondary));
            color: white;
            border-radius: 8px;
            font-weight: bold;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .sliderBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 188, 212, 0.5);
        }

        .navButton {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            font-size: 2rem;
            padding: 1rem;
            cursor: pointer;
            z-index: 20;
            transition: background 0.3s;
        }
        .navButton:hover { 
            background: rgba(0,0,0,0.8); 
        }
        .prev { left: 0; border-radius: 0 8px 8px 0; }
        .next { right: 0; border-radius: 8px 0 0 8px; }

        .dotsContainer {
            position: absolute;
            bottom: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 10px;
            z-index: 20;
        }

        .dot {
            width: 12px; height: 12px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s, transform 0.3s;
        }

        .dot:hover {
            background-color: rgba(255, 255, 255, 0.7);
        }

        .dotActive {
            background-color: var(--accent-color); 
            transform: scale(1.2); 
        }

        /* Responsividade */
        @media (max-width: 768px) {
            .heroSection {
                padding: 4rem 1rem 3rem 1rem;
            }
            .title {
                font-size: 2.5rem;
            }
            .subtitle {
                font-size: 1.2rem;
            }
            .sectionTitle {
                font-size: 1.5rem;
            }
            .cardsGrid {
                gap: 1.5rem;
                padding: 0;
            }
            .sliderContainer {
                height: 300px; 
                border-radius: 8px;
            }
            .slideContent {
                padding: 1rem;
            }
            .slideContent h2 {
                font-size: 1.75rem;
            }
            .slideContent p {
                font-size: 1rem;
            }
            .navButton {
                padding: 0.75rem 0.5rem;
                font-size: 1.5rem;
            }
        }
      `}</style>
    </>
  );
}