import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import sprite from '../../img/sprite.svg';
import { fetchExerciseById } from '../api/exercises-api';
import { openRatingModal } from './rating-modal';
import { addFavorite, removeFavorite, isFavorite } from '../utils/storage';

const modalRoot = document.querySelector('[data-modal-root]');

export let backdropExercise = null;
let currentExercise = null;
let favorite = false;
let favoriteBtn = null;
let ratingBtn = null;

export function initExerciseModal() {
  document.addEventListener('click', onExerciseStartClick);
}

async function onExerciseStartClick(event) {
  const button = event.target.closest('[data-exercise-start]');

  if (!button) return;

  try {
    currentExercise = await fetchExerciseById(button.dataset.id);
    openExerciseModal(currentExercise);
  } catch (error) {
    console.error('Failed to load exercise:', error);
    iziToast.error({
      message: 'Failed to load exercise details.',
      position: 'topCenter',
    });
  }
}

export function openExerciseModal(exercise) {
  if (!modalRoot || !exercise) return;

  // show modal if it is already rendered but hidden
  if (backdropExercise) {
    backdropExercise.classList.remove('is-hidden');
    return;
  }

  // generate mark up if it is first opening
  modalRoot.innerHTML = createExerciseModalMarkup(exercise);

  backdropExercise = modalRoot.querySelector('[data-modal-backdrop]');

  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscPress);
  modalRoot.addEventListener('click', onClickCloseModal);

  // add event listeners to buttons
  favoriteBtn = modalRoot.querySelector('[data-favorite-toggle]');
  if (favoriteBtn) favoriteBtn.addEventListener('click', onClickToggleFavorite);
  
  ratingBtn = modalRoot.querySelector('[data-give-rating]')
  if (ratingBtn) ratingBtn.addEventListener('click', onClickOpenRatingModal)
}

function onClickOpenRatingModal() {
  // hide exercise modal window
  if (backdropExercise) {
    backdropExercise.classList.add('is-hidden');
  }

  openRatingModal(currentExercise);  
}

function createExerciseModalMarkup(exercise) {
  favorite = isFavorite(exercise._id);

  const starsMarkup = createRatingStarsMarkup(exercise.rating);

  // dynamically change button functionality display
  const btnText = favorite ? 'Remove from favorites' : 'Add to favorites';
  const btnIconId = favorite ? 'icon-trash' : 'icon-heart';

  return `
    <div class="backdrop" data-modal-backdrop>
      <div class="modal exercise-modal" role="dialog" aria-modal="true">
        <button
          class="close-btn exercise-close"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          <svg class="modal-close-icon" aria-hidden="true">
            <use href="${sprite}#icon-x"></use>
          </svg>
        </button>
        <div class="modal-content">
          <div class="exercise-modal-media">
            ${
              exercise.gifUrl
                ? `<img src="${exercise.gifUrl}" alt="${exercise.name}" loading="lazy" />`
                : '<p>Video is not available.</p>'
            }
          </div>
          <div class="exercise-description">
            <div class="exercise-heading">
              <h2 class="exercise-modal-title">${exercise.name}</h2>
              <div class="exercise-rating-container">
                <span class="rating-value">${exercise.rating ? Number(exercise.rating).toFixed(1) : '0.0'}</span>
                <div class="rating-stars">
                  ${starsMarkup}
                </div>
              </div>
            </div>
            <ul class="exercise-modal-info">
              <li class="info-item">
                <p class="info-label">Target</p>
                <span class="info-value">${exercise.target}</span>
              </li>

              <li class="info-item">
                <p class="info-label">Body Part</p>
                <span class="info-value">${exercise.bodyPart}</span>
              </li>
              
              <li class="info-item">
                <p class="info-label">Equipment</p>
                <span class="info-value">${exercise.equipment}</span>
              </li>
              
              <li class="info-item">
                <p class="info-label">Popular</p>
                <span class="info-value">${exercise.popularity}</span>
              </li>

              <li class="info-item">
                <p class="info-label">Burned Calories</p>
                <span class="info-value">${exercise.burnedCalories} / ${exercise.time} min</span></li>
            </ul>

            <p class="exercise-modal-description">
              ${exercise.description || 'Description is not available.'}
            </p>

            <div class="btn-wrapper">
              <button
                class="modal-btn favorite-modal-btn"
                type="button"
                data-favorite-toggle
              >
                <span>${btnText}</span>
                <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                  <use href="${sprite}#${btnIconId}"></use>
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
  `;
}

function createRatingStarsMarkup(rating) {
  const maxStars = 5;
  // round up rating to whole number
  const currentRating = Number(rating || 0);

  let starsMarkup = '';

  // calculate coloring percentage for the star
  const fillPercentage = Math.round((currentRating % 1) * 100);

  // create dynamic gradient
  starsMarkup += `
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${fillPercentage}%" stop-color="#eea111" /> <stop offset="${fillPercentage}%" stop-color="#e0e0e0" /> </linearGradient>
      </defs>
    </svg>
  `;

  for (let i = 1; i <= maxStars; i++) {
    let starFill;

    if (i <= Math.floor(currentRating)) {
      // if star less or equal whole part of rating, it is colored orange
      starFill = 'rgb(238, 161, 12)';
    } else if (i === Math.ceil(currentRating) && currentRating % 1 !== 0) {
      // if this is next star and there is a part, apply gradient based on id
      starFill = 'url(#partial-star-gradient)';
    } else {
      // all other stars are gray
      starFill = 'rgba(244, 244, 244, 0.2)';
    }

    starsMarkup += `
      <svg width="18" height="18" aria-hidden="true" style="fill: ${starFill};">
        <use href="${sprite}#icon-add-rating-star"></use>
      </svg>
    `;
  }

  return starsMarkup;
}

// close modal by click on backdrop or close button
function onClickCloseModal(event) {
  if (
    event.target.matches('[data-modal-backdrop]') ||
    event.target.closest('[data-modal-close]')
  ) {
    closeModal();
  }
}

function onClickToggleFavorite() {
  if (!favoriteBtn || !currentExercise) return;

  const textSpan = favoriteBtn.querySelector('span');
  const svgUse = favoriteBtn.querySelector('use');

  if (favorite) {
    removeFavorite(currentExercise._id);
    favorite = false;
    textSpan.textContent = 'Add to favorites';
    svgUse.setAttribute('href', `${sprite}#icon-heart`);
  } else {
    addFavorite(currentExercise._id);
    favorite = true;
    textSpan.textContent = 'Remove from favorites';
    svgUse.setAttribute('href', `${sprite}#icon-trash`);
  }
}

function onEscPress(event) {
  if (event.key !== 'Escape') return;

  const ratingModal = document.querySelector('[data-modal-rating]');

  // on Escape close only rating modal if it is opened
  if (ratingModal && !ratingModal.classList.contains('is-hidden')) {
    const ratingForm = document.querySelector('.rating-form');
    if (ratingForm) ratingForm.reset();
    
    ratingModal.classList.add('is-hidden');
    
    if (backdropExercise) backdropExercise.classList.remove('is-hidden');
    return;
  }

  // close exercise modal, if it is opened and has content
  if (modalRoot.innerHTML !== '') {
    closeModal();
  }
}

export function closeModal() {
  if (!modalRoot) return;

  // remove event listeners before cleaning html
  if (favoriteBtn) {
    favoriteBtn.removeEventListener('click', onClickToggleFavorite);
    favoriteBtn = null;
  }

  if (ratingBtn) {
    ratingBtn.removeEventListener('click', onClickOpenRatingModal)
    ratingBtn = null;
  }

  modalRoot.innerHTML = '';
  currentExercise = null;
  backdropExercise = null;
  favorite = false;

  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscPress);
  modalRoot.removeEventListener('click', onClickCloseModal);
}
