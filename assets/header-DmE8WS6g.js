import{a as u,i as p}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const w="https://your-energy.b.goit.study/api",j={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},v="your-energy-favorites",y="your-energy-quote",z=10,G=12;u.defaults.baseURL=w;async function J(e,t,s){return(await u.get("/filters",{params:{filter:e,page:t,limit:s}})).data}async function K(e){return(await u.get("/exercises",{params:e})).data}async function k(e){return(await u.get(`/exercises/${e}`)).data}async function q(){return(await u.get("/quote")).data}async function M(e){return(await u.post("/subscription",{email:e})).data}function C({name:e,filter:t,imgURL:s}){return`
    <li class="category-card" data-name="${e}" data-filter="${t}">
      <button class="category-card-btn" type="button">
        <img
          class="category-card-img"
          src="${s}"
          alt="${e}"
          loading="lazy"
        />
        <div class="category-card-overlay">
          <h3 class="category-card-title">${e}</h3>
          <p class="category-card-text">${t}</p>
        </div>
      </button>
    </li>
  `}function H(e){return e.map(C).join("")}function h(e){const{_id:t,name:s,rating:o,burnedCalories:a,bodyPart:n,target:r}=e,L=Number(o).toFixed(1);return`
    <li class="exercise-card" data-id="${t}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          <span class="exercise-card-rating">
            <span class="rating-value">${L}</span>
            <svg class="star-icon" width="14" height="14">
              <use href="./img/sprite.svg#icon-card-rating-star"></use>
            </svg>
          </span>
        </div>

        <button
          class="exercise-start-btn"
          type="button"
          data-exercise-start
          data-id="${t}"
          aria-label="Open exercise details"
        >
          Start
          <svg class="arrow-icon" width="16" height="16">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="24" height="24">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${s}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item">Burned calories: <span class="info-value">${a} / 3 min</span></li>
        <li class="info-item">Body part: <span class="info-value">${n}</span></li>
        <li class="info-item">Target: <span class="info-value">${r}</span></li>
      </ul>
    </li>
  `}function V(e){return e.map(h).join("")}function F(e){return`
    ${h(e).replace("</li>",`
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${e._id}"
          aria-label="Remove exercise from favorites"
        >
          🗑
        </button>
      </li>`)}
  `}function W(e){return e.map(F).join("")}const f="/Your_Energy/assets/sprite-EbCy_zpL.svg";function m(){return JSON.parse(localStorage.getItem(v))||[]}function b(e){localStorage.setItem(v,JSON.stringify(e))}function R(e){const t=m();t.some(s=>s===e)||(t.push(e),b(t))}function O(e){const t=m().filter(s=>s!==e);b(t)}function T(e){return m().some(t=>t===e)}function I(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem(y,JSON.stringify({date:t,quote:e}))}function P(){const e=JSON.parse(localStorage.getItem(y));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}const c=document.querySelector("[data-modal-root]");let d=null,l=!1,i=null;function X(){document.addEventListener("click",_)}async function _(e){const t=e.target.closest("[data-exercise-start]");if(t)try{d=await k(t.dataset.id),N(d)}catch(s){console.error("Failed to load exercise:",s),p.error({message:"Failed to load exercise details.",position:"topRight"})}}function N(e){c&&(c.innerHTML=B(e),document.body.classList.add("no-scroll"),document.addEventListener("keydown",x),c.addEventListener("click",E),i=c.querySelector("[data-favorite-toggle]"),i&&i.addEventListener("click",S))}function B(e){l=T(e._id);const t=A(e.rating),s=l?"Remove from favorites":"Add to favorites",o=l?"icon-trash":"icon-heart";return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="exercise-modal" role="dialog" aria-modal="true">
        <button
          class="modal-close-btn"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          <svg class="modal-close-icon" aria-hidden="true">
            <use href="${f}#icon-x"></use>
          </svg>
        </button>
        <div class="modal-content">
          <div class="exercise-modal-media">
            ${e.gifUrl?`<img src="${e.gifUrl}" alt="${e.name}" loading="lazy" />`:"<p>Video is not available.</p>"}
          </div>
          <div class="exercise-description">
            <div class="exercise-heading">
              <h2 class="exercise-modal-title">${e.name}</h2>
              <div class="exercise-rating-container">
                <span class="rating-value">${e.rating?Number(e.rating).toFixed(1):"0.0"}</span>
                <div class="rating-stars">
                  ${t}
                </div>
              </div>
            </div>
            <ul class="exercise-modal-info">
              <li class="info-item">
                <p class="info-label">Target</p>
                <span class="info-value">${e.target}</span>
              </li>

              <li class="info-item">
                <p class="info-label">Body Part</p>
                <span class="info-value">${e.bodyPart}</span>
              </li>
              
              <li class="info-item">
                <p class="info-label">Equipment</p>
                <span class="info-value">${e.equipment}</span>
              </li>
              
              <li class="info-item">
                <p class="info-label">Popular</p>
                <span class="info-value">${e.popularity}</span>
              </li>

              <li class="info-item">
                <p class="info-label">Burned Calories</p>
                <span class="info-value">${e.burnedCalories} / ${e.time} min</span></li>
            </ul>

            <p class="exercise-modal-description">
              ${e.description||"Description is not available."}
            </p>

            <button
              class="favorite-modal-btn"
              type="button"
              data-favorite-toggle
            >
              <span>${s}</span>
              <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                <use href="${f}#${o}"></use>
              </svg>
            </button>           
          </div>          
        </div>           
      </div>
    </div>
  `}function A(e){const s=Number(e||0);let o="";const a=Math.round(s%1*100);o+=`
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${a}%" stop-color="#eea111" /> <stop offset="${a}%" stop-color="#e0e0e0" /> </linearGradient>
      </defs>
    </svg>
  `;for(let n=1;n<=5;n++){let r;n<=Math.floor(s)?r="rgb(238, 161, 12)":n===Math.ceil(s)&&s%1!==0?r="url(#partial-star-gradient)":r="rgba(244, 244, 244, 0.2)",o+=`
      <svg width="18" height="18" aria-hidden="true" style="fill: ${r};">
        <use href="${f}#icon-add-rating-star"></use>
      </svg>
    `}return o}function E(e){(e.target.matches("[data-modal-backdrop]")||e.target.closest("[data-modal-close]"))&&$()}function S(){if(!i||!d)return;const e=i.querySelector("span"),t=i.querySelector("use");l?(O(d._id),l=!1,e.textContent="Add to favorites",t.setAttribute("href",`${f}#icon-heart`)):(R(d._id),l=!0,e.textContent="Remove from favorites",t.setAttribute("href",`${f}#icon-trash`))}function x(e){e.key==="Escape"&&$()}function $(){c&&(i&&(i.removeEventListener("click",S),i=null),c.innerHTML="",d=null,l=!1,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",x),c.removeEventListener("click",E))}function U(e){const t=document.querySelector(e),s=document.getElementById("quote-card-template");!t||!s||t.appendChild(s.content.cloneNode(!0))}async function Z(){U("[data-quote-card-root]");const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const s=P();if(s){g(s,e,t);return}try{const o=await q();I(o),g(o,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function g(e,t,s){t.textContent=e.quote,s.textContent=e.author}function ee(){const e=document.querySelector("[data-subscription-form]");e&&e.addEventListener("submit",Q)}async function Q(e){var o,a;e.preventDefault();const t=e.currentTarget,s=t.elements.email.value.trim();try{await M(s),p.success({message:"Subscription successful!",position:"topRight"}),t.reset()}catch(n){p.error({message:((a=(o=n.response)==null?void 0:o.data)==null?void 0:a.message)||"Subscription failed.",position:"topRight"})}}function te(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>400)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function D(){const e=document.querySelectorAll(".header-nav-list .header-nav-link");if(!e.length)return;const t=o=>{const a=o.split("/").pop();return!a||a===""?"index.html":a},s=t(window.location.pathname);e.forEach(o=>{const a=o.querySelector("a");if(!a)return;const n=t(a.pathname);o.classList.toggle("active",n===s)})}function se(){D();const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),s=document.querySelector("[data-mobile-menu]");!e||!t||!s||(e.addEventListener("click",()=>{s.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{s.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),s.addEventListener("click",o=>{o.target.matches("a")&&(s.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{z as E,G as F,Z as a,ee as b,te as c,X as d,H as e,J as f,j as g,K as h,se as i,V as j,m as k,W as l,O as r};
//# sourceMappingURL=header-DmE8WS6g.js.map
