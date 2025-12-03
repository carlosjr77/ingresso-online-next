(()=>{var e={};e.id=696,e.ids=[696,888,660],e.modules={1323:(e,a)=>{"use strict";Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,t){return t in a?a[t]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,t)):"function"==typeof a&&"default"===t?a:void 0}}})},3967:(e,a,t)=>{"use strict";t.a(e,async(e,o)=>{try{t.r(a),t.d(a,{config:()=>f,default:()=>p,getServerSideProps:()=>u,getStaticPaths:()=>x,getStaticProps:()=>b,reportWebVitals:()=>g,routeModule:()=>j,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>v,unstable_getStaticParams:()=>k,unstable_getStaticPaths:()=>w,unstable_getStaticProps:()=>h});var r=t(7093),n=t(5244),i=t(1323),s=t(1777),l=t.n(s),d=t(71),c=t(3043),m=e([c]);c=(m.then?(await m)():m)[0];let p=(0,i.l)(c,"default"),b=(0,i.l)(c,"getStaticProps"),x=(0,i.l)(c,"getStaticPaths"),u=(0,i.l)(c,"getServerSideProps"),f=(0,i.l)(c,"config"),g=(0,i.l)(c,"reportWebVitals"),h=(0,i.l)(c,"unstable_getStaticProps"),w=(0,i.l)(c,"unstable_getStaticPaths"),k=(0,i.l)(c,"unstable_getStaticParams"),y=(0,i.l)(c,"unstable_getServerProps"),v=(0,i.l)(c,"unstable_getServerSideProps"),j=new r.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/checkout/[id]",pathname:"/checkout/[id]",bundlePath:"",filename:""},components:{App:d.default,Document:l()},userland:c});o()}catch(e){o(e)}})},71:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>l});var o=t(997);let r=require("next/head");var n=t.n(r),i=t(6689);let s=()=>{let[e,a]=(0,i.useState)(!1),[t,r]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=()=>{window.scrollY>50?a(!0):a(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let n=()=>{r(!t)};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("nav",{className:`navbar ${e?"scrolled":""}`,children:[(0,o.jsxs)("div",{className:"nav-container",children:[o.jsx("div",{className:"logo-container",children:(0,o.jsxs)("a",{href:"/",className:"logo-link",children:[o.jsx("span",{className:"logo-icon",children:"\uD83C\uDFAB"}),o.jsx("span",{className:"logo-text",children:"Premier Pass"})]})}),(0,o.jsxs)("div",{className:"desktop-menu",children:[o.jsx("a",{href:"/",className:"nav-link",children:"Home"}),o.jsx("a",{href:"#eventos",className:"nav-link",children:"Eventos"}),o.jsx("a",{href:"#sobre",className:"nav-link",children:"Sobre"}),o.jsx("a",{href:"#contato",className:"nav-link",children:"Contato"}),o.jsx("button",{className:"cta-button",children:"Entrar"})]}),o.jsx("div",{className:"mobile-toggle",onClick:n,children:(0,o.jsxs)("div",{className:`hamburger ${t?"open":""}`,children:[o.jsx("span",{}),o.jsx("span",{}),o.jsx("span",{})]})})]}),(0,o.jsxs)("div",{className:`mobile-menu ${t?"active":""}`,children:[o.jsx("a",{href:"/",onClick:n,children:"Home"}),o.jsx("a",{href:"#eventos",onClick:n,children:"Eventos"}),o.jsx("a",{href:"#sobre",onClick:n,children:"Sobre"}),o.jsx("a",{href:"#contato",onClick:n,children:"Contato"}),o.jsx("button",{className:"mobile-cta",children:"Acessar Conta"})]})]}),o.jsx("style",{children:`
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
            `})]})};t(6764);let l=function({Component:e,pageProps:a}){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n(),{children:[o.jsx("title",{children:"Ingresso Online - Luxo 2025"}),o.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),o.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",rel:"stylesheet"}),o.jsx("link",{rel:"icon",href:"/favicon.ico"})]}),o.jsx(s,{}),o.jsx(e,{...a})]})}},3043:(e,a,t)=>{"use strict";t.a(e,async(e,o)=>{try{t.r(a),t.d(a,{default:()=>x});var r=t(997),n=t(9816),i=t.n(n),s=t(6689),l=t(3745),d=t(401),c=t(1492),m=e([l,d,c]);[l,d,c]=m.then?(await m)():m;let u="undefined"!=typeof __app_id?__app_id:"default-app-id",f="undefined"!=typeof __firebase_config?JSON.parse(__firebase_config):{},g="undefined"!=typeof __initial_auth_token?__initial_auth_token:null,h=(0,l.initializeApp)(f),w=(0,c.getFirestore)(h),k=(0,d.getAuth)(h),y=null;async function p(e){try{y=g?(await (0,d.signInWithCustomToken)(k,g)).user.uid:(await (0,d.signInAnonymously)(k)).user.uid,e(!0),console.log("Firebase: Autentica\xe7\xe3o conclu\xedda. User ID:",y)}catch(a){console.error("Firebase Auth Error:",a),e(!0)}}async function b(e){if(!y)return console.error("Firestore Error: User ID not available for saving order."),null;let a=(0,c.collection)(w,`artifacts/${u}/users/${y}/orders`),t={...e,timestamp:(0,c.serverTimestamp)(),status:"PENDING_FULFILLMENT"};try{return(await (0,c.addDoc)(a,t)).id}catch(e){return console.error("Error saving order intention:",e),null}}let v=[{id:"show-banda-a",name:"Show de Lan\xe7amento - Banda A",date:"15/12/2025",location:"Arena Principal",price:120,symplaUrl:"https://www.sympla.com.br/evento/show-banda-a/simulacao"},{id:"congresso-tech-2026",name:"Congresso de Tecnologia 2026",date:"20/01/2026",location:"Centro de Conven\xe7\xf5es",price:450,symplaUrl:"https://www.sympla.com.br/evento/congresso-tech/simulacao"},{id:"festival-cinema",name:"Festival de Cinema Independente",date:"05/03/2026",location:"Cine Arte",price:50,symplaUrl:"https://www.sympla.com.br/evento/festival-cinema/simulacao"},{id:"expo-automovel",name:"Expo Autom\xf3vel Luxo",date:"10/04/2026",location:"Pavilh\xe3o Metropolitano",price:280,symplaUrl:"https://www.sympla.com.br/evento/expo-automovel/simulacao"},{id:"show-pericles-natanzinho",name:"P\xe9ricles e Natanzinho Lima - Folk Valley",date:"20/12/2025",location:"Arena Folk Valley",price:180,symplaUrl:"https://www.sympla.com.br/evento/folk-valley-apresenta-pericles-e-natanzinho-lima/3207294"},{id:"reveillon-sunset-gigoia",name:"R\xe9veillon Sunset Gig\xf3ia - RIO",date:"31/12/2025",location:"Ilha da Gig\xf3ia, Barra da Tijuca",price:600,symplaUrl:"https://www.sympla.com.br/evento/reveillon-sunset-gigoia"},{id:"reveillon-celebrare-2026",name:"R\xe9veillon Celebrare 2026 - RIO",date:"31/12/2025",location:"Clube Monte L\xedbano, Lagoa",price:750,symplaUrl:"https://www.sympla.com.br/evento/reveillon-celebrare-2026"},{id:"love-sessions-2025",name:"Love Sessions Festival 2025",date:"20/12/2025",location:"Riocentro, Rio de Janeiro",price:150,symplaUrl:"https://www.sympla.com.br/evento/love-sessions-festival-2025-rio-de-janeiro/1234567"}],j=()=>null;function x(){let e=j(),[a,t]=(0,s.useState)(null),[o,n]=(0,s.useState)(!0),[l,d]=(0,s.useState)(!1),[c,m]=(0,s.useState)(!1),[x,u]=(0,s.useState)({name:"",email:"",cpf:"",phone:"",ticketQuantity:1});(0,s.useEffect)(()=>{if(p(m),!e){n(!1);return}let a=v.find(a=>a.id===e);a&&t(a),n(!1)},[e]);let f=(a?a.price:0)*1.05,g=f*x.ticketQuantity,h=e=>{let a=e.target.value;"ticketQuantity"===e.target.name&&(a=parseInt(a)),u({...x,[e.target.name]:a})},w=async e=>{if(e.preventDefault(),c&&!l){d(!0);try{let e={eventId:a.id,eventName:a.name,customer:{name:x.name,email:x.email,cpf:x.cpf,phone:x.phone},quantity:x.ticketQuantity,totalPaid:parseFloat(g.toFixed(2)),originalPrice:a.price,profitMargin:parseFloat((g-a.price*x.ticketQuantity).toFixed(2)),symplaUrl:a.symplaUrl,premierPrice:parseFloat(f.toFixed(2))},t=await b(e);if(t)console.log(`Sucesso! Pedido salvo no Firebase. ID: ${t}`),a.symplaUrl&&window.open(a.symplaUrl,"_blank"),setTimeout(()=>{window.location.href="/"},2e3);else throw Error("Falha ao salvar o pedido no banco de dados.")}catch(a){console.error("Erro no checkout:",a);let e=document.getElementById("buyFeedback");e&&(e.innerText="Erro ao processar o pedido. Tente novamente ou verifique sua conex\xe3o.")}finally{setTimeout(()=>d(!1),2e3)}}};return o||!c?(0,r.jsxs)("div",{className:"loadingContainer",children:[r.jsx("div",{className:"spinner"}),r.jsx("p",{className:"loadingText",children:"Preparando o checkout..."})]}):a?(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be detailsContainer",children:[(0,r.jsxs)("div",{style:{maxWidth:"600px",margin:"40px auto"},className:"jsx-52dd19f1016701be detailCard",children:[r.jsx("h1",{style:{fontSize:"2rem"},className:"jsx-52dd19f1016701be detailTitle",children:"Checkout Premier Pass"}),(0,r.jsxs)("p",{className:"jsx-52dd19f1016701be tagline",children:["Finalizando compra para: ",r.jsx("strong",{className:"jsx-52dd19f1016701be",children:a.name})]}),(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be summaryBox",children:[(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be summaryItem",children:[r.jsx("span",{className:"jsx-52dd19f1016701be",children:"Valor Unit\xe1rio (Premier):"}),(0,r.jsxs)("span",{className:"jsx-52dd19f1016701be",children:["R$ ",f.toFixed(2)]})]}),(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be summaryItem",children:[r.jsx("span",{className:"jsx-52dd19f1016701be",children:"Quantidade:"}),(0,r.jsxs)("span",{className:"jsx-52dd19f1016701be",children:["x ",x.ticketQuantity]})]}),(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be summaryTotal",children:[r.jsx("span",{className:"jsx-52dd19f1016701be",children:"Total a Pagar:"}),(0,r.jsxs)("span",{className:"jsx-52dd19f1016701be",children:["R$ ",g.toFixed(2)]})]})]}),(0,r.jsxs)("form",{onSubmit:w,style:{display:"flex",flexDirection:"column",gap:"15px"},className:"jsx-52dd19f1016701be",children:[(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be formGroup",children:[r.jsx("label",{className:"jsx-52dd19f1016701be formLabel",children:"Nome Completo"}),r.jsx("input",{type:"text",name:"name",required:!0,value:x.name,onChange:h,className:"jsx-52dd19f1016701be formInput"})]}),(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be formGroup",children:[r.jsx("label",{className:"jsx-52dd19f1016701be formLabel",children:"E-mail (Para envio do ingresso)"}),r.jsx("input",{type:"email",name:"email",required:!0,value:x.email,onChange:h,className:"jsx-52dd19f1016701be formInput"})]}),(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be formGroup grid2",children:[(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be innerGroup",children:[r.jsx("label",{className:"jsx-52dd19f1016701be formLabel",children:"CPF"}),r.jsx("input",{type:"text",name:"cpf",required:!0,placeholder:"000.000.000-00",value:x.cpf,onChange:h,className:"jsx-52dd19f1016701be formInput"})]}),(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be innerGroup",children:[r.jsx("label",{className:"jsx-52dd19f1016701be formLabel",children:"Telefone"}),r.jsx("input",{type:"text",name:"phone",required:!0,placeholder:"(XX) 99999-9999",value:x.phone,onChange:h,className:"jsx-52dd19f1016701be formInput"})]})]}),(0,r.jsxs)("div",{className:"jsx-52dd19f1016701be formGroup",children:[r.jsx("label",{className:"jsx-52dd19f1016701be formLabel",children:"Quantidade de Ingressos"}),r.jsx("select",{name:"ticketQuantity",value:x.ticketQuantity,onChange:h,className:"jsx-52dd19f1016701be formSelect",children:[1,2,3,4,5,6].map(e=>r.jsx("option",{value:e,className:"jsx-52dd19f1016701be",children:e},e))})]}),r.jsx("p",{id:"buyFeedback",style:{textAlign:"center"},className:"jsx-52dd19f1016701be feedbackText"}),r.jsx("button",{type:"submit",disabled:l||!c,className:"jsx-52dd19f1016701be buyButton fullWidth",children:l?"Salvando Pedido...":"Confirmar e Pagar (Redireciona Sympla)"})]}),r.jsx("p",{style:{textAlign:"center",marginTop:"15px",fontSize:"0.8rem",color:"#666"},className:"jsx-52dd19f1016701be",children:"\uD83D\uDD12 Seus dados ser\xe3o salvos para garantir a entrega premium do seu ingresso."})]}),r.jsx(i(),{id:"52dd19f1016701be",children:":root{--accent-color:#00bcd4;--text-color:#e0e0e0;--bg-color:#121212;--card-bg:#1f1f1f;--border-color:#333}.detailsContainer{min-height:100vh;background-color:var(--bg-color);color:var(--text-color);padding:20px 1rem 4rem 1rem;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center}.detailCard{background-color:var(--card-bg);border:1px solid var(--border-color);-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px;padding:40px;-webkit-box-shadow:0 10px 30px rgba(0,0,0,.5);-moz-box-shadow:0 10px 30px rgba(0,0,0,.5);box-shadow:0 10px 30px rgba(0,0,0,.5)}.detailTitle{font-size:2.8rem;font-weight:800;margin-bottom:10px;background:-webkit-linear-gradient(left,#00bcd4,#5c6bc0);background:-moz-linear-gradient(left,#00bcd4,#5c6bc0);background:-o-linear-gradient(left,#00bcd4,#5c6bc0);background:linear-gradient(90deg,#00bcd4,#5c6bc0);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.tagline{font-size:1rem;color:#aaa;margin-bottom:30px;border-bottom:1px solid#282828;padding-bottom:15px}.summaryBox{background:#2a2a2a;padding:20px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;margin-bottom:25px;border:1px solid#444}.summaryItem{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:8px;color:#ccc}.summaryTotal{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-top:15px;padding-top:15px;border-top:1px solid#555;font-size:1.3rem;font-weight:bold;color:#4CAF50}.formGroup{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;gap:15px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:0}.formLabel{display:block;margin-bottom:5px;color:#aaa;font-size:.9rem}.formInput,.formSelect{width:100%;padding:12px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;border:1px solid#444;background:#1a1a1a;color:#fff;-webkit-box-shadow:inset 0 1px 3px rgba(0,0,0,.3);-moz-box-shadow:inset 0 1px 3px rgba(0,0,0,.3);box-shadow:inset 0 1px 3px rgba(0,0,0,.3)}.formSelect{-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23aaa' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.939l-4.243-4.242L4.343 8z'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 15px center;-webkit-background-size:1em;-moz-background-size:1em;-o-background-size:1em;background-size:1em}.fullWidth{width:100%;margin-top:20px}.buyButton{padding:15px 30px;font-size:1.2rem;font-weight:700;color:#fff;background:-webkit-linear-gradient(45deg,#00bcd4,#5c6bc0);background:-moz-linear-gradient(45deg,#00bcd4,#5c6bc0);background:-o-linear-gradient(45deg,#00bcd4,#5c6bc0);background:linear-gradient(45deg,#00bcd4,#5c6bc0);border:none;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;cursor:pointer;-webkit-transition:-webkit-transform.2s ease,box-shadow.4s ease;-moz-transition:-moz-transform.2s ease,box-shadow.4s ease;-o-transition:-o-transform.2s ease,box-shadow.4s ease;transition:-webkit-transform.2s ease,box-shadow.4s ease;transition:-moz-transform.2s ease,box-shadow.4s ease;transition:-o-transform.2s ease,box-shadow.4s ease;transition:transform.2s ease,box-shadow.4s ease;-webkit-box-shadow:0 0 10px rgba(0,188,212,.4);-moz-box-shadow:0 0 10px rgba(0,188,212,.4);box-shadow:0 0 10px rgba(0,188,212,.4)}.buyButton:hover{-webkit-transform:translatey(-3px);-moz-transform:translatey(-3px);-ms-transform:translatey(-3px);-o-transform:translatey(-3px);transform:translatey(-3px);-webkit-box-shadow:0 0 20px rgba(0,188,212,.6);-moz-box-shadow:0 0 20px rgba(0,188,212,.6);box-shadow:0 0 20px rgba(0,188,212,.6);background:-webkit-linear-gradient(45deg,#33e5ff,#7f95ff);background:-moz-linear-gradient(45deg,#33e5ff,#7f95ff);background:-o-linear-gradient(45deg,#33e5ff,#7f95ff);background:linear-gradient(45deg,#33e5ff,#7f95ff)}.buyButton:disabled{background:#444;cursor:not-allowed;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;-webkit-transform:none;-moz-transform:none;-ms-transform:none;-o-transform:none;transform:none}.feedbackText{color:#ff9800}.loadingContainer,.errorContainer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;min-height:80vh;text-align:center}.loadingText{color:#aaa;margin-top:15px}.spinner{border:4px solid rgba(255,255,255,.1);border-top:4px solid var(--accent-color);-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;width:40px;height:40px;-webkit-animation:spin 1s linear infinite;-moz-animation:spin 1s linear infinite;-o-animation:spin 1s linear infinite;animation:spin 1s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@media(max-width:600px){.detailCard{padding:20px}.grid2{grid-template-columns:1fr}.buyButton{font-size:1rem;padding:12px 20px}}"})]}):r.jsx("div",{className:"errorContainer",children:r.jsx("h1",{className:"errorTitle",children:"Evento n\xe3o encontrado"})})}o()}catch(e){o(e)}})},6764:()=>{},5244:(e,a)=>{"use strict";var t;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},9816:e=>{"use strict";e.exports=require("styled-jsx/style")},3745:e=>{"use strict";e.exports=import("firebase/app")},401:e=>{"use strict";e.exports=import("firebase/auth")},1492:e=>{"use strict";e.exports=import("firebase/firestore")},1017:e=>{"use strict";e.exports=require("path")}};var a=require("../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),o=a.X(0,[777],()=>t(3967));module.exports=o})();