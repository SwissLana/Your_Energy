import{a as f,i as q}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const M="https://your-energy.b.goit.study/api",G={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},y="your-energy-favorites",$="your-energy-quote",J=10,H=12;f.defaults.baseURL=M;async function V(e,t,a){return(await f.get("/filters",{params:{filter:e,page:t,limit:a}})).data}async function W(e){return(await f.get("/exercises",{params:e})).data}async function C(e){return(await f.get(`/exercises/${e}`)).data}async function F(){return(await f.get("/quote")).data}async function X(e){return(await f.post("/subscription",{email:e})).data}function T({name:e,filter:t,imgURL:a}){return`
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
  `}function Z(e){return e.map(T).join("")}function O(e,t={}){const a=typeof t=="boolean"?t:(t==null?void 0:t.isFavorite)??!1,{_id:i,name:s,rating:r,burnedCalories:o,bodyPart:v,target:g}=e,k=a?`
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${i}"
          aria-label="Remove exercise from favorites"
        >
          <svg class="trash-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </button>
      `:`
        <span class="exercise-card-rating">
          <span class="rating-value">${Number(r).toFixed(1)}</span>
          <svg class="star-icon" width="14" height="14" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-card-rating-star"></use>
          </svg>
        </span>
      `;return`
    <li class="exercise-card" data-id="${i}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          ${k}
        </div>

        <button
          class="exercise-start-btn"
          type="button"
          data-exercise-start
          data-id="${i}"
          aria-label="Open exercise details"
        >
          Start
          <svg class="arrow-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${s}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item">Burned calories: <span class="info-value">${o} / 3 min</span></li>
        <li class="info-item">Body part: <span class="info-value">${v}</span></li>
        <li class="info-item">Target: <span class="info-value">${g}</span></li>
      </ul>
    </li>
  `}function ee(e){return e.map(t=>O(t,!1)).join("")}function h(e){return typeof e=="string"&&e.length>0?e.charAt(0).toUpperCase()+e.slice(1):e}function R(e){const{_id:t,name:a,burnedCalories:i,bodyPart:s,target:r}=e,o=h(s),v=h(r),g=`${i} / 3 min`;return`
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
            <svg class="favorite-card-trash-icon" width="16" height="16" aria-hidden="true" focusable="false">
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
          <svg class="favorite-card-arrow-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="favorite-card-heading">
        <div class="favorite-card-icon-wrap">
          <svg class="favorite-card-icon" width="14" height="14" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="favorite-card-title">${a}</h3>
      </div>

      <ul class="favorite-card-info">
        <li class="favorite-info-item" title="Burned calories: ${g}">
          <span class="favorite-info-label">Burned calories:&nbsp;</span>
          <span class="favorite-info-value">${g}</span>
        </li>
        <li class="favorite-info-item" title="Body part: ${o}">
          <span class="favorite-info-label">Body part:&nbsp;</span>
          <span class="favorite-info-value">${o}</span>
        </li>
        <li class="favorite-info-item" title="Target: ${v}">
          <span class="favorite-info-label">Target:&nbsp;</span>
          <span class="favorite-info-value">${v}</span>
        </li>
      </ul>
    </li>
  `}function te(e){return e.map(R).join("")}const d=document.querySelector("[data-loader]");function ae(){d==null||d.classList.remove("is-hidden")}function se(){d==null||d.classList.add("is-hidden")}const p="/Your_Energy/assets/sprite-BXuv3VU9.svg";function m(){return JSON.parse(localStorage.getItem(y))||[]}function E(e){localStorage.setItem(y,JSON.stringify(e))}function B(e){const t=m();t.some(a=>a===e)||(t.push(e),E(t))}function P(e){const t=m().filter(a=>a!==e);E(t)}function I(e){return m().some(t=>t===e)}function A(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem($,JSON.stringify({date:t,quote:e}))}function N(){const e=JSON.parse(localStorage.getItem($));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}const c=document.querySelector("[data-modal-root]");let u=null,l=!1,n=null;function ie(){document.addEventListener("click",U)}async function U(e){const t=e.target.closest("[data-exercise-start]");if(t)try{u=await C(t.dataset.id),_(u)}catch(a){console.error("Failed to load exercise:",a),q.error({message:"Failed to load exercise details.",position:"topRight"})}}function _(e){c&&(c.innerHTML=Q(e),document.body.classList.add("no-scroll"),document.addEventListener("keydown",L),c.addEventListener("click",x),n=c.querySelector("[data-favorite-toggle]"),n&&n.addEventListener("click",S))}function Q(e){l=I(e._id);const t=K(e.rating),a=l?"Remove from favorites":"Add to favorites",i=l?"icon-trash":"icon-heart";return`
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
  `}function K(e){const a=Number(e||0);let i="";const s=Math.round(a%1*100);i+=`
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${s}%" stop-color="#eea111" /> <stop offset="${s}%" stop-color="#e0e0e0" /> </linearGradient>
      </defs>
    </svg>
  `;for(let r=1;r<=5;r++){let o;r<=Math.floor(a)?o="rgb(238, 161, 12)":r===Math.ceil(a)&&a%1!==0?o="url(#partial-star-gradient)":o="rgba(244, 244, 244, 0.2)",i+=`
      <svg width="18" height="18" aria-hidden="true" style="fill: ${o};">
        <use href="${p}#icon-add-rating-star"></use>
      </svg>
    `}return i}function x(e){(e.target.matches("[data-modal-backdrop]")||e.target.closest("[data-modal-close]"))&&w()}function S(){if(!n||!u)return;const e=n.querySelector("span"),t=n.querySelector("use");l?(P(u._id),l=!1,e.textContent="Add to favorites",t.setAttribute("href",`${p}#icon-heart`)):(B(u._id),l=!0,e.textContent="Remove from favorites",t.setAttribute("href",`${p}#icon-trash`))}function L(e){e.key==="Escape"&&w()}function w(){c&&(n&&(n.removeEventListener("click",S),n=null),c.innerHTML="",u=null,l=!1,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",L),c.removeEventListener("click",x))}function Y(e){const t=document.querySelector(e),a=document.getElementById("quote-card-template");!t||!a||t.appendChild(a.content.cloneNode(!0))}async function re(){Y("[data-quote-card-root]");const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const a=N();if(a){b(a,e,t);return}try{const i=await F();A(i),b(i,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function b(e,t,a){t.textContent=e.quote,a.textContent=e.author}function oe(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>400)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function j(){const e=document.querySelectorAll(".header-nav-list .header-nav-link");if(!e.length)return;const t=i=>{const s=i.split("/").pop();return!s||s===""?"index.html":s},a=t(window.location.pathname);e.forEach(i=>{const s=i.querySelector("a");if(!s)return;const r=t(s.pathname);i.classList.toggle("active",r===a)})}function ne(){j();const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),a=document.querySelector("[data-mobile-menu]");!e||!t||!a||(e.addEventListener("click",()=>{a.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{a.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),a.addEventListener("click",i=>{i.target.matches("a")&&(a.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{J as E,H as F,re as a,oe as b,ie as c,ae as d,Z as e,V as f,G as g,se as h,ne as i,W as j,ee as k,m as l,C as m,te as n,P as r,X as s};
//# sourceMappingURL=header-CycUhewb.js.map
