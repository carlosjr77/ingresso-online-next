(()=>{var e={};e.id=405,e.ids=[405,888,660],e.modules={1323:(e,r)=>{"use strict";Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,o){return o in r?r[o]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,o)):"function"==typeof r&&"default"===o?r:void 0}}})},8130:(e,r,o)=>{"use strict";o.r(r),o.d(r,{config:()=>b,default:()=>g,getServerSideProps:()=>u,getStaticPaths:()=>x,getStaticProps:()=>h,reportWebVitals:()=>f,routeModule:()=>P,unstable_getServerProps:()=>w,unstable_getServerSideProps:()=>S,unstable_getStaticParams:()=>k,unstable_getStaticPaths:()=>j,unstable_getStaticProps:()=>v});var t={};o.r(t),o.d(t,{default:()=>m,getServerSideProps:()=>p});var a=o(7093),n=o(5244),i=o(1323),s=o(1777),l=o.n(s),c=o(71),d=o(997);async function p(){let e=process.env.SYMPLA_API_KEY,r=[],o=null;try{if(!e)throw Error("SYMPLA_API_KEY est\xe1 ausente. Usando dados MOCKADOS.");let o=await fetch("https://api.sympla.com.br/public/v3/events",{headers:{s_token:e,"Content-Type":"application/json"}});if(!o.ok)throw Error(`Erro na Sympla: ${o.status}`);let t=(await o.json()).data||[];0===t.length&&(t=(t=[{id:1,name:"R\xe9veillon Celebrare 2026",start_date:"31/12/2025",address:{name:"Clube Monte L\xedbano, RJ"},image:"https://placehold.co/600x400/9c27b0/ffffff?text=Celebrare",original_price:750},{id:2,name:"P\xe9ricles e Natanzinho Lima",start_date:"20/12/2025",address:{name:"Arena Folk Valley"},image:"https://placehold.co/600x400/4527a0/ffffff?text=Show",original_price:180}]).map(e=>({...e,isMock:!0}))),r=t.map(e=>{let r=e.original_price||100;return{id:e.id,name:e.name||e.name_event,date:e.start_date,location:e.address?e.address.name:"Local a definir",price:parseFloat((1.05*r).toFixed(2)),checkoutUrl:`/checkout/${e.id}`}})}catch(e){console.error("Erro FATAL no servidor (getServerSideProps):",e.message),o=e.message,r=[{id:"show-banda-a",name:"Show de Lan\xe7amento - Banda A",date:"15/12/2025",location:"Arena Principal",price:126,checkoutUrl:"/checkout/show-banda-a"},{id:"congresso-tech-2026",name:"Congresso de Tecnologia 2026",date:"20/01/2026",location:"Centro de Conven\xe7\xf5es",price:472.5,checkoutUrl:"/checkout/congresso-tech-2026"}]}return{props:{events:r,error:o}}}function m({events:e=[],error:r}){let o=`
    /* Cores Base (Assumindo um tema escuro) */
    :root {
        --accent-color: #00bcd4; /* Azul ciano */
        --text-color: #e0e0e0; /* Texto claro */
        --background-color: #121212; /* Fundo muito escuro */
        --card-bg: #1f1f1f; /* Fundo do Card */
        --success-color: #4CAF50; /* Verde para Pre\xe7o */
    }
    
    /* Reset B\xe1sico (ajustado para ser local e global) */
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
    /* Estilos da P\xe1gina Home (index.module.css mesclado) */
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
  `,t=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e),a=(0,d.jsxs)(d.Fragment,{children:[d.jsx("title",{children:"Ingresso Online - Home"}),d.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),d.jsx("link",{rel:"icon",href:"/favicon.ico"})]});return(0,d.jsxs)("div",{className:"container",children:[a,(0,d.jsxs)("main",{className:"main",children:[(0,d.jsxs)("div",{className:"heroSection",children:[d.jsx("h1",{className:"title",children:"Bem-vindo ao Ingresso Online!"}),d.jsx("p",{className:"description",children:"Compre ingressos para os melhores eventos."})]}),0===e.length?(0,d.jsxs)("div",{className:"noEventsMessage",children:[r&&(0,d.jsxs)("p",{style:{color:"#ff5555",fontWeight:"bold"},children:["Erro de Servidor: ",r]}),d.jsx("p",{children:"Nenhum evento encontrado no momento. Verifique a configura\xe7\xe3o da Sympla API Key no Vercel."}),d.jsx("div",{className:"spinner"})]}):d.jsx("div",{className:"grid",children:e.map(e=>(0,d.jsxs)("a",{href:e.checkoutUrl,className:"card",children:[(0,d.jsxs)("h3",{children:[e.name," →"]}),(0,d.jsxs)("p",{children:[e.date," - ",e.location]}),e.price&&(0,d.jsxs)("p",{className:"priceTag",children:["A partir de: ",t(e.price)]})]},e.id))})]}),d.jsx("footer",{className:"footer",children:d.jsx("a",{href:"https://vercel.com",target:"_blank",rel:"noopener noreferrer",children:"Powered by Vercel"})}),d.jsx("style",{dangerouslySetInnerHTML:{__html:o}})]})}let g=(0,i.l)(t,"default"),h=(0,i.l)(t,"getStaticProps"),x=(0,i.l)(t,"getStaticPaths"),u=(0,i.l)(t,"getServerSideProps"),b=(0,i.l)(t,"config"),f=(0,i.l)(t,"reportWebVitals"),v=(0,i.l)(t,"unstable_getStaticProps"),j=(0,i.l)(t,"unstable_getStaticPaths"),k=(0,i.l)(t,"unstable_getStaticParams"),w=(0,i.l)(t,"unstable_getServerProps"),S=(0,i.l)(t,"unstable_getServerSideProps"),P=new a.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/index",pathname:"/",bundlePath:"",filename:""},components:{App:c.default,Document:l()},userland:t})},71:(e,r,o)=>{"use strict";o.r(r),o.d(r,{default:()=>l});var t=o(997);let a=require("next/head");var n=o.n(a),i=o(6689);let s=()=>{let[e,r]=(0,i.useState)(!1),[o,a]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=()=>{window.scrollY>50?r(!0):r(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let n=()=>{a(!o)};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("nav",{className:`navbar ${e?"scrolled":""}`,children:[(0,t.jsxs)("div",{className:"nav-container",children:[t.jsx("div",{className:"logo-container",children:(0,t.jsxs)("a",{href:"/",className:"logo-link",children:[t.jsx("span",{className:"logo-icon",children:"\uD83C\uDFAB"}),t.jsx("span",{className:"logo-text",children:"Premier Pass"})]})}),(0,t.jsxs)("div",{className:"desktop-menu",children:[t.jsx("a",{href:"/",className:"nav-link",children:"Home"}),t.jsx("a",{href:"#eventos",className:"nav-link",children:"Eventos"}),t.jsx("a",{href:"#sobre",className:"nav-link",children:"Sobre"}),t.jsx("a",{href:"#contato",className:"nav-link",children:"Contato"}),t.jsx("button",{className:"cta-button",children:"Entrar"})]}),t.jsx("div",{className:"mobile-toggle",onClick:n,children:(0,t.jsxs)("div",{className:`hamburger ${o?"open":""}`,children:[t.jsx("span",{}),t.jsx("span",{}),t.jsx("span",{})]})})]}),(0,t.jsxs)("div",{className:`mobile-menu ${o?"active":""}`,children:[t.jsx("a",{href:"/",onClick:n,children:"Home"}),t.jsx("a",{href:"#eventos",onClick:n,children:"Eventos"}),t.jsx("a",{href:"#sobre",onClick:n,children:"Sobre"}),t.jsx("a",{href:"#contato",onClick:n,children:"Contato"}),t.jsx("button",{className:"mobile-cta",children:"Acessar Conta"})]})]}),t.jsx("style",{children:`
                /* --- ESTILOS DO NAVBAR --- */
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    transition: all 0.4s ease;
                    background: transparent;
                    padding: 1.5rem 0;
                }

                .navbar.scrolled {
                    background: rgba(18, 18, 18, 0.85); /* Fundo escuro semi-transparente */
                    backdrop-filter: blur(12px); /* Efeito de vidro */
                    padding: 0.8rem 0; /* Fica mais fino ao rolar */
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* --- LOGO --- */
                .logo-link {
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: white;
                }

                .logo-icon {
                    font-size: 1.8rem;
                }

                .logo-text {
                    font-size: 1.5rem;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    background: linear-gradient(90deg, #00bcd4, #5c6bc0);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: #00bcd4; /* Fallback */
                }

                /* --- MENU DESKTOP --- */
                .desktop-menu {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .nav-link {
                    color: #e0e0e0;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 1rem;
                    transition: color 0.3s, transform 0.2s;
                    position: relative;
                }

                .nav-link:hover {
                    color: #00bcd4;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    background-color: #00bcd4;
                    transition: width 0.3s ease;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                .cta-button {
                    background: linear-gradient(45deg, #00bcd4, #5c6bc0);
                    color: white;
                    border: none;
                    padding: 0.6rem 1.5rem;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.3s, box-shadow 0.3s;
                    font-size: 0.95rem;
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 15px rgba(0, 188, 212, 0.6);
                }

                /* --- MOBILE HAMBURGUER --- */
                .mobile-toggle {
                    display: none;
                    cursor: pointer;
                }

                .hamburger span {
                    display: block;
                    width: 25px;
                    height: 3px;
                    margin: 5px auto;
                    transition: all 0.3s ease-in-out;
                    background-color: white;
                    border-radius: 3px;
                }

                .hamburger.open span:nth-child(1) {
                    transform: translateY(8px) rotate(45deg);
                }

                .hamburger.open span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.open span:nth-child(3) {
                    transform: translateY(-8px) rotate(-45deg);
                }

                /* --- MENU MOBILE DROPDOWN --- */
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 0;
                    background-color: rgba(18, 18, 18, 0.98);
                    backdrop-filter: blur(15px);
                    z-index: 999;
                    overflow: hidden;
                    transition: height 0.4s cubic-bezier(0.65, 0, 0.35, 1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                }

                .mobile-menu.active {
                    height: 100vh;
                    padding-top: 60px; /* Espa\xe7o para n\xe3o cobrir o logo se necess\xe1rio */
                }

                .mobile-menu a {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.3s;
                }

                .mobile-menu a:hover {
                    color: #00bcd4;
                }

                .mobile-cta {
                    background: transparent;
                    border: 2px solid #00bcd4;
                    color: #00bcd4;
                    padding: 1rem 3rem;
                    font-size: 1.2rem;
                    border-radius: 8px;
                    font-weight: bold;
                    margin-top: 1rem;
                    cursor: pointer;
                }

                /* --- RESPONSIVIDADE --- */
                @media (max-width: 768px) {
                    .desktop-menu {
                        display: none;
                    }
                    .mobile-toggle {
                        display: block;
                        z-index: 1001; /* Fica acima do menu mobile aberto */
                    }
                    .logo-container {
                        z-index: 1001; /* Logo vis\xedvel mesmo com menu aberto */
                    }
                }
            `})]})};o(6764);let l=function({Component:e,pageProps:r}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n(),{children:[t.jsx("title",{children:"Ingresso Online - Luxo 2025"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),t.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",rel:"stylesheet"}),t.jsx("link",{rel:"icon",href:"/favicon.ico"})]}),t.jsx(s,{}),t.jsx(e,{...r})]})}},6764:()=>{},5244:(e,r)=>{"use strict";var o;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return o}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(o||(o={}))},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},1017:e=>{"use strict";e.exports=require("path")}};var r=require("../webpack-runtime.js");r.C(e);var o=e=>r(r.s=e),t=r.X(0,[777],()=>o(8130));module.exports=t})();