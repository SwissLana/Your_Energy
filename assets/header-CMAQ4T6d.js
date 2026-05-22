import{a as g,i as d}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}})();const I="https://your-energy.b.goit.study/api",de={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},q="your-energy-favorites",C="your-energy-quote",ue=10,fe=12;g.defaults.baseURL=I;async function ge(e,t,a){return(await g.get("/filters",{params:{filter:e,page:t,limit:a}})).data}async function pe(e){return(await g.get("/exercises",{params:e})).data}async function A(e){return(await g.get(`/exercises/${e}`)).data}async function N(){return(await g.get("/quote")).data}async function ve(e){return(await g.post("/subscription",{email:e})).data}async function _(e,t){return(await g.patch(`/exercises/${e}/rating`,t)).data}function U({name:e,filter:t,imgURL:a}){return`
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
  `}function me(e){return e.map(U).join("")}function Q(e,t={}){const a=typeof t=="boolean"?t:(t==null?void 0:t.isFavorite)??!1,{_id:s,name:r,rating:i,burnedCalories:n,bodyPart:b,target:y}=e,P=a?`
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${s}"
          aria-label="Remove exercise from favorites"
        >
          <svg class="trash-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </button>
      `:`
        <span class="exercise-card-rating">
          <span class="rating-value">${Number(i).toFixed(1)}</span>
          <svg class="star-icon" width="14" height="14" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-card-rating-star"></use>
          </svg>
        </span>
      `;return`
    <li class="exercise-card" data-id="${s}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          ${P}
        </div>

        <button
          class="exercise-start-btn"
          type="button"
          data-exercise-start
          data-id="${s}"
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
        <h3 class="exercise-card-title">${r}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item">Burned calories: <span class="info-value">${n} / 3 min</span></li>
        <li class="info-item">Body part: <span class="info-value">${b}</span></li>
        <li class="info-item">Target: <span class="info-value">${y}</span></li>
      </ul>
    </li>
  `}function he(e){return e.map(t=>Q(t,!1)).join("")}function w(e){return typeof e=="string"&&e.length>0?e.charAt(0).toUpperCase()+e.slice(1):e}function D(e){const{_id:t,name:a,burnedCalories:s,bodyPart:r,target:i}=e,n=w(r),b=w(i),y=`${s} / 3 min`;return`
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
        <li class="favorite-info-item" title="Burned calories: ${y}">
          <span class="favorite-info-label">Burned calories:&nbsp;</span>
          <span class="favorite-info-value">${y}</span>
        </li>
        <li class="favorite-info-item" title="Body part: ${n}">
          <span class="favorite-info-label">Body part:&nbsp;</span>
          <span class="favorite-info-value">${n}</span>
        </li>
        <li class="favorite-info-item" title="Target: ${b}">
          <span class="favorite-info-label">Target:&nbsp;</span>
          <span class="favorite-info-value">${b}</span>
        </li>
      </ul>
    </li>
  `}function be(e){return e.map(D).join("")}const p=document.querySelector("[data-loader]");function ye(){p==null||p.classList.remove("is-hidden")}function Ee(){p==null||p.classList.add("is-hidden")}const m="/Your_Energy/assets/sprite-BXuv3VU9.svg";function J(e){return/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e)}function z(e,t){return(JSON.parse(localStorage.getItem("ratedExercises"))||[]).some(s=>s.exerciseId===e&&s.email===t)}function Y(e,t){const a=JSON.parse(localStorage.getItem("ratedExercises"))||[];a.push({exerciseId:e,email:t}),localStorage.setItem("ratedExercises",JSON.stringify(a))}const h=document.querySelector("[data-modal-rating]"),E=document.querySelector(".rating-form"),G=document.querySelector("[data-rating-close]"),L=document.querySelector(".live-rating-value");document.querySelectorAll('.stars-radio-group>input[type="radio"]');let S=null;function Se(){!h||!E||(G.addEventListener("click",x),h.addEventListener("click",V),E.addEventListener("submit",H),E.addEventListener("change",j))}function K(e){S=e,h.classList.remove("is-hidden")}function x(){L&&(L.textContent="0.0"),E.reset(),h.classList.add("is-hidden"),c&&c.classList.remove("is-hidden")}function V(e){e.target===h&&x()}function j(e){if(e.target.name!=="rating")return;const t=e.target.value;L.textContent=`${t}.0`}async function H(e){e.preventDefault();const t=new FormData(e.currentTarget),a=t.get("rating"),s=t.get("email"),r=t.get("comment");if(!a){d.warning({message:"Please select stars!",position:"topCenter"});return}if(!s.trim()||!r.trim()){d.warning({message:"Please fill out all the fields!",position:"topCenter"});return}if(!J(s)){d.warning({message:"Please enter a valid email address!",position:"topCenter"});return}if(z(S._id,s)){d.error({message:"You have already rated this exercise!",position:"topCenter"}),x();return}const i={rate:Number(a),email:s,review:r};try{await _(S._id,i),Y(S._id,s),d.success({message:"Thank you for your review!",position:"topCenter"}),x()}catch(n){console.error(n),d.error({message:"Something went wrong.",position:"topCenter"})}}function $(){return JSON.parse(localStorage.getItem(q))||[]}function M(e){localStorage.setItem(q,JSON.stringify(e))}function W(e){const t=$();t.some(a=>a===e)||(t.push(e),M(t))}function X(e){const t=$().filter(a=>a!==e);M(t)}function Z(e){return $().some(t=>t===e)}function ee(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem(C,JSON.stringify({date:t,quote:e}))}function te(){const e=JSON.parse(localStorage.getItem(C));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}const o=document.querySelector("[data-modal-root]");let c=null,u=null,f=!1,l=null,v=null;function xe(){document.addEventListener("click",ae)}async function ae(e){const t=e.target.closest("[data-exercise-start]");if(t)try{u=await A(t.dataset.id),se(u)}catch(a){console.error("Failed to load exercise:",a),d.error({message:"Failed to load exercise details.",position:"topCenter"})}}function se(e){if(!(!o||!e)){if(c){c.classList.remove("is-hidden");return}o.innerHTML=re(e),c=o.querySelector("[data-modal-backdrop]"),document.body.classList.add("no-scroll"),document.addEventListener("keydown",O),o.addEventListener("click",F),l=o.querySelector("[data-favorite-toggle]"),l&&l.addEventListener("click",T),v=o.querySelector("[data-give-rating]"),v&&v.addEventListener("click",R)}}function R(){c&&c.classList.add("is-hidden"),K(u)}function re(e){f=Z(e._id);const t=ie(e.rating),a=f?"Remove from favorites":"Add to favorites",s=f?"icon-trash":"icon-heart";return`
    <div class="backdrop" data-modal-backdrop>
      <div class="modal exercise-modal" role="dialog" aria-modal="true">
        <button
          class="close-btn exercise-close"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          <svg class="modal-close-icon" aria-hidden="true">
            <use href="${m}#icon-x"></use>
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

            <div class="btn-wrapper">
              <button
                class="modal-btn favorite-modal-btn"
                type="button"
                data-favorite-toggle
              >
                <span>${a}</span>
                <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                  <use href="${m}#${s}"></use>
                </svg>
              </button>
              <button
                class="modal-btn give-rating-btn"
                type="button"
                data-give-rating
              >
                Give a rating
              </button>
            </div>
          </div>          
        </div>           
      </div>
    </div>
  `}function ie(e){const a=Number(e||0);let s="";const r=Math.round(a%1*100);s+=`
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${r}%" stop-color="#eea111" /> <stop offset="${r}%" stop-color="#e0e0e0" /> </linearGradient>
      </defs>
    </svg>
  `;for(let i=1;i<=5;i++){let n;i<=Math.floor(a)?n="rgb(238, 161, 12)":i===Math.ceil(a)&&a%1!==0?n="url(#partial-star-gradient)":n="rgba(244, 244, 244, 0.2)",s+=`
      <svg width="18" height="18" aria-hidden="true" style="fill: ${n};">
        <use href="${m}#icon-add-rating-star"></use>
      </svg>
    `}return s}function F(e){(e.target.matches("[data-modal-backdrop]")||e.target.closest("[data-modal-close]"))&&B()}function T(){if(!l||!u)return;const e=l.querySelector("span"),t=l.querySelector("use");f?(X(u._id),f=!1,e.textContent="Add to favorites",t.setAttribute("href",`${m}#icon-heart`)):(W(u._id),f=!0,e.textContent="Remove from favorites",t.setAttribute("href",`${m}#icon-trash`))}function O(e){if(e.key!=="Escape")return;const t=document.querySelector("[data-modal-rating]");if(t&&!t.classList.contains("is-hidden")){const a=document.querySelector(".rating-form");a&&a.reset(),t.classList.add("is-hidden"),c&&c.classList.remove("is-hidden");return}o.innerHTML!==""&&B()}function B(){o&&(l&&(l.removeEventListener("click",T),l=null),v&&(v.removeEventListener("click",R),v=null),o.innerHTML="",u=null,c=null,f=!1,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",O),o.removeEventListener("click",F))}function ne(e){const t=document.querySelector(e),a=document.getElementById("quote-card-template");!t||!a||t.appendChild(a.content.cloneNode(!0))}async function Le(){ne("[data-quote-card-root]");const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const a=te();if(a){k(a,e,t);return}try{const s=await N();ee(s),k(s,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function k(e,t,a){t.textContent=e.quote,a.textContent=e.author}function $e(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>400)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function oe(){const e=document.querySelectorAll(".header-nav-list .header-nav-link");if(!e.length)return;const t=s=>{const r=s.split("/").pop();return!r||r===""?"index.html":r},a=t(window.location.pathname);e.forEach(s=>{const r=s.querySelector("a");if(!r)return;const i=t(r.pathname);s.classList.toggle("active",i===a)})}function we(){oe();const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),a=document.querySelector("[data-mobile-menu]");!e||!t||!a||(e.addEventListener("click",()=>{a.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{a.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),a.addEventListener("click",s=>{s.target.matches("a")&&(a.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{ue as E,fe as F,Le as a,$e as b,xe as c,Se as d,ye as e,ge as f,me as g,Ee as h,we as i,de as j,pe as k,he as l,$ as m,A as n,be as o,X as r,ve as s};
//# sourceMappingURL=header-CMAQ4T6d.js.map
