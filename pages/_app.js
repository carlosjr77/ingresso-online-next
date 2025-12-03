import Head from 'next/head';
import Navbar from '../components/Navbar'; // Importa a nova Navbar
// NOTE: Você pode precisar ajustar o caminho se a sua estrutura de diretórios for diferente
// import '../styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Head com metadata e fontes para todas as páginas */}
      <Head>
        <title>Ingresso Online - Premier Pass</title>
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