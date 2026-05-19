import{a as c,i as d}from"./vendor-CaULtfQf.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();const h="https://your-energy.b.goit.study/api",I={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},f="your-energy-favorites",m="your-energy-quote",B=10,U=12;c.defaults.baseURL=h;async function A(t,e,o){return(await c.get("/filters",{params:{filter:t,page:e,limit:o}})).data}async function Q(t){return(await c.get("/exercises",{params:t})).data}async function L(t){return(await c.get(`/exercises/${t}`)).data}async function x(){return(await c.get("/quote")).data}async function $(t){return(await c.post("/subscription",{email:t})).data}function M({name:t,filter:e,imgURL:o}){return`
    <li class="category-card" data-name="${t}" data-filter="${e}">
      <button class="category-card-btn" type="button">
        <img
          class="category-card-img"
          src="${o}"
          alt="${t}"
          loading="lazy"
        />
        <div class="category-card-overlay">
          <h3 class="category-card-title">${t}</h3>
          <p class="category-card-text">${e}</p>
        </div>
      </button>
    </li>
  `}function N(t){return t.map(M).join("")}function g(t){const{_id:e,name:o,rating:r,burnedCalories:a,bodyPart:s,target:l}=t;return`
    <li class="exercise-card" data-id="${e}">
      <div class="exercise-card-top">
        <span class="exercise-card-badge">WORKOUT</span>
        <span class="exercise-card-rating">${r??"0.0"} ★</span>

        <button

          class="exercise-start-btn"
          type="button"
          data-exercise-start
          data-id="${e}"
          aria-label="Open exercise details"
        >
          Start →
        </button>
      </div>

      <h3 class="exercise-card-title">${o}</h3>

      <ul class="exercise-card-info">
        <li>Burned calories: <span>${a} / 3 min</span></li>
        <li>Body part: <span>${s}</span></li>
        <li>Target: <span>${l}</span></li>
      </ul>
    </li>
  `}function D(t){return t.map(g).join("")}function q(t){return`
    ${g(t).replace("</li>",`
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${t._id}"
          aria-label="Remove exercise from favorites"
        >
          🗑
        </button>
      </li>`)}
  `}function j(t){return t.map(q).join("")}function u(){return JSON.parse(localStorage.getItem(f))||[]}function y(t){localStorage.setItem(f,JSON.stringify(t))}function w(t){const e=u();e.some(o=>o._id===t._id)||(e.push(t),y(e))}function k(t){const e=u().filter(o=>o._id!==t);y(e)}function v(t){return u().some(e=>e._id===t)}function C(t){const e=new Date().toISOString().split("T")[0];localStorage.setItem(m,JSON.stringify({date:e,quote:t}))}function O(){const t=JSON.parse(localStorage.getItem(m));if(!t)return null;const e=new Date().toISOString().split("T")[0];return t.date===e?t.quote:null}const i=document.querySelector("[data-modal-root]");let n=null;function J(){document.addEventListener("click",R)}async function R(t){const e=t.target.closest("[data-exercise-start]");if(e)try{n=await L(e.dataset.id),T(n)}catch{d.error({message:"Failed to load exercise details.",position:"topRight"})}}function T(t){i&&(i.innerHTML=_(t),document.body.classList.add("no-scroll"),document.addEventListener("keydown",E),i.addEventListener("click",b))}function _(t){const e=v(t._id);return`
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
          ${t.gifUrl?`<img src="${t.gifUrl}" alt="${t.name}" loading="lazy" />`:"<p>Video is not available.</p>"}
        </div>

        <div class="exercise-modal-content">
          <h2 class="exercise-modal-title">${t.name}</h2>

          <ul class="exercise-modal-info">
            <li>Rating: <span>${t.rating??"0.0"} ★</span></li>
            <li>Target: <span>${t.target}</span></li>
            <li>Body part: <span>${t.bodyPart}</span></li>
            <li>Equipment: <span>${t.equipment}</span></li>
            <li>Popularity: <span>${t.popularity}</span></li>
            <li>Burned calories: <span>${t.burnedCalories} / 3 min</span></li>
          </ul>

          <p class="exercise-modal-description">
            ${t.description||"Description is not available."}
          </p>

          <button
            class="favorite-modal-btn"
            type="button"
            data-favorite-toggle
          >
            ${e?"Remove from favorites":"Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  `}function b(t){if(t.target.matches("[data-modal-backdrop]")||t.target.matches("[data-modal-close]")){S();return}const e=t.target.closest("[data-favorite-toggle]");!e||!n||(v(n._id)?(k(n._id),e.textContent="Add to favorites"):(w(n),e.textContent="Remove from favorites"))}function E(t){t.key==="Escape"&&S()}function S(){i&&(i.innerHTML="",n=null,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",E),i.removeEventListener("click",b))}async function K(){const t=document.querySelector("[data-quote-text]"),e=document.querySelector("[data-quote-author]");if(!t||!e)return;const o=O();if(o){p(o,t,e);return}try{const r=await x();C(r),p(r,t,e)}catch{t.textContent="Quote is not available now.",e.textContent=""}}function p(t,e,o){e.textContent=t.quote,o.textContent=t.author}function Y(){const t=document.querySelector("[data-subscription-form]");t&&t.addEventListener("submit",F)}async function F(t){var r,a;t.preventDefault();const e=t.currentTarget,o=e.elements.email.value.trim();try{await $(o),d.success({message:"Subscription successful!",position:"topRight"}),e.reset()}catch(s){d.error({message:((a=(r=s.response)==null?void 0:r.data)==null?void 0:a.message)||"Subscription failed.",position:"topRight"})}}function z(){const t=document.querySelector("[data-scroll-up]");t&&(window.addEventListener("scroll",()=>{t.classList.toggle("is-visible",window.scrollY>400)}),t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function H(){const t=document.querySelector("[data-menu-open]"),e=document.querySelector("[data-menu-close]"),o=document.querySelector("[data-mobile-menu]");!t||!e||!o||(t.addEventListener("click",()=>{o.classList.add("is-open"),document.body.classList.add("no-scroll")}),e.addEventListener("click",()=>{o.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),o.addEventListener("click",r=>{r.target.matches("a")&&(o.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{B as E,U as F,K as a,Y as b,z as c,J as d,N as e,A as f,I as g,Q as h,H as i,D as j,u as k,j as l,k as r};
//# sourceMappingURL=header-CZEpH-je.js.map
