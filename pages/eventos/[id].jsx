import { useState, useEffect } from 'react';
// As importações do next/router e next/image foram removidas e substituídas por código nativo para evitar o erro de compilação.

// Função para obter o ID diretamente do path (funciona no lado do cliente)
const getPathId = () => {
    if (typeof window === 'undefined') return null;
    const pathSegments = window.location.pathname.split('/');
    // Assume a estrutura /eventos/[id]
    return pathSegments[pathSegments.length - 1];
};


// DADOS MOCKADOS COMPLETOS (IMPORTADOS DA HOME PARA CONSISTÊNCIA)
const mockEventsData = [
    {
        "id": "show-banda-a",
        "name": "Show de Lançamento - Banda A",
        "date": "15/12/2025",
        "location": "Arena Principal",
        "price": 120.00,
        "description": "A turnê de lançamento mais aguardada do ano. Um espetáculo de luz e som com a Banda A. Preparamos uma área VIP exclusiva com bar e atendimento dedicado para os nossos clientes Premier Pass.",
        "availability": 1500,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/1000x400/37474F/ffffff?text=LAN%C3%87AMENTO+SHOW",
        "symplaUrl": "https://www.sympla.com.br/evento/show-banda-a/simulacao"
    },
    {
        "id": "congresso-tech-2026",
        "name": "Congresso de Tecnologia 2026",
        "date": "20/01/2026",
        "location": "Centro de Convenções",
        "price": 450.00,
        "description": "Três dias de imersão no futuro da IA e desenvolvimento web. Palestrantes internacionais e workshops práticos. Acesso a todas as plenárias, coquetel de networking e brindes exclusivos.",
        "availability": 500,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/1000x400/26A69A/ffffff?text=TECH+CONGRESSO",
        "symplaUrl": "https://www.sympla.com.br/evento/congresso-tech/simulacao"
    },
    {
        "id": "festival-cinema",
        "name": "Festival de Cinema Independente",
        "date": "05/03/2026",
        "location": "Cine Arte",
        "price": 50.00,
        "description": "Exibição dos melhores curtas e longas-metragens da cena independente nacional. Vote no seu favorito! O ingresso Premier Pass inclui pipoca e bebida gratuita.",
        "availability": 300,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/1000x400/FFB74D/000000?text=FESTIVAL+CINEMA",
        "symplaUrl": "https://www.sympla.com.br/evento/festival-cinema/simulacao"
    },
    {
        "id": "expo-automovel",
        "name": "Expo Automóvel Luxo",
        "date": "10/04/2026",
        "location": "Pavilhão Metropolitano",
        "price": 280.00,
        "description": "Uma vitrine com os carros mais exclusivos e lançamentos de marcas de luxo globais. Nosso pacote inclui acesso ao lounge exclusivo dos patrocinadores.",
        "availability": 1000,
        "discountRate": 0.00,
        "coverImage": "https://placehold.co/1000x400/C0CA33/000000?text=EXPO+AUTOM%C3%93VEL",
        "symplaUrl": "https://www.sympla.com.br/evento/expo-automovel/simulacao"
    },
    {
        "id": "show-pericles-natanzinho",
        "name": "Péricles e Natanzinho Lima - Folk Valley",
        "date": "20/12/2025",
        "location": "Arena Folk Valley",
        "price": 180.00,
        "description": "Show imperdível com Péricles e Natanzinho Lima. O melhor do pagode e forró em uma só noite. Nossos clientes têm prioridade na compra de ingressos de primeira fila.",
        "availability": 800,
        "discountRate": 0.05,
        "symplaUrl": "https://www.sympla.com.br/evento/folk-valley-apresenta-pericles-e-natanzinho-lima/3207294",
        "coverImage": "/image_28d63f.jpg"
    },
    {
        "id": "reveillon-sunset-gigoia",
        "name": "Réveillon Sunset Gigóia - RIO",
        "date": "31/12/2025",
        "location": "Ilha da Gigóia, Barra da Tijuca",
        "price": 600.00, 
        "description": "Festa All Inclusive de Ano Novo na Ilha da Gigóia com vista espetacular e open bar premium. Este é um pacote completo para um Réveillon inesquecível.",
        "availability": 350,
        "discountRate": 0.05,
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-sunset-gigoia",
        "coverImage": "/image_28dd9c.jpg"
    },
    {
        "id": "reveillon-celebrare-2026",
        "name": "Réveillon Celebrare 2026 - RIO",
        "date": "31/12/2025",
        "location": "Clube Monte Líbano, Lagoa",
        "price": 750.00, 
        "description": "Um dos mais tradicionais Réveillons do Rio, no Clube Monte Líbano, com Open Bar e Buffet de alta gastronomia. Exclusivo para clientes que buscam requinte e tradição.",
        "availability": 1200,
        "discountRate": 0.05, 
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-celebrare-2026",
        "coverImage": "/image_28da38.jpg"
    },
    {
        "id": "love-sessions-2025",
        "name": "Love Sessions Festival 2025",
        "date": "20/12/2025",
        "location": "Riocentro, Rio de Janeiro",
        "price": 150.00, 
        "description": "Festival de música eletrônica com os maiores DJs da cena nacional e internacional. Garanta já! Nosso pacote Premier Pass dá acesso a área de descanso exclusiva e bar sem fila.",
        "availability": 2500,
        "discountRate": 0.05, 
        "symplaUrl": "https://www.sympla.com.br/evento/love-sessions-festival-2025-rio-de-janeiro/1234567",
        "coverImage": "/image_287fc4.jpg"
    }
];

// Função auxiliar para calcular o preço com +5% (Margem Premier)
const calculatePremierPrice = (price) => {
    if (typeof price !== 'number' || price <= 0) return 'R$ --';
    const finalPrice = price * 1.05; 
    return `R$ ${finalPrice.toFixed(2)}`;
};


// Hook para buscar dados específicos do evento (usando mockEventsData)
const useEventData = (currentId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CORREÇÃO: Manteve o useEffect dependendo do ID para re-fetch quando a URL muda.
    if (!currentId) {
        if (loading) setLoading(false);
        return;
    }

    setLoading(true);
    // Simulação de busca: Filtra diretamente da lista mockada
    const foundEvent = mockEventsData.find(e => e.id.toString() === currentId);
    
    // Pequeno delay para simular o carregamento (UX)
    setTimeout(() => {
        setEvent(foundEvent);
        setLoading(false);
    }, 300);

  }, [currentId]);

  return { event, loading };
};

export default function EventoDetalhes() {
  // Obtém o ID diretamente do caminho do navegador
  const id = getPathId();
  const { event, loading } = useEventData(id);

  const premierPrice = event ? calculatePremierPrice(event.price) : 'R$ --';

  if (loading || !id) {
    // Exibe o carregamento enquanto espera o ID ser resolvido
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
        <p className="loadingText">Carregando detalhes do evento...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="errorContainer">
        <h1 className="errorTitle">404 | Evento Não Encontrado</h1>
        <p className="errorText">O ID do evento "{id}" não foi localizado.</p>
        {/* Substituindo router.push('/') por navegação nativa */}
        <button onClick={() => window.location.href = '/'} className="backButton">Voltar para Home</button>
      </div>
    );
  }

  // Função para lidar com o clique no botão de compra
  const handleBuyClick = () => {
    if (event.symplaUrl) {
      // Abre o link da Sympla em uma nova aba
      window.open(event.symplaUrl, '_blank');
      
      // NOTA: Aqui é onde adicionaríamos a lógica para SALVAR O PEDIDO no Firebase
      console.log(`Cliente redirecionado para Sympla: ${event.symplaUrl}`);
    } else {
      // Mensagem customizada (substituindo o alert)
      console.warn("URL da Sympla não definida para este evento.");
      const feedbackElement = document.getElementById('buyFeedback');
      if (feedbackElement) {
          feedbackElement.innerText = "Link de compra indisponível no momento. Tente mais tarde.";
      }
    }
  };

  return (
    <div className="detailsContainer">
      <div className="mainContent">
        
        {/* Imagem de Capa do Evento (usando <img> nativo) */}
        <div className="coverImageContainer">
            <img 
                src={event.coverImage || 'https://placehold.co/1000x400/1f1f1f/ffffff?text=EVENTO'} 
                alt={`Capa do evento ${event.name}`} 
                className="coverImage"
            />
        </div>

        <div className="detailCard">
          <h1 className="detailTitle">{event.name}</h1>
          <p className="tagline">PREMIER PASS: {event.description}</p>

          <div className="infoGrid">
            <div className="infoBox">
              <span className="infoLabel">Data e Hora</span>
              <p className="infoValue">{event.date}</p>
            </div>
            <div className="infoBox">
              <span className="infoLabel">Localização</span>
              <p className="infoValue">{event.location}</p>
            </div>
            <div className="infoBox">
              <span className="infoLabel">Preço a partir de (Premier)</span>
              <p className="infoValue priceHighlight">{premierPrice}</p>
            </div>
          </div>
          
          <div className="ctaSection">
            <button 
                className="buyButton"
                onClick={handleBuyClick}
                disabled={!event.symplaUrl}
            >
              Comprar na Sympla | Garanta seu Premier Pass &rarr;
            </button>
            <p className="availability">
                {event.availability > 0 ? `Ingressos disponíveis: ${event.availability}` : 'Ingressos esgotados.'}
            </p>
            <p id="buyFeedback" className="feedbackText"></p>
          </div>
        </div>
      </div>
      
      {/* --- ESTILOS CSS CONSOLIDADOS --- */}
      <style jsx global>{`
        /* Variáveis de cores (devem ser consistentes com o index.jsx) */
        :root {
            --accent-color: #00bcd4;
            --text-color: #e0e0e0;
            --bg-color: #121212;
            --card-bg: #1f1f1f;
            --border-color: #333;
        }

        /* Layout e Container */
        .detailsContainer {
            min-height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 0 1rem 4rem 1rem;
            display: flex;
            justify-content: center;
        }

        .mainContent {
            width: 100%;
            max-width: 1000px;
        }

        /* Imagem de Capa */
        .coverImageContainer {
            width: 100%;
            height: 400px;
            overflow: hidden;
            border-radius: 16px;
            margin-top: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .coverImage {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Cartão de Detalhes */
        .detailCard {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 40px;
            margin-top: -80px; /* Sobrepõe a imagem */
            position: relative;
            z-index: 10;
            box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.6);
        }

        .detailTitle {
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #00bcd4, #5c6bc0);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
        }

        .tagline {
            font-size: 1.1rem;
            color: #aaa;
            margin-bottom: 30px;
            border-bottom: 1px solid #282828;
            padding-bottom: 20px;
            line-height: 1.5;
        }

        /* Grid de Informações */
        .infoGrid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }

        .infoBox {
            background-color: #282828;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid var(--accent-color);
        }

        .infoLabel {
            display: block;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--accent-color);
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .infoValue {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0;
            color: var(--text-color);
        }
        
        .priceHighlight {
            color: #4CAF50; /* Verde para destacar o preço */
            font-size: 1.25rem;
        }

        /* Seção CTA (Call to Action) */
        .ctaSection {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            padding-top: 30px;
            border-top: 1px solid #282828;
        }

        .buyButton {
            width: 100%;
            max-width: 400px;
            padding: 15px 30px;
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            background: linear-gradient(45deg, #00bcd4, #5c6bc0);
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.4s ease;
            box-shadow: 0 0 10px rgba(0, 188, 212, 0.4);
            text-align: center;
        }

        .buyButton:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 20px rgba(0, 188, 212, 0.6);
            background: linear-gradient(45deg, #33e5ff, #7f95ff);
        }
        
        .buyButton:disabled {
            background: #444;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }

        .availability {
            color: #4caf50; 
            font-weight: 500;
        }
        
        .feedbackText {
            color: #ff9800; /* Laranja para feedback/aviso */
            font-size: 0.9rem;
        }

        /* Estado de Carregamento/Erro */
        .loadingContainer, .errorContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            text-align: center;
        }

        .errorTitle { 
            font-size: 2rem;
            color: #ff5722; /* Laranja para erro */
        }
        
        .errorText {
            color: #aaa;
            margin-bottom: 20px;
        }

        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid var(--accent-color);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .backButton {
            background-color: #444;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .backButton:hover {
            background-color: #555;
        }

        /* Responsividade */
        @media (max-width: 600px) {
            .coverImageContainer { height: 250px; }
            .detailCard { 
                padding: 20px; 
                margin-top: -50px;
            }
            .detailTitle { font-size: 2rem; }
            .tagline { font-size: 1rem; }
            .buyButton { font-size: 1rem; padding: 12px 20px; }
            .infoGrid { gap: 15px; }
            .infoBox { padding: 15px; }
            .priceHighlight { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}