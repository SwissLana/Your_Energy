import{a as p,i as u}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();const P="https://your-energy.b.goit.study/api",de={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},k="your-energy-favorites",q="your-energy-quote";p.defaults.baseURL=P;async function ue(e,t,a){return(await p.get("/filters",{params:{filter:e,page:t,limit:a}})).data}async function fe(e){return(await p.get("/exercises",{params:e})).data}async function A(e){return(await p.get(`/exercises/${e}`)).data}async function U(){return(await p.get("/quote")).data}async function pe(e){return(await p.post("/subscription",{email:e})).data}async function _(e,t){return(await p.patch(`/exercises/${e}/rating`,t)).data}function Q(e){return/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e)}function ge(){return window.innerWidth<768?8:10}function D(e,t){return(JSON.parse(localStorage.getItem("ratedExercises"))||[]).some(s=>s.exerciseId===e&&s.email===t)}function J(e,t){const a=JSON.parse(localStorage.getItem("ratedExercises"))||[];a.push({exerciseId:e,email:t}),localStorage.setItem("ratedExercises",JSON.stringify(a))}function ve(){return new Date().getFullYear()}const c="/Your_Energy/assets/sprite-DgNJrWnb.svg";function w(){return JSON.parse(localStorage.getItem(k))||[]}function M(e){localStorage.setItem(k,JSON.stringify(e))}function Y(e){const t=w();t.some(a=>a===e)||(t.push(e),M(t))}function z(e){const t=w().filter(a=>a!==e);M(t)}function F(e){return w().some(t=>t===e)}function H(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem(q,JSON.stringify({date:t,quote:e}))}function K(){const e=JSON.parse(localStorage.getItem(q));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}function j({name:e,filter:t,imgURL:a}){return`
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
  `}function me(e){return e.map(j).join("")}function V(e,t={}){const a=typeof t=="boolean"?t:(t==null?void 0:t.isFavorite)??!1,{_id:s,name:r,rating:n,burnedCalories:i,bodyPart:m,target:h}=e,N=a?`
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
          <span class="exercise-card-rating-value">${Number(n).toFixed(1)}</span>
          <span class="exercise-card-star-frame">
            <svg class="exercise-card-star-icon" width="14" height="14" aria-hidden="true" focusable="false">
              <use href="${c}#icon-card-rating-star"></use>
            </svg>
          </span>
        </span>
      `;return`
    <li class="exercise-card" data-id="${s}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          ${N}
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
            <use href="${c}#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="14" height="14" aria-hidden="true" focusable="false">
            <use href="${c}#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${r}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item" title="Burned calories: ${i} / 3 min">
          <span class="info-label">Burned calories:&nbsp;</span>
          <span class="info-value">${i} / 3 min</span>
        </li>
        <li class="info-item" title="Body part: ${m}">
          <span class="info-label">Body part:&nbsp;</span>
          <span class="info-value">${m}</span>
        </li>
        <li class="info-item" title="Target: ${h}">
          <span class="info-label">Target:&nbsp;</span>
          <span class="info-value">${h}</span>
        </li>
      </ul>
    </li>
  `}function he(e){return e.map(t=>V(t,!1)).join("")}function L(e){return typeof e=="string"&&e.length>0?e.charAt(0).toUpperCase()+e.slice(1):e}function W(e){const{_id:t,name:a,burnedCalories:s,bodyPart:r,target:n}=e,i=L(r),m=L(n),h=`${s} / 3 min`;return`
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
            <use href="${c}#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="favorite-card-heading">
        <div class="favorite-card-icon-wrap">
          <svg class="favorite-card-icon" width="14" height="14">
            <use href="${c}#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="favorite-card-title">${a}</h3>
      </div>

      <ul class="favorite-card-info">
        <li class="favorite-info-item" title="Burned calories: ${h}">
          <span class="favorite-info-label">Burned calories:&nbsp;</span>
          <span class="favorite-info-value">${h}</span>
        </li>
        <li class="favorite-info-item" title="Body part: ${i}">
          <span class="favorite-info-label">Body part:&nbsp;</span>
          <span class="favorite-info-value">${i}</span>
        </li>
        <li class="favorite-info-item" title="Target: ${m}">
          <span class="favorite-info-label">Target:&nbsp;</span>
          <span class="favorite-info-value">${m}</span>
        </li>
      </ul>
    </li>
  `}function be(e){return e.map(W).join("")}function G(e){const t=F(e._id),a=Z(e.rating),s=t?"Remove from favorites":"Add to favorites",r=t?"icon-trash":"icon-heart";return`
    <div class="backdrop" data-modal-backdrop>
      <div class="modal exercise-modal" role="dialog" aria-modal="true">
        <button
          class="close-btn exercise-close"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          <svg class="modal-close-icon" aria-hidden="true">
            <use href="${c}#icon-x"></use>
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
                  ${a}
                </div>
              </div>
            </div>
            <ul class="exercise-modal-info">
              <li class="exercise-modal-info-item">
                <p class="info-label">Target</p>
                <span class="info-value">${e.target}</span>
              </li>

              <li class="exercise-modal-info-item">
                <p class="info-label">Body Part</p>
                <span class="info-value">${e.bodyPart}</span>
              </li>
              
              <li class="exercise-modal-info-item">
                <p class="info-label">Equipment</p>
                <span class="info-value">${e.equipment}</span>
              </li>
              
              <li class="exercise-modal-info-item">
                <p class="info-label">Popular</p>
                <span class="info-value">${e.popularity}</span>
              </li>

              <li class="exercise-modal-info-item">
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
                <span>${s}</span>
                <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                  <use href="${c}#${r}"></use>
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
  `}function Z(e){const a=Number(e||0);let s="";const r=Math.round(a%1*100);s+=`
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${r}%" stop-color="rgb(238, 161, 12)" /> <stop offset="${r}%" stop-color="rgba(244, 244, 244, 0.2)" /> </linearGradient>
      </defs>
    </svg>
  `;for(let n=1;n<=5;n++){let i;n<=Math.floor(a)?i="rgb(238, 161, 12)":n===Math.ceil(a)&&a%1!==0?i="url(#partial-star-gradient)":i="rgba(244, 244, 244, 0.2)",s+=`
      <svg width="18" height="18" aria-hidden="true" style="fill: ${i};">
        <use href="${c}#icon-add-rating-star"></use>
      </svg>
    `}return s}const g=document.querySelector("[data-loader]");function ye(){g==null||g.classList.remove("is-hidden")}function xe(){g==null||g.classList.add("is-hidden")}const y=document.querySelector("[data-modal-rating]"),x=document.querySelector(".rating-form"),X=document.querySelector("[data-rating-close]"),E=document.querySelector(".live-rating-value");document.querySelectorAll('.stars-radio-group>input[type="radio"]');let $=null;function $e(){!y||!x||(X.addEventListener("click",S),y.addEventListener("click",te),x.addEventListener("submit",se),x.addEventListener("change",ae))}function ee(e){$=e,y.classList.remove("is-hidden")}function S(){E&&(E.textContent="0.0"),x.reset(),y.classList.add("is-hidden"),l&&l.classList.remove("is-hidden")}function te(e){e.target===y&&S()}function ae(e){if(e.target.name!=="rating")return;const t=e.target.value;E.textContent=`${t}.0`}async function se(e){e.preventDefault();const t=new FormData(e.currentTarget),a=t.get("rating"),s=t.get("email"),r=t.get("comment");if(!a){u.warning({message:"Please select stars!",position:"topCenter"});return}if(!s.trim()||!r.trim()){u.warning({message:"Please fill out all the fields!",position:"topCenter"});return}if(!Q(s)){u.warning({message:"Please enter a valid email address!",position:"topCenter"});return}if(D($._id,s)){u.error({message:"You have already rated this exercise!",position:"topCenter"}),S();return}const n={rate:Number(a),email:s,review:r};try{await _($._id,n),J($._id,s),u.success({message:"Thank you for your review!",position:"topCenter"}),S()}catch(i){console.error(i),u.error({message:"Something went wrong.",position:"topCenter"})}}const o=document.querySelector("[data-modal-root]");let l=null,f=null,b=!1,d=null,v=null;function Se(){document.addEventListener("click",re)}async function re(e){const t=e.target.closest("[data-exercise-start]");if(t)try{f=await A(t.dataset.id),ne(f)}catch(a){console.error("Failed to load exercise:",a),u.error({message:"Failed to load exercise details.",position:"topCenter"})}}function ne(e){if(!(!o||!e)){if(l){l.classList.remove("is-hidden");return}b=F(e._id),o.innerHTML=G(e),l=o.querySelector("[data-modal-backdrop]"),document.body.classList.add("no-scroll"),document.addEventListener("keydown",B),o.addEventListener("click",R),d=o.querySelector("[data-favorite-toggle]"),d&&d.addEventListener("click",O),v=o.querySelector("[data-give-rating]"),v&&v.addEventListener("click",T)}}function T(){l&&l.classList.add("is-hidden"),ee(f)}function R(e){(e.target.matches("[data-modal-backdrop]")||e.target.closest("[data-modal-close]"))&&I()}function O(){if(!d||!f)return;const e=d.querySelector("span"),t=d.querySelector("use");b?(z(f._id),b=!1,e.textContent="Add to favorites",t.setAttribute("href",`${c}#icon-heart`)):(Y(f._id),b=!0,e.textContent="Remove from favorites",t.setAttribute("href",`${c}#icon-trash`)),document.dispatchEvent(new CustomEvent("favoritesUpdated"))}function B(e){if(e.key!=="Escape")return;const t=document.querySelector("[data-modal-rating]");if(t&&!t.classList.contains("is-hidden")){const a=document.querySelector(".rating-form");a&&a.reset(),t.classList.add("is-hidden"),l&&l.classList.remove("is-hidden");return}o.innerHTML!==""&&I()}function I(){o&&(d&&(d.removeEventListener("click",O),d=null),v&&(v.removeEventListener("click",T),v=null),o.innerHTML="",f=null,l=null,b=!1,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",B),o.removeEventListener("click",R))}function ie(e){const t=document.querySelector(e),a=document.getElementById("quote-card-template");!t||!a||(t.innerHTML="",t.appendChild(a.content.cloneNode(!0)))}async function Ee(){ie("[data-quote-card-root]");const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const a=K();if(a){C(a,e,t);return}try{const s=await U();H(s),C(s,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function C(e,t,a){t.textContent=e.quote,a.textContent=e.author}function we(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>300)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function oe(){const e=document.querySelectorAll(".header-nav-list .header-nav-link");if(!e.length)return;const t=s=>{const r=s.split("/").pop();return!r||r===""?"index.html":r},a=t(window.location.pathname);e.forEach(s=>{const r=s.querySelector("a");if(!r)return;const n=t(r.pathname);s.classList.toggle("active",n===a)})}function Le(){oe();const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),a=document.querySelector("[data-mobile-menu]");!e||!t||!a||(e.addEventListener("click",()=>{a.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{a.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),a.addEventListener("click",s=>{s.target.matches("a")&&(a.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{de as F,Ee as a,we as b,Se as c,$e as d,ye as e,ue as f,ve as g,me as h,Le as i,xe as j,ge as k,fe as l,he as m,w as n,A as o,be as p,z as r,pe as s};
//# sourceMappingURL=header-BobK75gr.js.map
