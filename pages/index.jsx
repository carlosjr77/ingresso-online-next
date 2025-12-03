import { useState } from 'react';
// Não precisamos mais de useEffect para fetch, o dado vem por props

// --- LÓGICA DE SERVIDOR: BUSCA EVENTOS, APLICA LUCRO E RETORNA ---
export async function getServerSideProps() {
    // Pegamos a chave segura do ambiente (disponível no Vercel)
    const apiKey = process.env.SYMPLA_API_KEY;
    const profitMargin = 0.05; // 5% de lucro
    let eventsWithMarkup = [];
    let fetchError = null;

    try {
        if (!apiKey) {
            throw new Error('SYMPLA_API_KEY está ausente. Usando dados MOCKADOS.');
        }

        // 1. Conexão com a Sympla Real
        const response = await fetch('https://api.sympla.com.br/public/v3/events', {
            headers: {
                's_token': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na Sympla: ${response.status}`);
        }

        const data = await response.json();
        let events = data.data || [];

        // 2. Fallback de dados MOCKADOS (se a Sympla não retornar nada ou falhar)
        if (events.length === 0) {
            events = [
                { id: 1, name: "Réveillon Celebrare 2026", start_date: "31/12/2025", address: { name: "Clube Monte Líbano, RJ" }, image: "https://placehold.co/600x400/9c27b0/ffffff?text=Celebrare", original_price: 750.00 },
                { id: 2, name: "Péricles e Natanzinho Lima", start_date: "20/12/2025", address: { name: "Arena Folk Valley" }, image: "https://placehold.co/600x400/4527a0/ffffff?text=Show", original_price: 180.00 }
            ];
            // Marcamos para saber que é mockado, se necessário
            events = events.map(e => ({...e, isMock: true})); 
        }

        // 3. Aplicação da Margem de Lucro
        eventsWithMarkup = events.map(event => {
            const basePrice = event.original_price || 100.00; 
            const sellingPrice = basePrice * (1 + profitMargin); 

            return {
                id: event.id,
                name: event.name || event.name_event,
                date: event.start_date,
                location: event.address ? event.address.name : 'Local a definir',
                price: parseFloat(sellingPrice.toFixed(2)), 
                // Link para checkout interno que salva o lead
                checkoutUrl: `/checkout/${event.id}` 
            };
        });

    } catch (error) {
        console.error("Erro FATAL no servidor (getServerSideProps):", error.message);
        fetchError = error.message;

        // Se falhar, carregamos apenas os mocks para evitar um erro 500 no Vercel
        eventsWithMarkup = [
            { id: "show-banda-a", name: "Show de Lançamento - Banda A", date: "15/12/2025", location: "Arena Principal", price: 126.00, checkoutUrl: "/checkout/show-banda-a" },
            { id: "congresso-tech-2026", name: "Congresso de Tecnologia 2026", date: "20/01/2026", location: "Centro de Convenções", price: 472.50, checkoutUrl: "/checkout/congresso-tech-2026" }
        ];
    }

    // Retorna os dados para o componente Home como props
    return {
        props: {
            events: eventsWithMarkup,
            error: fetchError
        },
    };
}
// --- FIM DA LÓGICA DE SERVIDOR ---


export default function Home({ events = [], error }) { // CORREÇÃO AQUI: events agora tem valor padrão []
  
  // --- CSS do Painel de Administração como string para evitar warnings ---
  const homeStyles = `
    /* Cores Base (Assumindo um tema escuro) */
    :root {
        --accent-color: #00bcd4; /* Azul ciano */
        --text-color: #e0e0e0; /* Texto claro */
        --background-color: #121212; /* Fundo muito escuro */
        --card-bg: #1f1f1f; /* Fundo do Card */
        --success-color: #4CAF50; /* Verde para Preço */
    }
    
    /* Reset Básico (ajustado para ser local e global) */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: var(--background-color);
        color: var(--text-color);
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
    }

    /* -------------------------------------------------------------------------- */
    /* Estilos da Página Home (index.module.css mesclado) */
    /* -------------------------------------------------------------------------- */
    
    /* Main Container: Combina a largura do index.module.css e o background */
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem 4rem 1rem; 
        min-height: 100vh;
    }

    /* Hero Section */
    .heroSection {
        text-align: center;
        padding: 6rem 1rem 4rem 1rem;
        color: var(--accent-color); 
    }

    .title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        background: linear-gradient(90deg, var(--accent-color), #5c6bc0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .description { /* Mapeia para o .subtitle original do CSS Module */
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--text-color);
        margin-bottom: 3rem;
        opacity: 0.85;
    }

    /* Cards Grid */
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        padding-top: 2rem;
    }
    
    /* Card Style */
    .card {
        display: block;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #333;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
        background-color: var(--card-bg);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .card:hover, .card:focus, .card:active {
        border-color: var(--accent-color);
        box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4);
    }

    .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.25rem;
        color: var(--accent-color); 
    }

    .card p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
        color: #aaa;
    }

    /* Price Tag e Feedback */
    .priceTag {
        font-weight: bold;
        color: var(--success-color); 
        margin-top: 10px;
    }
    .noEventsMessage {
        text-align: center;
        padding: 40px;
        color: var(--text-color);
        border: 1px dashed #555;
        border-radius: 8px;
        margin-top: 50px;
    }
    .noEventsMessage p {
        margin-bottom: 20px;
    }

    /* Footer Style */
    .footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #222;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #555;
        font-size: 0.8rem;
        margin-top: 40px;
    }

    /* Spinner (para loading) */
    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-top: 4px solid var(--accent-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 20px auto;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Responsividade */
    @media (max-width: 768px) {
        .heroSection {
            padding: 4rem 1rem 2rem 1rem;
        }
        .title {
            font-size: 2.5rem;
        }
        .description {
            font-size: 1.25rem;
        }
        .container {
            padding-bottom: 2rem;
        }
    }
  `;

  // Função para formatar o preço em Reais (com a margem de lucro já incluída)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
  };
  
  // Componente Head removido, usando tags HTML simples
  const HeadContent = (
    <>
      <title>Ingresso Online - Home</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );

  return (
    <div className="container">
      {HeadContent} 

      <main className="main">
        <div className="heroSection">
            <h1 className="title">
                Bem-vindo ao Ingresso Online!
            </h1>

            <p className="description">
                Compre ingressos para os melhores eventos.
            </p>
        </div>
        
        {events.length === 0 ? (
            <div className="noEventsMessage">
                {error && <p style={{color: '#ff5555', fontWeight: 'bold'}}>Erro de Servidor: {error}</p>}
                <p>Nenhum evento encontrado no momento. Verifique a configuração da Sympla API Key no Vercel.</p>
                <div className="spinner"></div>
            </div>
        ) : (
            <div className="grid">
              {events.map(event => (
                // O link agora aponta para o checkoutUrl fornecido pela API
                <a key={event.id} href={event.checkoutUrl} className="card">
                  <h3>{event.name} &rarr;</h3>
                  <p>{event.date} - {event.location}</p>
                  {/* Garantimos que event.price exista antes de tentar formatar */}
                  {event.price && <p className="priceTag">A partir de: {formatCurrency(event.price)}</p>}
                </a>
              ))}
            </div>
        )}
      </main>

      <footer className="footer">
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Vercel
        </a>
      </footer>

      {/* CORREÇÃO: Usando dangerouslySetInnerHTML para injetar o CSS. */}
      <style dangerouslySetInnerHTML={{ __html: homeStyles }} />
    </div>
  );
}