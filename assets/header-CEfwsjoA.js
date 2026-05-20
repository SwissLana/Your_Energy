import{a as u,i as f}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const $="https://your-energy.b.goit.study/api",D={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},g="your-energy-favorites",v="your-energy-quote",j=10,J=12;u.defaults.baseURL=$;async function K(e,t,s){return(await u.get("/filters",{params:{filter:e,page:t,limit:s}})).data}async function Y(e){return(await u.get("/exercises",{params:e})).data}async function w(e){return(await u.get(`/exercises/${e}`)).data}async function q(){return(await u.get("/quote")).data}async function M(e){return(await u.post("/subscription",{email:e})).data}function C({name:e,filter:t,imgURL:s}){return`
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
  `}function z(e){return e.map(C).join("")}function y(e){const{_id:t,name:s,rating:o,burnedCalories:a,bodyPart:n,target:i}=e,L=Number(o).toFixed(1);return`
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
        <li class="info-item">Target: <span class="info-value">${i}</span></li>
      </ul>
    </li>
  `}function H(e){return e.map(y).join("")}function k(e){return`
    ${y(e).replace("</li>",`
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${e._id}"
          aria-label="Remove exercise from favorites"
        >
          🗑
        </button>
      </li>`)}
  `}function G(e){return e.map(k).join("")}function p(){return JSON.parse(localStorage.getItem(g))||[]}function b(e){localStorage.setItem(g,JSON.stringify(e))}function F(e){const t=p();t.some(s=>s===e)||(t.push(e),b(t))}function R(e){const t=p().filter(s=>s!==e);b(t)}function O(e){return p().some(t=>t===e)}function T(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem(v,JSON.stringify({date:t,quote:e}))}function I(){const e=JSON.parse(localStorage.getItem(v));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}const c=document.querySelector("[data-modal-root]");let d=null,l=!1,r=null;function V(){document.addEventListener("click",P)}async function P(e){const t=e.target.closest("[data-exercise-start]");if(t)try{d=await w(t.dataset.id),B(d)}catch{f.error({message:"Failed to load exercise details.",position:"topRight"})}}function B(e){c&&(c.innerHTML=_(e),document.body.classList.add("no-scroll"),document.addEventListener("keydown",S),c.addEventListener("click",h),r=c.querySelector("[data-favorite-toggle]"),r&&r.addEventListener("click",E))}function _(e){l=O(e._id);const t=U(e.rating),s=l?"Remove from favorites":"Add to favorites",o=l?"icon-trash":"icon-heart";return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="exercise-modal" role="dialog" aria-modal="true">
        <button
          class="modal-close-btn"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          ×
        </button>
        <div class="modal-content">
          <div class="exercise-modal-media">
            ${e.gifUrl?`<img src="${e.gifUrl}" alt="${e.name}" loading="lazy" />`:"<p>Video is not available.</p>"}
          </div>
          <div class="exercise-description">
            <div class="exercise-heading">
              <h2 class="exercise-modal-title">${e.name}</h2>
              <div class="exercise-rating-container">
                <span class="rating-value">${e.rating?Math.round(e.rating).toFixed(1):"0.0"}</span>
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
                <use href="#${o}"></use>
              </svg>
            </button>           
          </div>          
        </div>           
      </div>
    </div>
  `}function U(e){const s=Math.round(e||0);let o="";for(let a=1;a<=5;a++){const i=a<=s?"star-icon filled":"star-icon empty";o+=`
      <svg class="${i}" width="18" height="18">
        <use href="#icon-star"></use>
      </svg>
    `}return o}function h(e){(e.target.matches("[data-modal-backdrop]")||e.target.closest("[data-modal-close]"))&&x()}function E(){if(!r||!d)return;const e=r.querySelector("span"),t=r.querySelector("use");l?(R(d._id),l=!1,e.textContent="Add to favorites",t.setAttribute("href","#icon-heart")):(F(d._id),l=!0,e.textContent="Remove from favorites",t.setAttribute("href","#icon-trash"))}function S(e){e.key==="Escape"&&x()}function x(){c&&(r&&(r.removeEventListener("click",E),r=null),c.innerHTML="",d=null,l=!1,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",S),c.removeEventListener("click",h))}function A(e){const t=document.querySelector(e),s=document.getElementById("quote-card-template");!t||!s||t.appendChild(s.content.cloneNode(!0))}async function W(){A("[data-quote-card-root]");const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const s=I();if(s){m(s,e,t);return}try{const o=await q();T(o),m(o,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function m(e,t,s){t.textContent=e.quote,s.textContent=e.author}function X(){const e=document.querySelector("[data-subscription-form]");e&&e.addEventListener("submit",N)}async function N(e){var o,a;e.preventDefault();const t=e.currentTarget,s=t.elements.email.value.trim();try{await M(s),f.success({message:"Subscription successful!",position:"topRight"}),t.reset()}catch(n){f.error({message:((a=(o=n.response)==null?void 0:o.data)==null?void 0:a.message)||"Subscription failed.",position:"topRight"})}}function Z(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>400)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function ee(){const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),s=document.querySelector("[data-mobile-menu]");!e||!t||!s||(e.addEventListener("click",()=>{s.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{s.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),s.addEventListener("click",o=>{o.target.matches("a")&&(s.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{j as E,J as F,W as a,X as b,Z as c,V as d,z as e,K as f,D as g,Y as h,ee as i,H as j,p as k,G as l,R as r};
//# sourceMappingURL=header-CEfwsjoA.js.map
