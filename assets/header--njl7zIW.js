import{a as v,i as g}from"./vendor-CaULtfQf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const G="https://your-energy.b.goit.study/api",Ee={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"},N="your-energy-favorites",I="your-energy-quote";v.defaults.baseURL=G;async function Se(e,t,a){return(await v.get("/filters",{params:{filter:e,page:t,limit:a}})).data}async function Le(e){return(await v.get("/exercises",{params:e})).data}async function V(e){return(await v.get(`/exercises/${e}`)).data}async function W(){return(await v.get("/quote")).data}async function Me(e){return(await v.post("/subscription",{email:e})).data}async function Z(e,t){return(await v.patch(`/exercises/${e}/rating`,t)).data}function X(e){return/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e)}function ke(){return window.innerWidth<768?8:10}function ee(e,t){return(JSON.parse(localStorage.getItem("ratedExercises"))||[]).some(n=>n.exerciseId===e&&n.email===t)}function te(e,t){const a=JSON.parse(localStorage.getItem("ratedExercises"))||[];a.push({exerciseId:e,email:t}),localStorage.setItem("ratedExercises",JSON.stringify(a))}function Ce(){return new Date().getFullYear()}const o="/Your_Energy/assets/sprite-DgNJrWnb.svg";function q(){return JSON.parse(localStorage.getItem(N))||[]}function A(e){localStorage.setItem(N,JSON.stringify(e))}function ae(e){const t=q();t.some(a=>a===e)||(t.push(e),A(t))}function se(e){const t=q().filter(a=>a!==e);A(t)}function _(e){return q().some(t=>t===e)}function ne(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem(I,JSON.stringify({date:t,quote:e}))}function ie(){const e=JSON.parse(localStorage.getItem(I));if(!e)return null;const t=new Date().toISOString().split("T")[0];return e.date===t?e.quote:null}function re({name:e,filter:t,imgURL:a}){return`
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
  `}function qe(e){return e.map(re).join("")}function oe(e,t={}){const a=typeof t=="boolean"?t:(t==null?void 0:t.isFavorite)??!1,{_id:n,name:s,rating:i,burnedCalories:r,bodyPart:f,target:p}=e,h=a?`
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${n}"
          aria-label="Remove exercise from favorites"
        >
          <svg class="trash-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="${o}#icon-trash"></use>
          </svg>
        </button>
      `:`
        <span class="exercise-card-rating">
          <span class="exercise-card-rating-value">${Number(i).toFixed(1)}</span>
          <span class="exercise-card-star-frame">
            <svg class="exercise-card-star-icon" width="14" height="14" aria-hidden="true" focusable="false">
              <use href="${o}#icon-card-rating-star"></use>
            </svg>
          </span>
        </span>
      `;return`
    <li class="exercise-card" data-id="${n}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          ${h}
        </div>

        <button
          class="exercise-start-btn"
          type="button"
          data-exercise-start
          data-id="${n}"
          aria-label="Open exercise details"
        >
          Start
          <svg class="arrow-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="${o}#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="14" height="14" aria-hidden="true" focusable="false">
            <use href="${o}#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${s}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item" title="Burned calories: ${r} / 3 min">
          <span class="info-label">Burned calories:&nbsp;</span>
          <span class="info-value">${r} / 3 min</span>
        </li>
        <li class="info-item" title="Body part: ${f}">
          <span class="info-label">Body part:&nbsp;</span>
          <span class="info-value">${f}</span>
        </li>
        <li class="info-item" title="Target: ${p}">
          <span class="info-label">Target:&nbsp;</span>
          <span class="info-value">${p}</span>
        </li>
      </ul>
    </li>
  `}function Fe(e){return e.map(t=>oe(t,!1)).join("")}function B(e){return typeof e=="string"&&e.length>0?e.charAt(0).toUpperCase()+e.slice(1):e}function ce(e){const{_id:t,name:a,burnedCalories:n,bodyPart:s,target:i}=e,r=B(s),f=B(i),p=`${n} / 3 min`;return`
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
              <use href="${o}#icon-trash"></use>
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
            <use href="${o}#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="favorite-card-heading">
        <div class="favorite-card-icon-wrap">
          <svg class="favorite-card-icon" width="14" height="14">
            <use href="${o}#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="favorite-card-title">${a}</h3>
      </div>

      <ul class="favorite-card-info">
        <li class="favorite-info-item" title="Burned calories: ${p}">
          <span class="favorite-info-label">Burned calories:&nbsp;</span>
          <span class="favorite-info-value">${p}</span>
        </li>
        <li class="favorite-info-item" title="Body part: ${r}">
          <span class="favorite-info-label">Body part:&nbsp;</span>
          <span class="favorite-info-value">${r}</span>
        </li>
        <li class="favorite-info-item" title="Target: ${f}">
          <span class="favorite-info-label">Target:&nbsp;</span>
          <span class="favorite-info-value">${f}</span>
        </li>
      </ul>
    </li>
  `}function Te(e){return e.map(ce).join("")}function le(e){const t=_(e._id),a=de(e.rating),n=t?"Remove from favorites":"Add to favorites",s=t?"icon-trash":"icon-heart";return`
    <div class="backdrop" data-modal-backdrop>
      <div class="modal exercise-modal" role="dialog" aria-modal="true">
        <button
          class="close-btn exercise-close"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          <svg class="modal-close-icon" aria-hidden="true">
            <use href="${o}#icon-x"></use>
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
                <span>${n}</span>
                <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                  <use href="${o}#${s}"></use>
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
  `}function de(e){const a=Number(e||0);let n="";const s=Math.round(a%1*100);n+=`
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${s}%" stop-color="rgb(238, 161, 12)" /> <stop offset="${s}%" stop-color="rgba(244, 244, 244, 0.2)" /> </linearGradient>
      </defs>
    </svg>
  `;for(let i=1;i<=5;i++){let r;i<=Math.floor(a)?r="rgb(238, 161, 12)":i===Math.ceil(a)&&a%1!==0?r="url(#partial-star-gradient)":r="rgba(244, 244, 244, 0.2)",n+=`
      <svg width="18" height="18" aria-hidden="true" style="fill: ${r};">
        <use href="${o}#icon-add-rating-star"></use>
      </svg>
    `}return n}const L=e=>`<svg class="pagination-icon" aria-hidden="true" focusable="false"><use href="${o}#${e}"></use></svg>`,O=e=>`${L(e)}${L(e)}`,w={first:O("icon-arrow-back"),prev:L("icon-arrow-back"),next:L("icon-arrow-forward"),last:O("icon-arrow-forward")};function Be(e,t){if(e<=1)return"";const a=t===1,n=t===e,s=e>3,i=Math.min(Math.max(1,t-1),Math.max(1,e-2)),r=Math.max(Math.min(t+1,e),Math.min(3,e)),f=s&&i>1,p=s&&r<e,h=(u,k,j,H,K=!1)=>`<button
      class="pagination-btn pagination-btn--nav${K?" pagination-btn--double":""}"
      type="button"
      data-page="${k}"
      ${j?"disabled":""}
      aria-label="${H}"
    >${u}</button>`,F=u=>`<button
      class="pagination-btn${u===t?" is-active":""}"
      type="button"
      data-page="${u}"
      aria-label="Go to page ${u}"
      ${u===t?'aria-current="page"':""}
    >${u}</button>`,z=Array.from({length:r-i+1},(u,k)=>F(i+k)),T='<span class="pagination-ellipsis">...</span>';return[s?h(w.first,1,a,"First page",!0):"",s?h(w.prev,Math.max(1,t-1),a,"Previous page"):"",f?T:"",...z,p?T:"",s?h(w.next,Math.min(e,t+1),n,"Next page"):"",s?h(w.last,e,n,"Last page",!0):""].join("")}function Oe(e){const t=e.target.closest(".pagination-btn");return!t||t.disabled?null:Number(t.dataset.page)}const b=document.querySelector("[data-loader]");let U=null;function ue(){U=setTimeout(()=>{b==null||b.classList.remove("is-hidden")},300)}function fe(){clearTimeout(U),b==null||b.classList.add("is-hidden")}const x=document.querySelector("[data-modal-rating]"),E=document.querySelector(".rating-form"),pe=document.querySelector("[data-rating-close]"),C=document.querySelector(".live-rating-value");document.querySelectorAll('.stars-radio-group>input[type="radio"]');let S=null;function Re(){!x||!E||(pe.addEventListener("click",M),x.addEventListener("click",me),E.addEventListener("submit",he),E.addEventListener("change",ve))}function ge(e){S=e,x.classList.remove("is-hidden")}function M(){C&&(C.textContent="0.0"),E.reset(),x.classList.add("is-hidden"),l&&l.classList.remove("is-hidden")}function me(e){e.target===x&&M()}function ve(e){if(e.target.name!=="rating")return;const t=e.target.value;C.textContent=`${t}.0`}async function he(e){e.preventDefault();const t=new FormData(e.currentTarget),a=t.get("rating"),n=t.get("email"),s=t.get("comment");if(!a){g.warning({message:"Please select stars!",position:"topCenter"});return}if(!n.trim()||!s.trim()){g.warning({message:"Please fill out all the fields!",position:"topCenter"});return}if(!X(n)){g.warning({message:"Please enter a valid email address!",position:"topCenter"});return}if(ee(S._id,n)){g.error({message:"You have already rated this exercise!",position:"topCenter"}),M();return}const i={rate:Number(a),email:n,review:s};try{await Z(S._id,i),te(S._id,n),g.success({message:"Thank you for your review!",position:"topCenter"}),M()}catch(r){console.error(r),g.error({message:"Something went wrong.",position:"topCenter"})}}const c=document.querySelector("[data-modal-root]");let l=null,m=null,$=!1,d=null,y=null;function Ne(){document.addEventListener("click",be)}async function be(e){const t=e.target.closest("[data-exercise-start]");if(t)try{ue(),m=await V(t.dataset.id),ye(m)}catch(a){console.error("Failed to load exercise:",a),g.error({message:"Failed to load exercise details.",position:"topCenter"})}finally{fe()}}function ye(e){if(!(!c||!e)){if(l){l.classList.remove("is-hidden");return}$=_(e._id),c.innerHTML=le(e),l=c.querySelector("[data-modal-backdrop]"),document.body.classList.add("no-scroll"),document.addEventListener("keydown",Y),c.addEventListener("click",D),d=c.querySelector("[data-favorite-toggle]"),d&&d.addEventListener("click",J),y=c.querySelector("[data-give-rating]"),y&&y.addEventListener("click",Q)}}function Q(){l&&l.classList.add("is-hidden"),ge(m)}function D(e){(e.target.matches("[data-modal-backdrop]")||e.target.closest("[data-modal-close]"))&&P()}function J(){if(!d||!m)return;const e=d.querySelector("span"),t=d.querySelector("use");$?(se(m._id),$=!1,e.textContent="Add to favorites",t.setAttribute("href",`${o}#icon-heart`)):(ae(m._id),$=!0,e.textContent="Remove from favorites",t.setAttribute("href",`${o}#icon-trash`)),document.dispatchEvent(new CustomEvent("favoritesUpdated"))}function Y(e){if(e.key!=="Escape")return;const t=document.querySelector("[data-modal-rating]");if(t&&!t.classList.contains("is-hidden")){const a=document.querySelector(".rating-form");a&&a.reset(),t.classList.add("is-hidden"),l&&l.classList.remove("is-hidden");return}c.innerHTML!==""&&P()}function P(){c&&(d&&(d.removeEventListener("click",J),d=null),y&&(y.removeEventListener("click",Q),y=null),c.innerHTML="",m=null,l=null,$=!1,document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",Y),c.removeEventListener("click",D))}function $e(e){const t=document.querySelector(e),a=document.getElementById("quote-card-template");!t||!a||(t.innerHTML="",t.appendChild(a.content.cloneNode(!0)))}async function Ie(){$e("[data-quote-card-root]");const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]");if(!e||!t)return;const a=ie();if(a){R(a,e,t);return}try{const n=await W();ne(n),R(n,e,t)}catch{e.textContent="Quote is not available now.",t.textContent=""}}function R(e,t,a){t.textContent=e.quote,a.textContent=e.author}function Ae(){const e=document.querySelector("[data-scroll-up]");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("is-visible",window.scrollY>300)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function xe(){const e=document.querySelectorAll(".header-nav-list .header-nav-link");if(!e.length)return;const t=n=>{const s=n.split("/").pop();return!s||s===""?"index.html":s},a=t(window.location.pathname);e.forEach(n=>{const s=n.querySelector("a");if(!s)return;const i=t(s.pathname);n.classList.toggle("active",i===a)})}function _e(){xe();const e=document.querySelector("[data-menu-open]"),t=document.querySelector("[data-menu-close]"),a=document.querySelector("[data-mobile-menu]");!e||!t||!a||(e.addEventListener("click",()=>{a.classList.add("is-open"),document.body.classList.add("no-scroll")}),t.addEventListener("click",()=>{a.classList.remove("is-open"),document.body.classList.remove("no-scroll")}),a.addEventListener("click",n=>{n.target.matches("a")&&(a.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}))}export{Ee as F,Ie as a,Ae as b,Ne as c,Re as d,ue as e,Se as f,Ce as g,qe as h,_e as i,Be as j,fe as k,Oe as l,ke as m,Le as n,Fe as o,q as p,V as q,Te as r,Me as s,se as t};
//# sourceMappingURL=header--njl7zIW.js.map
