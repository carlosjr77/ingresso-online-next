import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// Importamos o JSON diretamente para evitar falhas de 'fetch' em ambiente isolado
import styles from '../../styles/Detalhes.module.css';

// --- DADOS MOCKADOS (CÓPIA DE index.jsx PARA EVITAR ERRO DE FETCH) ---
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
        "symplaUrl": "https://www.sympla.com.br/evento/exemplo-banda-a"
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
        "symplaUrl": "https://www.sympla.com.br/evento/exemplo-congresso-tech"
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
        "symplaUrl": "https://www.sympla.com.br/evento/exemplo-festival-cinema"
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
        "symplaUrl": "https://www.sympla.com.br/evento/exemplo-expo-automovel"
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
        "symplaUrl": "https://www.sympla.com.br/evento/folk-valley-apresenta-pericles-e-natanzinho-lima/3207294" 
    },
    {
        "id": "reveillon-sunset-gigoia",
        "name": "Réveillon Sunset Gigóia - RIO",
        "date": "31/12/2025",
        "location": "Ilha da Gigóia, Barra da Tijuca",
        "price": 600.00, 
        "description": "Festa All Inclusive de Ano Novo na Ilha da Gigóia com vista espetacular e open bar premium.",
        "availability": 350,
        "discountRate": 0.05, // 5% de desconto para o cliente
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-sunset-gigoia" // Link fictício Sympla para o evento
    },
    // --- NOVO EVENTO ADICIONADO: Réveillon Celebrare 2026 ---
    {
        "id": "reveillon-celebrare-2026",
        "name": "Réveillon Celebrare 2026",
        "date": "31/12/2025",
        "location": "Clube Monte Líbano, Lagoa - RIO",
        "price": 750.00, 
        "description": "Um dos mais tradicionais Réveillons do Rio, no Clube Monte Líbano, com Open Bar e Buffet de alta gastronomia.",
        "availability": 1200,
        "discountRate": 0.05, // 5% de desconto exclusivo
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-celebrare-2026" // Link fictício Sympla para o evento
    }
];

// Função auxiliar para calcular o preço com desconto (para exibição)
const calculateDiscountedPrice = (price, discountRate) => {
    if (typeof price !== 'number' || price <= 0) return 'R$ --';
    const finalPrice = price * (1 - (discountRate || 0));
    return `R$ ${finalPrice.toFixed(2)}`;
};

// Hook para buscar dados específicos do evento (agora usando o mockEventsData)
const useEventData = (id) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    // Simulação de busca no objeto embutido (mockEventsData)
    const foundEvent = mockEventsData.find(e => e.id.toString() === id);
    
    // Simula um pequeno delay para carregar
    const timer = setTimeout(() => {
        setEvent(foundEvent);
        setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  return { event, loading };
};

export default function EventoDetalhes() {
  const router = useRouter();
  const { id } = router.query;
  const { event, loading } = useEventData(id);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando detalhes do evento...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.errorContainer}>
        <h1>404 | Evento Não Encontrado</h1>
        <p>O ID do evento "{id}" não foi localizado.</p>
        <button onClick={() => router.push('/')} className={styles.backButton}>Voltar para Eventos</button>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice(event.price, event.discountRate);
  const priceDisplay = event.discountRate > 0 
    ? `${discountedPrice} (5% OFF Exclusivo)` 
    : `R$ ${event.price.toFixed(2)}`;
  
  // Determinamos a URL de compra final
  const buyUrl = event.symplaUrl || '#'; // Se não tiver URL Sympla, usa '#'

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.detailCard}>
          <h1 className={styles.title}>{event.name}</h1>
          <p className={styles.tagline}>{event.description || "Detalhes do evento em breve."}</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Preço (a partir de)</span>
              {/* Se houver desconto, mostra o preço cheio com um risco (simulação) */}
              <p className={styles.infoValue}>
                {event.discountRate > 0 && 
                  <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '10px', fontSize: '1rem' }}>
                    R$ {event.price.toFixed(2)}
                  </span>
                }
                <span style={event.discountRate > 0 ? {color: '#4CAF50'} : {}}>{priceDisplay}</span>
              </p>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Data e Hora</span>
              <p className={styles.infoValue}>{event.date}</p>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Localização</span>
              <p className={styles.infoValue}>{event.location}</p>
            </div>
          </div>
          
          <div className={styles.ctaSection}>
            {/* CORREÇÃO: Botão que envia o usuário para o Sympla */}
            <a 
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.buyButton} 
                style={event.discountRate > 0 ? {backgroundColor: '#4CAF50'} : {}}
            >
              Comprar Ingressos no Sympla
            </a>

            <p className={styles.availability}>Ingressos disponíveis: {event.availability}</p>
          </div>
        </div>
      </main>

      {/* Estilização específica da página de detalhes */}
      <style jsx global>{`
        /* Importa as cores globais */
        :root {
            --background-color: #121212;
            --text-color: #e0e0e0;
            --accent-color: #00bcd4; 
            --card-bg-color: #1f1f1f;
        }
      `}</style>
    </div>
  );
}