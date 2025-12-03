import React, { useState, useEffect } from 'react';

// --- DADOS MOCKADOS DE EVENTOS (AGORA COM coverImage) ---
const mockEventsData = [
    {
        "id": "show-banda-a",
        "name": "Show de Lançamento - Banda A",
        "date": "15/12/2025",
        "location": "Arena Principal",
        "price": 120.00,
        "description": "A turnê de lançamento mais aguardada do ano. Um espetáculo de luz e som com a Banda A.",
        "availability": 1500,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/400x250/37474F/ffffff?text=LAN%C3%87AMENTO+SHOW" // Placeholder
    },
    {
        "id": "congresso-tech-2026",
        "name": "Congresso de Tecnologia 2026",
        "date": "20/01/2026",
        "location": "Centro de Convenções",
        "price": 450.00,
        "description": "Três dias de imersão no futuro da IA e desenvolvimento web. Palestrantes internacionais e workshops práticos.",
        "availability": 500,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/400x250/26A69A/ffffff?text=TECH+CONGRESSO" // Placeholder
    },
    {
        "id": "festival-cinema",
        "name": "Festival de Cinema Independente",
        "date": "05/03/2026",
        "location": "Cine Arte",
        "price": 50.00,
        "description": "Exibição dos melhores curtas e longas-metragens da cena independente nacional. Vote no seu favorito!",
        "availability": 300,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/400x250/FFB74D/000000?text=FESTIVAL+CINEMA" // Placeholder
    },
    {
        "id": "expo-automovel",
        "name": "Expo Automóvel Luxo",
        "date": "10/04/2026",
        "location": "Pavilhão Metropolitano",
        "price": 280.00,
        "description": "Uma vitrine com os carros mais exclusivos e lançamentos de marcas de luxo globais.",
        "availability": 1000,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/400x250/C0CA33/000000?text=EXPO+AUTOM%C3%93VEL" // Placeholder
    },
    {
        "id": "show-pericles-natanzinho",
        "name": "Péricles e Natanzinho Lima - Folk Valley",
        "date": "20/12/2025",
        "location": "Arena Folk Valley",
        "price": 180.00,
        "description": "Show imperdível com Péricles e Natanzinho Lima. O melhor do pagode e forró em uma só noite.",
        "availability": 800,
        "discountRate": 0.05,
        "symplaUrl": "https://www.sympla.com.br/evento/folk-valley-apresenta-pericles-e-natanzinho-lima/3207294",
        "coverImage": "/image_28d63f.jpg" // Imagem real confirmada
    },
    {
        "id": "reveillon-sunset-gigoia",
        "name": "Réveillon Sunset Gigóia - RIO",
        "date": "31/12/2025",
        "location": "Ilha da Gigóia, Barra da Tijuca",
        "price": 600.00, 
        "description": "Festa All Inclusive de Ano Novo na Ilha da Gigóia com vista espetacular e open bar premium.",
        "availability": 350,
        "discountRate": 0.05,
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-sunset-gigoia",
        "coverImage": "/image_28dd9c.jpg" // Imagem real confirmada
    },
    {
        "id": "reveillon-celebrare-2026",
        "name": "Réveillon Celebrare 2026 - RIO",
        "date": "31/12/2025",
        "location": "Clube Monte Líbano, Lagoa",
        "price": 750.00, 
        "description": "Um dos mais tradicionais Réveillons do Rio, no Clube Monte Líbano, com Open Bar e Buffet de alta gastronomia.",
        "availability": 1200,
        "discountRate": 0.05, 
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-celebrare-2026",
        "coverImage": "/image_28da38.jpg" // Imagem real confirmada
    },
    {
        "id": "love-sessions-2025",
        "name": "Love Sessions Festival 2025",
        "date": "20/12/2025",
        "location": "Riocentro, Rio de Janeiro",
        "price": 150.00, 
        "description": "Festival de música eletrônica com os maiores DJs da cena nacional e internacional. Garanta já!",
        "availability": 2500,
        "discountRate": 0.05, 
        "symplaUrl": "https://www.sympla.com.br/evento/love-sessions-festival-2025-rio-de-janeiro/1234567",
        "coverImage": "/image_287fc4.jpg" // Imagem real confirmada
    }
];

// Função auxiliar para calcular o preço com +5% (Margem Premier)
const calculatePremierPrice = (price) => {
    if (typeof price !== 'number' || price <= 0) return 'R$ --';
    // No grid da Home, mostraremos o preço com a margem de 5% que o cliente pagará
    const finalPrice = price * 1.05; 
    return `R$ ${finalPrice.toFixed(2)}`;
};

// --- COMPONENTE SLIDER ---
const slidesData = [
    // Usando apenas os dados que temos imagens reais para o slider
    { 
        id: "reveillon-sunset-gigoia", 
        title: "ALL INCLUSIVE - PREMIUM",  
        description: "Réveillon Sunset Gigóia: O melhor Ano Novo da Ilha espera por você!", 
        image: "/image_28dd9c.jpg" 
    },
    { 
        id: "love-sessions-2025", 
        title: "GARANTA JÁ ANTES QUE O LOTE VIRE!", 
        description: "Love Sessions Festival: O maior evento de eletrônica do RJ!", 
        image: "/image_287fc4.jpg" 
    },
    { 
        id: "reveillon-celebrare-2026", 
        title: "TRADICIONAL ZONA SUL", 
        description: "Réveillon Celebrare: Open Bar e Buffet de alta gastronomia.", 
        image: "/image_28da38.jpg" 
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
                    {/* Overlay escuro para melhorar leitura do texto */}
                    <div className="slideOverlay"></div>

                    <div className="slideContent">
                        {/* A de Fora (Etiqueta) */}
                        <h2 className="slideTitleTop">{slide.title}</h2>
                        
                        {/* A de Dentro (Descrição Principal) */}
                        <div className="slideMainText">
                            <p>{slide.description}</p>
                            <a href={`/eventos/${slide.id}`} className="navButtonAction">
                                Ver Detalhes &rarr;
                            </a>
                        </div>
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

// --- NOVO COMPONENTE EVENTCARD CONSOLIDADO ---
// Foi movido para dentro deste arquivo para resolver o erro de compilação/caminho.
const EventCard = ({ event, calculatePremierPrice }) => {
    // Adiciona verificação de segurança contra eventos undefined/null durante o carregamento
    if (!event) return null; 
    
    // URL da imagem, com fallback para placeholder se não houver capa
    const imageUrl = event.coverImage || 'https://placehold.co/400x250/1f1f1f/ffffff?text=SEM+IMAGEM';

    // Calcula o preço formatado (função passada via prop do index.jsx)
    const priceText = calculatePremierPrice(event.price);

    return (
        <a href={`/eventos/${event.id}`} className="eventCard">
            {/* Seção da Imagem de Capa */}
            <div className="cardImageContainer">
                <img 
                    src={imageUrl} 
                    alt={`Capa do evento ${event.name}`} 
                    className="cardImage"
                    // Fallback em caso de erro no carregamento da URL
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x250/4A4A4A/ffffff?text=ERRO+IMAGEM'; }}
                />
            </div>
            
            {/* Seção do Conteúdo e Informações */}
            <div className="cardContent">
                <h3 className="cardTitle">{event.name} &rarr;</h3>
                <p className="cardDetails">
                    {event.date} • {event.location}
                </p>
                <p className="cardPriceSection">
                    <span className="price-tag">{priceText}</span>
                    <span className="discount-tag">PREMIER PASS</span>
                </p>
            </div>
        </a>
    );
};
// --- FIM DO NOVO COMPONENTE EVENTCARD CONSOLIDADO ---


// --- COMPONENTE HOME PRINCIPAL ---
export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Agora os dados mockados incluem a imagem de capa
    setEvents(mockEventsData); 
  }, []);

  return (
    <div className="mainContainer">
      {/* Head simulado */}
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

        {/* Grid de Eventos - Usando o novo componente EventCard */}
        <div className="cardsGrid">
          {Array.isArray(events) && events.length > 0 ? (
            events.map(event => (
                <EventCard 
                    key={event.id}
                    event={event} 
                    calculatePremierPrice={calculatePremierPrice}
                />
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

      {/* --- ESTILOS CSS CONSOLIDADOS (incluindo EventCard styles) --- */}
      <style>{`
        :root {
            --accent-color: #00bcd4;
            --text-color: #e0e0e0;
            --background-dark: rgba(0, 0, 0, 0.7);
            --bg-color: #121212;
            --card-bg: #1f1f1f;
            --border-color: #333;
            --card-image-height: 140px; /* Altura da imagem do card no grid */
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

        /* SLIDER - Styles */
        .sliderContainer {
            width: 100%; max-width: 1200px; 
            height: 350px; margin: -2rem auto 2rem auto;
            overflow: hidden; position: relative;
            border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            z-index: 5;
        }
        .slide {
            width: 100%; height: 100%; position: absolute; top: 0; left: 0;
            opacity: 0; transition: opacity 0.7s ease-in-out; 
            background-size: cover; background-position: center;
        }
        .slide.active { opacity: 1; z-index: 10; }
        .slideOverlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 80%);
            z-index: 1;
        }
        .slideContent {
            position: relative; z-index: 20; width: 100%; height: 100%;
            display: flex; flex-direction: column;
            justify-content: flex-start; align-items: flex-start;
            text-align: left; padding: 30px;
        }
        .slideTitleTop {
            position: relative; margin: 0 0 5px 0; font-size: 0.8rem;
            text-transform: uppercase; letter-spacing: 2px;
            color: var(--accent-color); text-shadow: 0 1px 2px rgba(0,0,0,0.8);
            font-weight: 700;
        }
        .slideMainText { display: flex; flex-direction: column; align-items: flex-start; }
        .slideMainText p {
            font-size: 0.85rem; font-weight: 600; color: #fff;
            margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
            max-width: 400px; line-height: 1.4;
        }
        .navButtonAction {
            display: inline-block; padding: 8px 16px; background: var(--accent-color);
            color: #fff; text-decoration: none; border-radius: 50px;
            font-size: 0.8rem; font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4); transition: transform 0.2s;
        }
        .navButtonAction:hover { transform: scale(1.05); }
        .navButton {
            position: absolute; top: 50%; transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.3); color: #fff; border: none; padding: 1rem; 
            cursor: pointer; z-index: 30; font-size: 1.5rem; 
            border-radius: 50%; margin: 0 10px;
        }
        .navButton:hover { background: rgba(0,0,0,0.6); }
        .dotsContainer {
            position: absolute; bottom: 20px; width: 100%;
            display: flex; justify-content: center; z-index: 40;
        }
        .dot {
            height: 10px; width: 10px; margin: 0 6px;
            background-color: rgba(255,255,255,0.4);
            border-radius: 50%; cursor: pointer;
        }
        .dot.active { background-color: var(--accent-color); transform: scale(1.3); }

        /* Grid de Eventos - Container */
        .cardsGrid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            padding-top: 1rem;
        }

        /* --- STYLES DO EVENTCARD (MOVIMENTOS PARA AQUI) --- */
        .eventCard {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--card-bg);
            transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: var(--text-color);
            overflow: hidden; 
        }

        .eventCard:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.5);
            border-color: var(--accent-color);
        }

        .cardImageContainer {
            width: 100%;
            height: var(--card-image-height);
            overflow: hidden;
        }

        .cardImage {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .eventCard:hover .cardImage {
            transform: scale(1.05);
        }

        .cardContent {
            padding: 1.5rem;
        }

        .cardTitle {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
            color: var(--accent-color);
            line-height: 1.2;
        }

        .cardDetails {
            font-size: 0.9rem;
            color: #aaa;
            margin-bottom: 1rem;
        }

        .cardPriceSection {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .price-tag {
            font-weight: 700;
            color: #4CAF50;
            font-size: 1.1rem;
        }

        .discount-tag {
            font-size: 0.75rem;
            font-weight: bold;
            color: #fff;
            background-color: var(--accent-color);
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
        }
        /* --- FIM DOS STYLES DO EVENTCARD --- */


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
            .sliderContainer { height: 300px; margin: -1.5rem auto 1.5rem auto; }
            .navButton { display: none; }
            .slideContent { padding: 20px; }
            .slideTitleTop { font-size: 0.7rem; }
            .slideMainText p { font-size: 0.75rem; max-width: 80%; }
        }
      `}</style>
    </div>
  );
}