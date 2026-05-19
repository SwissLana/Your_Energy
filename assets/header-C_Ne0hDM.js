import{a as c,i as d}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const x="https://your-energy.b.goit.study/api",B={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},f="your-energy-favorites",m="your-energy-quote",U=10,A=12;c.defaults.baseURL=x;async function N(e,t,s){return(await c.get("/filters",{params:{filter:e,page:t,limit:s}})).data}async function Q(e){return(await c.get("/exercises",{params:e})).data}async function L(e){return(await c.get(`/exercises/${e}`)).data}async function $(){return(await c.get("/quote")).data}async function w(e){return(await c.post("/subscription",{email:e})).data}function M({name:e,filter:t,imgURL:s}){return`
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
  `}function D(e){return e.map(M).join("")}function g(e){const{_id:t,name:s,rating:n,burnedCalories:a,bodyPart:o,target:l}=e,S=Number(n).toFixed(1);return`
    <li class="exercise-card" data-id="${t}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          <span class="exercise-card-rating">
            <span class="rating-value">${S}</span>
            <svg class="star-icon" width="14" height="14">
              <use href="./img/icons.svg#icon-star"></use>
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
            <use href="./img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="24" height="24">
            <use href="./img/icons.svg#icon-run"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${s}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item">Burned calories: <span class="info-value">${a} / 3 min</span></li>
        <li class="info-item">Body part: <span class="info-value">${o}</span></li>
        <li class="info-item">Target: <span class="info-value">${l}</span></li>
      </ul>
    </li>
  `}function j(e){return e.map(g).join("")}function q(e){return`
    ${g(e).replace("</li>",`
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${e._id}"
          aria-label="Remove exercise from favorites"
        >
          🗑
        </button>
      </li>`)}
  `}function J(e){return e.map(q).join("")}function u(){return JSON.parse(localStorage.getItem(f))||[]}function v(e){localStorage.setItem(f,JSON.stringify(e))}function R(e){const t=u();t.some(s=>s._id===e._id)||(t.push(e),v(t))}function k(e){const t=u().filter(s=>s._id!==e);v(t)}function y(e){return u().some(t=>t._id===e)}function C(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem(m,JSON.stringify({date:t,quote:e}))}function O(){const e=JSON.parse(localStorage.getItem(m));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}const i=document.querySelector("[data-modal-root]");let r=null;function K(){document.addEventListener("click",T)}async function T(e){const t=e.target.closest("[data-exercise-start]");if(t)try{r=await L(t.dataset.id),_(r)}catch{d.error({message:"Failed to load exercise details.",position:"topRight"})}}function _(e){i&&(i.innerHTML=F(e),document.body.classList.add("no-scroll"),document.addEventListener("keydown",h),i.addEventListener("click",b))}function F(e){const t=y(e._id);return`
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

        <div class="exercise-modal-media">
          ${e.gifUrl?`<img src="${e.gifUrl}" alt="${e.name}" loading="lazy" />`:"<p>Video is not available.</p>"}
        </div>

        <div class="exercise-modal-content">
          <h2 class="exercise-modal-title">${e.name}</h2>

          <ul class="exercise-modal-info">
            <li>Rating: <span>${e.rating??"0.0"} ★</span></li>
            <li>Target: <span>${e.target}</span></li>
            <li>Body part: <span>${e.bodyPart}</span></li>
            <li>Equipment: <span>${e.equipment}</span></li>
            <li>Popularity: <span>${e.popularity}</span></li>
            <li>Burned calories: <span>${e.burnedCalories} / 3 min</span></li>
          </ul>

          <p class="exercise-modal-description">
            ${e.description||"Description is not available."}
          </p>

          <button
            class="favorite-modal-btn"
            type="button"
            data-favorite-toggle
          >
            ${t?"Remove from favorites":"Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  `}function b(e){if(e.target.matches("[data-modal-backdrop]")||e.target.matches("[data-modal-close]")){E();return}const t=e.target.closest("[data-favorite-toggle]");!t||!r||(y(r._id)?(k(r._id),t.textContent="Add to favorites"):(R(r),t.textContent="Remove from favorites"))}function h(e){e.key==="Escape"&&E()}function E(){i&&(i.innerHTML="",r=null,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",h),i.removeEventListener("click",b))}async function Y(){const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const s=O();if(s){p(s,e,t);return}try{const n=await $();C(n),p(n,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function p(e,t,s){t.textContent=e.quote,s.textContent=e.author}function z(){const e=document.querySelector("[data-subscription-form]");e&&e.addEventListener("submit",P)}async function P(e){var n,a;e.preventDefault();const t=e.currentTarget,s=t.elements.email.value.trim();try{await w(s),d.success({message:"Subscription successful!",position:"topRight"}),t.reset()}catch(o){d.error({message:((a=(n=o.response)==null?void 0:n.data)==null?void 0:a.message)||"Subscription failed.",position:"topRight"})}}function H(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>400)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function G(){const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),s=document.querySelector("[data-mobile-menu]");!e||!t||!s||(e.addEventListener("click",()=>{s.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{s.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),s.addEventListener("click",n=>{n.target.matches("a")&&(s.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{U as E,A as F,Y as a,z as b,H as c,K as d,D as e,N as f,B as g,Q as h,G as i,j,u as k,J as l,k as r};
//# sourceMappingURL=header-C_Ne0hDM.js.map
