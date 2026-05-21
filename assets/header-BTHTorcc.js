import{a as f,i as k}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const q="https://your-energy.b.goit.study/api",j={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},y="your-energy-favorites",E="your-energy-quote",D=10,G=12;f.defaults.baseURL=q;async function J(e,t,a){return(await f.get("/filters",{params:{filter:e,page:t,limit:a}})).data}async function H(e){return(await f.get("/exercises",{params:e})).data}async function M(e){return(await f.get(`/exercises/${e}`)).data}async function C(){return(await f.get("/quote")).data}async function V(e){return(await f.post("/subscription",{email:e})).data}function F({name:e,filter:t,imgURL:a}){return`
    <li class="category-card" data-name="${e}" data-filter="${t}">
      <button class="category-card-btn" type="button">
        <img
          class="category-card-img"
          src="${a}"
          alt="${e}"
          loading="lazy"
        />
        <div class="category-card-overlay">
          <h3 class="category-card-title">${e}</h3>
          <p class="category-card-text">${t}</p>
        </div>
      </button>
    </li>
  `}function W(e){return e.map(F).join("")}function T(e){const{_id:t,name:a,rating:i,burnedCalories:s,bodyPart:o,target:r}=e,v=Number(i).toFixed(1);return`
    <li class="exercise-card" data-id="${t}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          <span class="exercise-card-rating">
            <span class="rating-value">${v}</span>
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
        <h3 class="exercise-card-title">${a}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item">Burned calories: <span class="info-value">${s} / 3 min</span></li>
        <li class="info-item">Body part: <span class="info-value">${o}</span></li>
        <li class="info-item">Target: <span class="info-value">${r}</span></li>
      </ul>
    </li>
  `}function X(e){return e.map(T).join("")}function h(e){return typeof e=="string"&&e.length>0?e.charAt(0).toUpperCase()+e.slice(1):e}function O(e){const{_id:t,name:a,burnedCalories:i,bodyPart:s,target:o}=e,r=h(s),v=h(o),m=`${i} / 3 min`;return`
    <li class="favorite-card" data-id="${t}">
      <div class="favorite-card-top">
        <div class="favorite-card-badges">
          <span class="favorite-card-badge">WORKOUT</span>
          <button
            class="favorite-card-remove-btn"
            type="button"
            data-favorite-remove
            data-id="${t}"
            aria-label="Remove exercise from favorites"
          >
            <svg class="favorite-card-trash-icon" width="16" height="16">
              <use href="./img/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>

        <button
          class="favorite-card-start-btn"
          type="button"
          data-exercise-start
          data-id="${t}"
          aria-label="Open exercise details"
        >
          Start
          <svg class="favorite-card-arrow-icon" width="16" height="16">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="favorite-card-heading">
        <div class="favorite-card-icon-wrap">
          <svg class="favorite-card-icon" width="14" height="14">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="favorite-card-title">${a}</h3>
      </div>

      <ul class="favorite-card-info">
        <li class="favorite-info-item" title="Burned calories: ${m}">
          <span class="favorite-info-label">Burned calories:&nbsp;</span>
          <span class="favorite-info-value">${m}</span>
        </li>
        <li class="favorite-info-item" title="Body part: ${r}">
          <span class="favorite-info-label">Body part:&nbsp;</span>
          <span class="favorite-info-value">${r}</span>
        </li>
        <li class="favorite-info-item" title="Target: ${v}">
          <span class="favorite-info-label">Target:&nbsp;</span>
          <span class="favorite-info-value">${v}</span>
        </li>
      </ul>
    </li>
  `}function Z(e){return e.map(O).join("")}const d=document.querySelector("[data-loader]");function ee(){d==null||d.classList.remove("is-hidden")}function te(){d==null||d.classList.add("is-hidden")}const p="/Your_Energy/assets/sprite-EbCy_zpL.svg";function g(){return JSON.parse(localStorage.getItem(y))||[]}function $(e){localStorage.setItem(y,JSON.stringify(e))}function R(e){const t=g();t.some(a=>a===e)||(t.push(e),$(t))}function P(e){const t=g().filter(a=>a!==e);$(t)}function B(e){return g().some(t=>t===e)}function I(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem(E,JSON.stringify({date:t,quote:e}))}function _(){const e=JSON.parse(localStorage.getItem(E));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}const c=document.querySelector("[data-modal-root]");let u=null,l=!1,n=null;function ae(){document.addEventListener("click",N)}async function N(e){const t=e.target.closest("[data-exercise-start]");if(t)try{u=await M(t.dataset.id),A(u)}catch(a){console.error("Failed to load exercise:",a),k.error({message:"Failed to load exercise details.",position:"topRight"})}}function A(e){c&&(c.innerHTML=U(e),document.body.classList.add("no-scroll"),document.addEventListener("keydown",L),c.addEventListener("click",x),n=c.querySelector("[data-favorite-toggle]"),n&&n.addEventListener("click",S))}function U(e){l=B(e._id);const t=Q(e.rating),a=l?"Remove from favorites":"Add to favorites",i=l?"icon-trash":"icon-heart";return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="exercise-modal" role="dialog" aria-modal="true">
        <button
          class="modal-close-btn"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          <svg class="modal-close-icon" aria-hidden="true">
            <use href="${p}#icon-x"></use>
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
              <span>${a}</span>
              <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                <use href="${p}#${i}"></use>
              </svg>
            </button>           
          </div>          
        </div>           
      </div>
    </div>
  `}function Q(e){const a=Number(e||0);let i="";const s=Math.round(a%1*100);i+=`
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${s}%" stop-color="#eea111" /> <stop offset="${s}%" stop-color="#e0e0e0" /> </linearGradient>
      </defs>
    </svg>
  `;for(let o=1;o<=5;o++){let r;o<=Math.floor(a)?r="rgb(238, 161, 12)":o===Math.ceil(a)&&a%1!==0?r="url(#partial-star-gradient)":r="rgba(244, 244, 244, 0.2)",i+=`
      <svg width="18" height="18" aria-hidden="true" style="fill: ${r};">
        <use href="${p}#icon-add-rating-star"></use>
      </svg>
    `}return i}function x(e){(e.target.matches("[data-modal-backdrop]")||e.target.closest("[data-modal-close]"))&&w()}function S(){if(!n||!u)return;const e=n.querySelector("span"),t=n.querySelector("use");l?(P(u._id),l=!1,e.textContent="Add to favorites",t.setAttribute("href",`${p}#icon-heart`)):(R(u._id),l=!0,e.textContent="Remove from favorites",t.setAttribute("href",`${p}#icon-trash`))}function L(e){e.key==="Escape"&&w()}function w(){c&&(n&&(n.removeEventListener("click",S),n=null),c.innerHTML="",u=null,l=!1,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",L),c.removeEventListener("click",x))}function z(e){const t=document.querySelector(e),a=document.getElementById("quote-card-template");!t||!a||t.appendChild(a.content.cloneNode(!0))}async function se(){z("[data-quote-card-root]");const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const a=_();if(a){b(a,e,t);return}try{const i=await C();I(i),b(i,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function b(e,t,a){t.textContent=e.quote,a.textContent=e.author}function ie(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>400)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function K(){const e=document.querySelectorAll(".header-nav-list .header-nav-link");if(!e.length)return;const t=i=>{const s=i.split("/").pop();return!s||s===""?"index.html":s},a=t(window.location.pathname);e.forEach(i=>{const s=i.querySelector("a");if(!s)return;const o=t(s.pathname);i.classList.toggle("active",o===a)})}function oe(){K();const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),a=document.querySelector("[data-mobile-menu]");!e||!t||!a||(e.addEventListener("click",()=>{a.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{a.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),a.addEventListener("click",i=>{i.target.matches("a")&&(a.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{D as E,G as F,se as a,ie as b,ae as c,ee as d,W as e,J as f,j as g,te as h,oe as i,H as j,X as k,g as l,M as m,Z as n,P as r,V as s};
//# sourceMappingURL=header-BTHTorcc.js.map
