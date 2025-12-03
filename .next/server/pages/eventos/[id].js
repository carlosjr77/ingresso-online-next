(()=>{var e={};e.id=389,e.ids=[389,888,660],e.modules={1323:(e,a)=>{"use strict";Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,o){return o in a?a[o]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,o)):"function"==typeof a&&"default"===o?a:void 0}}})},9789:(e,a,o)=>{"use strict";o.r(a),o.d(a,{config:()=>y,default:()=>v,getServerSideProps:()=>j,getStaticPaths:()=>k,getStaticProps:()=>w,reportWebVitals:()=>z,routeModule:()=>A,unstable_getServerProps:()=>C,unstable_getServerSideProps:()=>E,unstable_getStaticParams:()=>S,unstable_getStaticPaths:()=>N,unstable_getStaticProps:()=>P});var t={};o.r(t),o.d(t,{default:()=>h});var r=o(7093),i=o(5244),n=o(1323),s=o(1777),l=o.n(s),d=o(71),c=o(997),m=o(9816),b=o.n(m),p=o(6689);let x=()=>null,g=[{id:"show-banda-a",name:"Show de Lan\xe7amento - Banda A",date:"15/12/2025",location:"Arena Principal",price:120,description:"A turn\xea de lan\xe7amento mais aguardada do ano. Um espet\xe1culo de luz e som com a Banda A. Preparamos uma \xe1rea VIP exclusiva com bar e atendimento dedicado para os nossos clientes Premier Pass.",availability:1500,discountRate:0,coverImage:"https://placehold.co/1000x400/37474F/ffffff?text=LAN%C3%87AMENTO+SHOW",symplaUrl:"https://www.sympla.com.br/evento/show-banda-a/simulacao"},{id:"congresso-tech-2026",name:"Congresso de Tecnologia 2026",date:"20/01/2026",location:"Centro de Conven\xe7\xf5es",price:450,description:"Tr\xeas dias de imers\xe3o no futuro da IA e desenvolvimento web. Palestrantes internacionais e workshops pr\xe1ticos. Acesso a todas as plen\xe1rias, coquetel de networking e brindes exclusivos.",availability:500,discountRate:0,coverImage:"https://placehold.co/1000x400/26A69A/ffffff?text=TECH+CONGRESSO",symplaUrl:"https://www.sympla.com.br/evento/congresso-tech/simulacao"},{id:"festival-cinema",name:"Festival de Cinema Independente",date:"05/03/2026",location:"Cine Arte",price:50,description:"Exibi\xe7\xe3o dos melhores curtas e longas-metragens da cena independente nacional. Vote no seu favorito! O ingresso Premier Pass inclui pipoca e bebida gratuita.",availability:300,discountRate:0,coverImage:"https://placehold.co/1000x400/FFB74D/000000?text=FESTIVAL+CINEMA",symplaUrl:"https://www.sympla.com.br/evento/festival-cinema/simulacao"},{id:"expo-automovel",name:"Expo Autom\xf3vel Luxo",date:"10/04/2026",location:"Pavilh\xe3o Metropolitano",price:280,description:"Uma vitrine com os carros mais exclusivos e lan\xe7amentos de marcas de luxo globais. Nosso pacote inclui acesso ao lounge exclusivo dos patrocinadores.",availability:1e3,discountRate:0,coverImage:"https://placehold.co/1000x400/C0CA33/000000?text=EXPO+AUTOM%C3%93VEL",symplaUrl:"https://www.sympla.com.br/evento/expo-automovel/simulacao"},{id:"show-pericles-natanzinho",name:"P\xe9ricles e Natanzinho Lima - Folk Valley",date:"20/12/2025",location:"Arena Folk Valley",price:180,description:"Show imperd\xedvel com P\xe9ricles e Natanzinho Lima. O melhor do pagode e forr\xf3 em uma s\xf3 noite. Nossos clientes t\xeam prioridade na compra de ingressos de primeira fila.",availability:800,discountRate:.05,symplaUrl:"https://www.sympla.com.br/evento/folk-valley-apresenta-pericles-e-natanzinho-lima/3207294",coverImage:"/image_28d63f.jpg"},{id:"reveillon-sunset-gigoia",name:"R\xe9veillon Sunset Gig\xf3ia - RIO",date:"31/12/2025",location:"Ilha da Gig\xf3ia, Barra da Tijuca",price:600,description:"Festa All Inclusive de Ano Novo na Ilha da Gig\xf3ia com vista espetacular e open bar premium. Este \xe9 um pacote completo para um R\xe9veillon inesquec\xedvel.",availability:350,discountRate:.05,symplaUrl:"https://www.sympla.com.br/evento/reveillon-sunset-gigoia",coverImage:"/image_28dd9c.jpg"},{id:"reveillon-celebrare-2026",name:"R\xe9veillon Celebrare 2026 - RIO",date:"31/12/2025",location:"Clube Monte L\xedbano, Lagoa",price:750,description:"Um dos mais tradicionais R\xe9veillons do Rio, no Clube Monte L\xedbano, com Open Bar e Buffet de alta gastronomia. Exclusivo para clientes que buscam requinte e tradi\xe7\xe3o.",availability:1200,discountRate:.05,symplaUrl:"https://www.sympla.com.br/evento/reveillon-celebrare-2026",coverImage:"/image_28da38.jpg"},{id:"love-sessions-2025",name:"Love Sessions Festival 2025",date:"20/12/2025",location:"Riocentro, Rio de Janeiro",price:150,description:"Festival de m\xfasica eletr\xf4nica com os maiores DJs da cena nacional e internacional. Garanta j\xe1! Nosso pacote Premier Pass d\xe1 acesso a \xe1rea de descanso exclusiva e bar sem fila.",availability:2500,discountRate:.05,symplaUrl:"https://www.sympla.com.br/evento/love-sessions-festival-2025-rio-de-janeiro/1234567",coverImage:"/image_287fc4.jpg"}],f=e=>"number"!=typeof e||e<=0?"R$ --":`R$ ${(1.05*e).toFixed(2)}`,u=e=>{let[a,o]=(0,p.useState)(null),[t,r]=(0,p.useState)(!0);return(0,p.useEffect)(()=>{if(!e){t&&r(!1);return}r(!0);let a=g.find(a=>a.id.toString()===e);setTimeout(()=>{o(a),r(!1)},300)},[e]),{event:a,loading:t}};function h(){let e=x(),{event:a,loading:o}=u(e),t=a?f(a.price):"R$ --";return o||!e?(0,c.jsxs)("div",{className:"loadingContainer",children:[c.jsx("div",{className:"spinner"}),c.jsx("p",{className:"loadingText",children:"Carregando detalhes do evento..."})]}):a?(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 detailsContainer",children:[(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 mainContent",children:[c.jsx("div",{className:"jsx-bb05e96330e4a409 coverImageContainer",children:c.jsx("img",{src:a.coverImage||"https://placehold.co/1000x400/1f1f1f/ffffff?text=EVENTO",alt:`Capa do evento ${a.name}`,className:"jsx-bb05e96330e4a409 coverImage"})}),(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 detailCard",children:[c.jsx("h1",{className:"jsx-bb05e96330e4a409 detailTitle",children:a.name}),(0,c.jsxs)("p",{className:"jsx-bb05e96330e4a409 tagline",children:["PREMIER PASS: ",a.description]}),(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 infoGrid",children:[(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 infoBox",children:[c.jsx("span",{className:"jsx-bb05e96330e4a409 infoLabel",children:"Data e Hora"}),c.jsx("p",{className:"jsx-bb05e96330e4a409 infoValue",children:a.date})]}),(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 infoBox",children:[c.jsx("span",{className:"jsx-bb05e96330e4a409 infoLabel",children:"Localiza\xe7\xe3o"}),c.jsx("p",{className:"jsx-bb05e96330e4a409 infoValue",children:a.location})]}),(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 infoBox",children:[c.jsx("span",{className:"jsx-bb05e96330e4a409 infoLabel",children:"Pre\xe7o a partir de (Premier)"}),c.jsx("p",{className:"jsx-bb05e96330e4a409 infoValue priceHighlight",children:t})]})]}),(0,c.jsxs)("div",{className:"jsx-bb05e96330e4a409 ctaSection",children:[c.jsx("button",{onClick:()=>{if(a.symplaUrl)window.open(a.symplaUrl,"_blank"),console.log(`Cliente redirecionado para Sympla: ${a.symplaUrl}`);else{console.warn("URL da Sympla n\xe3o definida para este evento.");let e=document.getElementById("buyFeedback");e&&(e.innerText="Link de compra indispon\xedvel no momento. Tente mais tarde.")}},disabled:!a.symplaUrl,className:"jsx-bb05e96330e4a409 buyButton",children:"Comprar na Sympla | Garanta seu Premier Pass →"}),c.jsx("p",{className:"jsx-bb05e96330e4a409 availability",children:a.availability>0?`Ingressos dispon\xedveis: ${a.availability}`:"Ingressos esgotados."}),c.jsx("p",{id:"buyFeedback",className:"jsx-bb05e96330e4a409 feedbackText"})]})]})]}),c.jsx(b(),{id:"bb05e96330e4a409",children:":root{--accent-color:#00bcd4;--text-color:#e0e0e0;--bg-color:#121212;--card-bg:#1f1f1f;--border-color:#333}.detailsContainer{min-height:100vh;background-color:var(--bg-color);color:var(--text-color);padding:0 1rem 4rem 1rem;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center}.mainContent{width:100%;max-width:1e3px}.coverImageContainer{width:100%;height:400px;overflow:hidden;-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px;margin-top:2rem;-webkit-box-shadow:0 10px 30px rgba(0,0,0,.5);-moz-box-shadow:0 10px 30px rgba(0,0,0,.5);box-shadow:0 10px 30px rgba(0,0,0,.5)}.coverImage{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.detailCard{background-color:var(--card-bg);border:1px solid var(--border-color);-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px;padding:40px;margin-top:-80px;position:relative;z-index:10;-webkit-box-shadow:0 -10px 30px rgba(0,0,0,.6);-moz-box-shadow:0 -10px 30px rgba(0,0,0,.6);box-shadow:0 -10px 30px rgba(0,0,0,.6)}.detailTitle{font-size:2.8rem;font-weight:800;margin-bottom:10px;background:-webkit-linear-gradient(left,#00bcd4,#5c6bc0);background:-moz-linear-gradient(left,#00bcd4,#5c6bc0);background:-o-linear-gradient(left,#00bcd4,#5c6bc0);background:linear-gradient(90deg,#00bcd4,#5c6bc0);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.tagline{font-size:1.1rem;color:#aaa;margin-bottom:30px;border-bottom:1px solid#282828;padding-bottom:20px;line-height:1.5}.infoGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px;margin-bottom:40px}.infoBox{background-color:#282828;padding:20px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;border-left:4px solid var(--accent-color)}.infoLabel{display:block;font-size:.9rem;font-weight:500;color:var(--accent-color);margin-bottom:5px;text-transform:uppercase}.infoValue{font-size:1.1rem;font-weight:600;margin:0;color:var(--text-color)}.priceHighlight{color:#4CAF50;font-size:1.25rem}.ctaSection{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;gap:15px;padding-top:30px;border-top:1px solid#282828}.buyButton{width:100%;max-width:400px;padding:15px 30px;font-size:1.2rem;font-weight:700;color:#fff;background:-webkit-linear-gradient(45deg,#00bcd4,#5c6bc0);background:-moz-linear-gradient(45deg,#00bcd4,#5c6bc0);background:-o-linear-gradient(45deg,#00bcd4,#5c6bc0);background:linear-gradient(45deg,#00bcd4,#5c6bc0);border:none;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;cursor:pointer;-webkit-transition:-webkit-transform.2s ease,box-shadow.4s ease;-moz-transition:-moz-transform.2s ease,box-shadow.4s ease;-o-transition:-o-transform.2s ease,box-shadow.4s ease;transition:-webkit-transform.2s ease,box-shadow.4s ease;transition:-moz-transform.2s ease,box-shadow.4s ease;transition:-o-transform.2s ease,box-shadow.4s ease;transition:transform.2s ease,box-shadow.4s ease;-webkit-box-shadow:0 0 10px rgba(0,188,212,.4);-moz-box-shadow:0 0 10px rgba(0,188,212,.4);box-shadow:0 0 10px rgba(0,188,212,.4);text-align:center}.buyButton:hover{-webkit-transform:translatey(-3px);-moz-transform:translatey(-3px);-ms-transform:translatey(-3px);-o-transform:translatey(-3px);transform:translatey(-3px);-webkit-box-shadow:0 0 20px rgba(0,188,212,.6);-moz-box-shadow:0 0 20px rgba(0,188,212,.6);box-shadow:0 0 20px rgba(0,188,212,.6);background:-webkit-linear-gradient(45deg,#33e5ff,#7f95ff);background:-moz-linear-gradient(45deg,#33e5ff,#7f95ff);background:-o-linear-gradient(45deg,#33e5ff,#7f95ff);background:linear-gradient(45deg,#33e5ff,#7f95ff)}.buyButton:disabled{background:#444;cursor:not-allowed;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;-webkit-transform:none;-moz-transform:none;-ms-transform:none;-o-transform:none;transform:none}.availability{color:#4caf50;font-weight:500}.feedbackText{color:#ff9800;font-size:.9rem}.loadingContainer,.errorContainer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;min-height:80vh;text-align:center}.errorTitle{font-size:2rem;color:#ff5722}.errorText{color:#aaa;margin-bottom:20px}.spinner{border:4px solid rgba(255,255,255,.1);border-top:4px solid var(--accent-color);-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;width:40px;height:40px;-webkit-animation:spin 1s linear infinite;-moz-animation:spin 1s linear infinite;-o-animation:spin 1s linear infinite;animation:spin 1s linear infinite;margin-bottom:20px}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}.backButton{background-color:#444;color:#fff;padding:10px 20px;border:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;-webkit-transition:background-color.3s ease;-moz-transition:background-color.3s ease;-o-transition:background-color.3s ease;transition:background-color.3s ease}.backButton:hover{background-color:#555}@media(max-width:600px){.coverImageContainer{height:250px}.detailCard{padding:20px;margin-top:-50px}.detailTitle{font-size:2rem}.tagline{font-size:1rem}.buyButton{font-size:1rem;padding:12px 20px}.infoGrid{gap:15px}.infoBox{padding:15px}.priceHighlight{font-size:1.1rem}}"})]}):(0,c.jsxs)("div",{className:"errorContainer",children:[c.jsx("h1",{className:"errorTitle",children:"404 | Evento N\xe3o Encontrado"}),(0,c.jsxs)("p",{className:"errorText",children:['O ID do evento "',e,'" n\xe3o foi localizado.']}),c.jsx("button",{onClick:()=>window.location.href="/",className:"backButton",children:"Voltar para Home"})]})}let v=(0,n.l)(t,"default"),w=(0,n.l)(t,"getStaticProps"),k=(0,n.l)(t,"getStaticPaths"),j=(0,n.l)(t,"getServerSideProps"),y=(0,n.l)(t,"config"),z=(0,n.l)(t,"reportWebVitals"),P=(0,n.l)(t,"unstable_getStaticProps"),N=(0,n.l)(t,"unstable_getStaticPaths"),S=(0,n.l)(t,"unstable_getStaticParams"),C=(0,n.l)(t,"unstable_getServerProps"),E=(0,n.l)(t,"unstable_getServerSideProps"),A=new r.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/eventos/[id]",pathname:"/eventos/[id]",bundlePath:"",filename:""},components:{App:d.default,Document:l()},userland:t})},71:(e,a,o)=>{"use strict";o.r(a),o.d(a,{default:()=>l});var t=o(997);let r=require("next/head");var i=o.n(r),n=o(6689);let s=()=>{let[e,a]=(0,n.useState)(!1),[o,r]=(0,n.useState)(!1);(0,n.useEffect)(()=>{let e=()=>{window.scrollY>50?a(!0):a(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let i=()=>{r(!o)};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("nav",{className:`navbar ${e?"scrolled":""}`,children:[(0,t.jsxs)("div",{className:"nav-container",children:[t.jsx("div",{className:"logo-container",children:(0,t.jsxs)("a",{href:"/",className:"logo-link",children:[t.jsx("span",{className:"logo-icon",children:"\uD83C\uDFAB"}),t.jsx("span",{className:"logo-text",children:"Premier Pass"})]})}),(0,t.jsxs)("div",{className:"desktop-menu",children:[t.jsx("a",{href:"/",className:"nav-link",children:"Home"}),t.jsx("a",{href:"#eventos",className:"nav-link",children:"Eventos"}),t.jsx("a",{href:"#sobre",className:"nav-link",children:"Sobre"}),t.jsx("a",{href:"#contato",className:"nav-link",children:"Contato"}),t.jsx("button",{className:"cta-button",children:"Entrar"})]}),t.jsx("div",{className:"mobile-toggle",onClick:i,children:(0,t.jsxs)("div",{className:`hamburger ${o?"open":""}`,children:[t.jsx("span",{}),t.jsx("span",{}),t.jsx("span",{})]})})]}),(0,t.jsxs)("div",{className:`mobile-menu ${o?"active":""}`,children:[t.jsx("a",{href:"/",onClick:i,children:"Home"}),t.jsx("a",{href:"#eventos",onClick:i,children:"Eventos"}),t.jsx("a",{href:"#sobre",onClick:i,children:"Sobre"}),t.jsx("a",{href:"#contato",onClick:i,children:"Contato"}),t.jsx("button",{className:"mobile-cta",children:"Acessar Conta"})]})]}),t.jsx("style",{children:`
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
            `})]})};o(6764);let l=function({Component:e,pageProps:a}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(i(),{children:[t.jsx("title",{children:"Ingresso Online - Luxo 2025"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),t.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",rel:"stylesheet"}),t.jsx("link",{rel:"icon",href:"/favicon.ico"})]}),t.jsx(s,{}),t.jsx(e,{...a})]})}},6764:()=>{},5244:(e,a)=>{"use strict";var o;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return o}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(o||(o={}))},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},9816:e=>{"use strict";e.exports=require("styled-jsx/style")},1017:e=>{"use strict";e.exports=require("path")}};var a=require("../../webpack-runtime.js");a.C(e);var o=e=>a(a.s=e),t=a.X(0,[777],()=>o(9789));module.exports=t})();