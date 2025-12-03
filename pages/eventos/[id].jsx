import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/Detalhes.module.css';

// --- DADOS MOCKADOS (Mantendo consistência com o checkout) ---
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
        "description": "Três dias de imersão no futuro da IA e desenvolvimento web.",
        "availability": 500
    },
    {
        "id": "festival-cinema",
        "name": "Festival de Cinema Independente",
        "date": "05/03/2026",
        "location": "Cine Arte",
        "price": 50.00,
        "description": "Exibição dos melhores curtas e longas-metragens da cena independente nacional.",
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
    },
    {
        "id": "show-pericles-natanzinho",
        "name": "Péricles e Natanzinho Lima - Folk Valley",
        "date": "20/12/2025",
        "location": "Arena Folk Valley",
        "price": 180.00, 
        "description": "Show imperdível com Péricles e Natanzinho Lima. O melhor do pagode e forró em uma só noite.",
        "availability": 800
    },
    {
        "id": "reveillon-sunset-gigoia",
        "name": "Réveillon Sunset Gigóia - RIO",
        "date": "31/12/2025",
        "location": "Ilha da Gigóia, Barra da Tijuca",
        "price": 600.00, 
        "description": "Festa All Inclusive de Ano Novo na Ilha da Gigóia com vista espetacular e open bar premium.",
        "availability": 350
    },
    {
        "id": "reveillon-celebrare-2026",
        "name": "Réveillon Celebrare 2026",
        "date": "31/12/2025",
        "location": "Clube Monte Líbano, Lagoa - RIO",
        "price": 750.00, 
        "description": "Um dos mais tradicionais Réveillons do Rio, no Clube Monte Líbano, com Open Bar e Buffet de alta gastronomia.",
        "availability": 1200
    }
];

// Função auxiliar para calcular o preço com +5%
const calculatePremierPrice = (price) => {
    if (typeof price !== 'number' || price <= 0) return 'R$ --';
    const finalPrice = price * 1.05; // 5% de acréscimo
    return `R$ ${finalPrice.toFixed(2)}`;
};

export default function EventoDetalhes() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    // Busca nos dados locais
    const foundEvent = mockEventsData.find(e => e.id.toString() === id);
    
    // Simula delay de rede
    const timer = setTimeout(() => {
        setEvent(foundEvent);
        setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.errorContainer}>
        <h1>404 | Evento Não Encontrado</h1>
        <button onClick={() => router.push('/')} className={styles.backButton}>Voltar</button>
      </div>
    );
  }

  // Preço a ser exibido (Original + 5%)
  const displayPrice = calculatePremierPrice(event.price);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.detailCard}>
          <h1 className={styles.title}>{event.name}</h1>
          <p className={styles.tagline}>{event.description || "Garanta já o seu ingresso!"}</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Preço Exclusivo Premier</span>
              <p className={styles.infoValue} style={{color: '#4CAF50', fontSize: '1.5rem'}}>
                {displayPrice}
              </p>
              <p style={{fontSize: '0.8rem', color: '#888'}}>Taxa de conveniência inclusa</p>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Data</span>
              <p className={styles.infoValue}>{event.date}</p>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Local</span>
              <p className={styles.infoValue}>{event.location}</p>
            </div>
          </div>
          
          <div className={styles.ctaSection}>
            {/* BOTÃO DIRECIONANDO PARA O CHECKOUT INTERNO */}
            <button 
                onClick={() => router.push(`/checkout/${event.id}`)}
                className={styles.buyButton}
            >
              Comprar Agora
            </button>

            <p className={styles.availability}>
                <span style={{display: 'inline-block', width: '10px', height: '10px', background: '#4CAF50', borderRadius: '50%', marginRight: '5px'}}></span>
                {event.availability} ingressos disponíveis
            </p>
          </div>
        </div>
      </main>

      <style jsx global>{`
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