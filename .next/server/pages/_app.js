(()=>{var e={};e.id=888,e.ids=[888],e.modules={71:(e,n,o)=>{"use strict";o.r(n),o.d(n,{default:()=>l});var r=o(997);let t=require("next/head");var a=o.n(t),i=o(6689);let s=()=>{let[e,n]=(0,i.useState)(!1),[o,t]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=()=>{window.scrollY>50?n(!0):n(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let a=()=>{t(!o)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("nav",{className:`navbar ${e?"scrolled":""}`,children:[(0,r.jsxs)("div",{className:"nav-container",children:[r.jsx("div",{className:"logo-container",children:(0,r.jsxs)("a",{href:"/",className:"logo-link",children:[r.jsx("span",{className:"logo-icon",children:"\uD83C\uDFAB"}),r.jsx("span",{className:"logo-text",children:"Premier Pass"})]})}),(0,r.jsxs)("div",{className:"desktop-menu",children:[r.jsx("a",{href:"/",className:"nav-link",children:"Home"}),r.jsx("a",{href:"#eventos",className:"nav-link",children:"Eventos"}),r.jsx("a",{href:"#sobre",className:"nav-link",children:"Sobre"}),r.jsx("a",{href:"#contato",className:"nav-link",children:"Contato"}),r.jsx("button",{className:"cta-button",children:"Entrar"})]}),r.jsx("div",{className:"mobile-toggle",onClick:a,children:(0,r.jsxs)("div",{className:`hamburger ${o?"open":""}`,children:[r.jsx("span",{}),r.jsx("span",{}),r.jsx("span",{})]})})]}),(0,r.jsxs)("div",{className:`mobile-menu ${o?"active":""}`,children:[r.jsx("a",{href:"/",onClick:a,children:"Home"}),r.jsx("a",{href:"#eventos",onClick:a,children:"Eventos"}),r.jsx("a",{href:"#sobre",onClick:a,children:"Sobre"}),r.jsx("a",{href:"#contato",onClick:a,children:"Contato"}),r.jsx("button",{className:"mobile-cta",children:"Acessar Conta"})]})]}),r.jsx("style",{children:`
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
            `})]})};o(6764);let l=function({Component:e,pageProps:n}){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a(),{children:[r.jsx("title",{children:"Ingresso Online - Luxo 2025"}),r.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),r.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",rel:"stylesheet"}),r.jsx("link",{rel:"icon",href:"/favicon.ico"})]}),r.jsx(s,{}),r.jsx(e,{...n})]})}},6764:()=>{},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")}};var n=require("../webpack-runtime.js");n.C(e);var o=n(n.s=71);module.exports=o})();