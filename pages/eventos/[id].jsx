import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/Detalhes.module.css';

// Hook para buscar dados específicos do evento (simulação)
const useEventData = (id) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    // Simulação de busca: Leria o events.json e filtraria pelo ID
    // CORREÇÃO: Usando caminho relativo 'events.json' em vez de '/events.json'
    // para tentar contornar o erro de 'Failed to parse URL' em certos ambientes.
    fetch('events.json')
      .then(res => res.json())
      .then(data => {
        // Assume que data é um array, ou precisa ser corrigido dependendo da estrutura do JSON.
        // O arquivo events.json é um array direto de objetos de eventos.
        const eventArray = Array.isArray(data) ? data : (data && data.events ? data.events : []);
        
        const foundEvent = eventArray.find(e => e.id.toString() === id);
        setEvent(foundEvent);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar evento:', error);
        setLoading(false);
      });
  }, [id]);

  return { event, loading };
};

export default function EventoDetalhes() {
  const router = useRouter();
  const { id } = router.query;
  const { event, loading } = useEventData(id);

  const handleBack = () => {
    router.push('/');
  };

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
        <h1>Evento não encontrado</h1>
        <p>O ID do evento solicitado não corresponde a nenhum evento em nossos registros.</p>
        <button onClick={handleBack} className={styles.backButton}>Voltar para Eventos</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.detailCard}>
          <h1 className={styles.title}>{event.name}</h1>
          <p className={styles.tagline}>{event.description || "Detalhes do evento em breve."}</p>

          <div className={styles.infoGrid}>
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
            <button className={styles.buyButton}>
              Comprar Ingressos | R$ {event.price ? event.price.toFixed(2).replace('.', ',') + '+' : 'Preço a Definir'}
            </button>
            <p className={styles.availability}>Ingressos disponíveis: {event.availability || 'Consultar'}</p>
          </div>
        </div>
      </main>

      {/* Estilização específica da página de detalhes */}
      <style jsx global>{`
        /* Importa as cores globais */
        :root {
            --background-color: #121212;
            --text-color: #f0f0f0;
            --card-bg-color: #1e1e1e;
            --accent-color: #00bcd4;
        }

        body {
            background-color: var(--background-color);
            color: var(--text-color);
        }
      `}</style>
    </div>
  );
}