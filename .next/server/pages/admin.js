(()=>{var e={};e.id=964,e.ids=[964,888,660],e.modules={1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},8875:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>x,default:()=>u,getServerSideProps:()=>b,getStaticPaths:()=>h,getStaticProps:()=>m,reportWebVitals:()=>g,routeModule:()=>S,unstable_getServerProps:()=>w,unstable_getServerSideProps:()=>k,unstable_getStaticParams:()=>j,unstable_getStaticPaths:()=>v,unstable_getStaticProps:()=>f});var o=r(7093),n=r(5244),i=r(1323),s=r(1777),l=r.n(s),d=r(71),c=r(3204),p=e([c]);c=(p.then?(await p)():p)[0];let u=(0,i.l)(c,"default"),m=(0,i.l)(c,"getStaticProps"),h=(0,i.l)(c,"getStaticPaths"),b=(0,i.l)(c,"getServerSideProps"),x=(0,i.l)(c,"config"),g=(0,i.l)(c,"reportWebVitals"),f=(0,i.l)(c,"unstable_getStaticProps"),v=(0,i.l)(c,"unstable_getStaticPaths"),j=(0,i.l)(c,"unstable_getStaticParams"),w=(0,i.l)(c,"unstable_getServerProps"),k=(0,i.l)(c,"unstable_getServerSideProps"),S=new o.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/admin",pathname:"/admin",bundlePath:"",filename:""},components:{App:d.default,Document:l()},userland:c});a()}catch(e){a(e)}})},71:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var a=r(997);let o=require("next/head");var n=r.n(o),i=r(6689);let s=()=>{let[e,t]=(0,i.useState)(!1),[r,o]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=()=>{window.scrollY>50?t(!0):t(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let n=()=>{o(!r)};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("nav",{className:`navbar ${e?"scrolled":""}`,children:[(0,a.jsxs)("div",{className:"nav-container",children:[a.jsx("div",{className:"logo-container",children:(0,a.jsxs)("a",{href:"/",className:"logo-link",children:[a.jsx("span",{className:"logo-icon",children:"\uD83C\uDFAB"}),a.jsx("span",{className:"logo-text",children:"Premier Pass"})]})}),(0,a.jsxs)("div",{className:"desktop-menu",children:[a.jsx("a",{href:"/",className:"nav-link",children:"Home"}),a.jsx("a",{href:"#eventos",className:"nav-link",children:"Eventos"}),a.jsx("a",{href:"#sobre",className:"nav-link",children:"Sobre"}),a.jsx("a",{href:"#contato",className:"nav-link",children:"Contato"}),a.jsx("button",{className:"cta-button",children:"Entrar"})]}),a.jsx("div",{className:"mobile-toggle",onClick:n,children:(0,a.jsxs)("div",{className:`hamburger ${r?"open":""}`,children:[a.jsx("span",{}),a.jsx("span",{}),a.jsx("span",{})]})})]}),(0,a.jsxs)("div",{className:`mobile-menu ${r?"active":""}`,children:[a.jsx("a",{href:"/",onClick:n,children:"Home"}),a.jsx("a",{href:"#eventos",onClick:n,children:"Eventos"}),a.jsx("a",{href:"#sobre",onClick:n,children:"Sobre"}),a.jsx("a",{href:"#contato",onClick:n,children:"Contato"}),a.jsx("button",{className:"mobile-cta",children:"Acessar Conta"})]})]}),a.jsx("style",{children:`
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
            `})]})};r(6764);let l=function({Component:e,pageProps:t}){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n(),{children:[a.jsx("title",{children:"Ingresso Online - Luxo 2025"}),a.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),a.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",rel:"stylesheet"}),a.jsx("link",{rel:"icon",href:"/favicon.ico"})]}),a.jsx(s,{}),a.jsx(e,{...t})]})}},3204:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>c});var o=r(997),n=r(6689),i=r(3745),s=r(401),l=r(1492),d=e([i,s,l]);[i,s,l]=d.then?(await d)():d;let p=("undefined"!=typeof __app_id?__app_id:"default-app-id").replace(/\//g,"_"),u="undefined"!=typeof __firebase_config?JSON.parse(__firebase_config):{},m="undefined"!=typeof __initial_auth_token?__initial_auth_token:null,h=(0,i.initializeApp)(u),b=(0,l.getFirestore)(h),x=(0,s.getAuth)(h);function c(){let[e,t]=(0,n.useState)([]),[r,a]=(0,n.useState)(!0),[i,d]=(0,n.useState)(null),[c,u]=(0,n.useState)(!1);(0,n.useEffect)(()=>{let e=()=>{};return async function(){try{m?await (0,s.signInWithCustomToken)(x,m):await (0,s.signInAnonymously)(x)}catch(e){console.error("Auth failed:",e)}}(),e=(0,s.onAuthStateChanged)(x,e=>{e&&d(e.uid),u(!0)}),()=>e()},[]),(0,n.useEffect)(()=>{if(!c||!i)return;console.log("Starting Firestore subscription for UID:",i);let e=(0,l.collection)(b,`artifacts/${p}/users/${i}/orders`),r=(0,l.onSnapshot)((0,l.query)(e),e=>{let r=e.docs.map(e=>({id:e.id,...e.data(),timestamp:e.data().timestamp?e.data().timestamp.toDate().toLocaleString("pt-BR"):"N/A"}));t(r),a(!1)},e=>{console.error("Firestore subscription failed:",e),a(!1)});return()=>r()},[c,i]);let h=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e),g=e.reduce((e,t)=>e+(t.profitMargin||0),0);if(r||!c)return(0,o.jsxs)("div",{className:"loadingContainer",children:[o.jsx("div",{className:"spinner"}),o.jsx("h1",{className:"loadingTitle",children:"Carregando Painel de Administra\xe7\xe3o..."}),o.jsx("p",{className:"loadingText",children:"Conectando ao Firebase em tempo real."})]});let f=`
        :root {
            --accent-color: #00bcd4;
            --text-color: #e0e0e0;
            --bg-color: #121212;
            --card-bg: #1f1f1f;
            --border-color: #333;
            --success-color: #4CAF50;
            --pending-color: #FFC107;
        }

        /* Layout Geral */
        .adminContainer {
            max-width: 1400px;
            margin: 0 auto;
            padding: 4rem 1rem;
            min-height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
        }
        .adminTitle {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: var(--accent-color);
        }
        .adminSubtitle {
            font-size: 1.1rem;
            color: #aaa;
            margin-bottom: 2rem;
        }
        .profitHighlight {
            color: var(--success-color);
            font-weight: bold;
            margin-left: 8px;
        }
        .userIdDisplay {
            margin-top: 30px;
            font-size: 0.8rem;
            color: #555;
        }

        /* Tabela de Pedidos */
        .ordersTableContainer {
            overflow-x: auto;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
        }
        .ordersTable {
            width: 100%;
            border-collapse: collapse;
            min-width: 800px; /* Garante que a tabela n\xe3o seja muito espremida em telas menores */
        }

        .ordersTable th, .ordersTable td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        .ordersTable th {
            background-color: #282828;
            color: var(--accent-color);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.9rem;
        }

        .ordersTable td {
            background-color: var(--card-bg);
            color: var(--text-color);
            vertical-align: top;
            font-size: 0.95rem;
        }
        
        .ordersTable tr:hover td {
            background-color: #252525;
        }

        .eventName {
            font-weight: 600;
            color: #fff;
        }

        .profitMargin {
            font-weight: bold;
            color: var(--success-color);
        }

        /* Tags de Status */
        .statusTag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-pending_fulfillment {
            background-color: var(--pending-color);
            color: #333;
        }
        .status-fulfilled { /* Se voc\xea adicionar l\xf3gica de "cumprido" */
            background-color: var(--success-color);
            color: #fff;
        }

        /* Bot\xe3o de A\xe7\xe3o */
        .actionButton {
            display: inline-block;
            padding: 8px 12px;
            background-color: #5c6bc0;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        .actionButton:hover {
            background-color: #7986cb;
        }
        
        .noOrdersMessage {
            padding: 40px;
            text-align: center;
            background-color: #282828;
            border-radius: 8px;
            border: 1px solid var(--accent-color);
            color: #fff;
        }

        /* Responsividade para Tabelas (Mobile) */
        @media (max-width: 768px) {
            .ordersTable, .ordersTable thead, .ordersTable tbody, .ordersTable th, .ordersTable td, .ordersTable tr {
                display: block;
            }

            .ordersTable thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            .ordersTable tr {
                margin-bottom: 15px;
                border: 1px solid var(--accent-color);
                border-radius: 8px;
                overflow: hidden;
            }

            .ordersTable td {
                border: none;
                position: relative;
                padding-left: 50%; 
                text-align: right;
            }

            .ordersTable td:before {
                content: attr(data-label);
                position: absolute;
                left: 10px;
                width: 45%; 
                padding-right: 10px;
                white-space: nowrap;
                text-align: left;
                font-weight: bold;
                color: var(--accent-color);
            }

            .adminTitle { font-size: 2rem; }
        }
    `;return(0,o.jsxs)("div",{className:"adminContainer",children:[o.jsx("h1",{className:"adminTitle",children:"Painel de Administra\xe7\xe3o Premier Pass"}),(0,o.jsxs)("p",{className:"adminSubtitle",children:["Leads capturados em tempo real (Total de Lucro Pendente:",o.jsx("span",{className:"profitHighlight",children:h(g)}),")"]}),(0,o.jsxs)("p",{className:"userIdDisplay",children:["Seu ID de Usu\xe1rio para Pedidos (Refer\xeancia do Firestore): ",i||"Aguardando autentica\xe7\xe3o..."]}),0===e.length?o.jsx("div",{className:"noOrdersMessage",children:o.jsx("p",{children:"Nenhum pedido de ingresso capturado ainda. Compartilhe o link do seu site!"})}):o.jsx("div",{className:"ordersTableContainer",children:(0,o.jsxs)("table",{className:"ordersTable",children:[o.jsx("thead",{children:(0,o.jsxs)("tr",{children:[o.jsx("th",{children:"ID Pedido"}),o.jsx("th",{children:"Data/Hora"}),o.jsx("th",{children:"Evento"}),o.jsx("th",{children:"Cliente"}),o.jsx("th",{children:"Status"}),o.jsx("th",{children:"Qtd."}),o.jsx("th",{children:"Lucro (5%)"}),o.jsx("th",{children:"A\xe7\xe3o"})]})}),o.jsx("tbody",{children:e.map(e=>(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{"data-label":"ID Pedido",children:[e.id.substring(0,8),"..."]}),o.jsx("td",{"data-label":"Data/Hora",children:e.timestamp}),o.jsx("td",{"data-label":"Evento",className:"eventName",children:e.eventName}),(0,o.jsxs)("td",{"data-label":"Cliente",children:[e.customer.name,o.jsx("br",{}),o.jsx("small",{children:e.customer.email})]}),o.jsx("td",{"data-label":"Status",children:o.jsx("span",{className:`statusTag status-${e.status.toLowerCase()}`,children:e.status.replace("_"," ")})}),o.jsx("td",{"data-label":"Qtd.",children:e.quantity}),o.jsx("td",{"data-label":"Lucro",className:"profitMargin",children:h(e.profitMargin)}),o.jsx("td",{"data-label":"A\xe7\xe3o",children:o.jsx("a",{href:e.symplaUrl,target:"_blank",rel:"noopener noreferrer",className:"actionButton",children:"Completar Sympla →"})})]},e.id))})]})}),o.jsx("style",{dangerouslySetInnerHTML:{__html:f}})]})}a()}catch(e){a(e)}})},6764:()=>{},5244:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},3745:e=>{"use strict";e.exports=import("firebase/app")},401:e=>{"use strict";e.exports=import("firebase/auth")},1492:e=>{"use strict";e.exports=import("firebase/firestore")},1017:e=>{"use strict";e.exports=require("path")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[777],()=>r(8875));module.exports=a})();