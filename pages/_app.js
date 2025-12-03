import Head from 'next/head';
import Navbar from '../components/Navbar';
import '../styles/globals.css'; // Mantenha a importação de estilos globais (se houver)

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Head com metadata e fontes para todas as páginas */}
      <Head>
        <title>Ingresso Online - Luxo 2025</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;