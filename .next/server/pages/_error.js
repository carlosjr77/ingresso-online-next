(()=>{var e={};e.id=820,e.ids=[820,888,660],e.modules={1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},7909:(e,t,r)=>{"use strict";r.r(t),r.d(t,{config:()=>h,default:()=>c,getServerSideProps:()=>f,getStaticPaths:()=>p,getStaticProps:()=>u,reportWebVitals:()=>m,routeModule:()=>j,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>y,unstable_getStaticParams:()=>x,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>g});var n=r(7093),o=r(5244),i=r(1323),a=r(1777),s=r.n(a),l=r(71),d=r(8539);let c=(0,i.l)(d,"default"),u=(0,i.l)(d,"getStaticProps"),p=(0,i.l)(d,"getStaticPaths"),f=(0,i.l)(d,"getServerSideProps"),h=(0,i.l)(d,"config"),m=(0,i.l)(d,"reportWebVitals"),g=(0,i.l)(d,"unstable_getStaticProps"),b=(0,i.l)(d,"unstable_getStaticPaths"),x=(0,i.l)(d,"unstable_getStaticParams"),v=(0,i.l)(d,"unstable_getServerProps"),y=(0,i.l)(d,"unstable_getServerSideProps"),j=new n.PagesRouteModule({definition:{kind:o.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:l.default,Document:s()},userland:d})},8539:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return c}});let n=r(167),o=r(997),i=n._(r(6689)),a=n._(r(6665)),s={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function l(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let d={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class c extends i.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||s[e]||"An unexpected error has occurred";return(0,o.jsxs)("div",{style:d.error,children:[(0,o.jsx)(a.default,{children:(0,o.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,o.jsxs)("div",{style:d.desc,children:[(0,o.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,o.jsx)("h1",{className:"next-error-h1",style:d.h1,children:e}):null,(0,o.jsx)("div",{style:d.wrap,children:(0,o.jsxs)("h2",{style:d.h2,children:[this.props.title||e?r:(0,o.jsx)(o.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}c.displayName="ErrorPage",c.getInitialProps=l,c.origGetInitialProps=l,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2771:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},6665:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{defaultHead:function(){return u},default:function(){return m}});let n=r(167),o=r(8760),i=r(997),a=o._(r(6689)),s=n._(r(8747)),l=r(8039),d=r(1988),c=r(2771);function u(e){void 0===e&&(e=!1);let t=[(0,i.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,i.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(1558);let f=["name","httpEquiv","charSet","itemProp"];function h(e,t){let{inAmpMode:r}=t;return e.reduce(p,[]).reverse().concat(u(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return o=>{let i=!0,a=!1;if(o.key&&"number"!=typeof o.key&&o.key.indexOf("$")>0){a=!0;let t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?i=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?i=!1:t.add(o.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(o.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?i=!1:r.add(t);else{let e=o.props[t],r=n[t]||new Set;("name"!==t||!a)&&r.has(e)?i=!1:(r.add(e),n[t]=r)}}}}return i}}()).reverse().map((e,t)=>{let n=e.key||t;if(!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,a.default.cloneElement(e,t)}return a.default.cloneElement(e,{key:n})})}let m=function(e){let{children:t}=e,r=(0,a.useContext)(l.AmpStateContext),n=(0,a.useContext)(d.HeadManagerContext);return(0,i.jsx)(s.default,{reduceComponentsToState:h,headManager:n,inAmpMode:(0,c.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8747:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let n=r(6689),o=()=>{},i=()=>{};function a(e){var t;let{headManager:r,reduceComponentsToState:a}=e;function s(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(a(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),s(),o(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),o(()=>(r&&(r._pendingUpdate=s),()=>{r&&(r._pendingUpdate=s)})),i(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},1558:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},71:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(997);let o=require("next/head");var i=r.n(o),a=r(6689);let s=()=>{let[e,t]=(0,a.useState)(!1),[r,o]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=()=>{window.scrollY>50?t(!0):t(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let i=()=>{o(!r)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("nav",{className:`navbar ${e?"scrolled":""}`,children:[(0,n.jsxs)("div",{className:"nav-container",children:[n.jsx("div",{className:"logo-container",children:(0,n.jsxs)("a",{href:"/",className:"logo-link",children:[n.jsx("span",{className:"logo-icon",children:"\uD83C\uDFAB"}),n.jsx("span",{className:"logo-text",children:"Premier Pass"})]})}),(0,n.jsxs)("div",{className:"desktop-menu",children:[n.jsx("a",{href:"/",className:"nav-link",children:"Home"}),n.jsx("a",{href:"#eventos",className:"nav-link",children:"Eventos"}),n.jsx("a",{href:"#sobre",className:"nav-link",children:"Sobre"}),n.jsx("a",{href:"#contato",className:"nav-link",children:"Contato"}),n.jsx("button",{className:"cta-button",children:"Entrar"})]}),n.jsx("div",{className:"mobile-toggle",onClick:i,children:(0,n.jsxs)("div",{className:`hamburger ${r?"open":""}`,children:[n.jsx("span",{}),n.jsx("span",{}),n.jsx("span",{})]})})]}),(0,n.jsxs)("div",{className:`mobile-menu ${r?"active":""}`,children:[n.jsx("a",{href:"/",onClick:i,children:"Home"}),n.jsx("a",{href:"#eventos",onClick:i,children:"Eventos"}),n.jsx("a",{href:"#sobre",onClick:i,children:"Sobre"}),n.jsx("a",{href:"#contato",onClick:i,children:"Contato"}),n.jsx("button",{className:"mobile-cta",children:"Acessar Conta"})]})]}),n.jsx("style",{children:`
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
            `})]})};r(6764);let l=function({Component:e,pageProps:t}){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i(),{children:[n.jsx("title",{children:"Ingresso Online - Luxo 2025"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",rel:"stylesheet"}),n.jsx("link",{rel:"icon",href:"/favicon.ico"})]}),n.jsx(s,{}),n.jsx(e,{...t})]})}},6764:()=>{},5244:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},8039:(e,t,r)=>{"use strict";e.exports=r(7093).vendored.contexts.AmpContext},1988:(e,t,r)=>{"use strict";e.exports=r(7093).vendored.contexts.HeadManagerContext},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},1017:e=>{"use strict";e.exports=require("path")},8760:(e,t)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}t._=t._interop_require_wildcard=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var o={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(o,a,s):o[a]=e[a]}return o.default=e,n&&n.set(e,o),o}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[777],()=>r(7909));module.exports=n})();