import iziToast from 'izitoast';

import { fetchExerciseById } from '../api/exercises-api';
import { addFavorite, removeFavorite, isFavorite } from '../utils/storage';

const modalRoot = document.querySelector('[data-modal-root]');

let currentExercise = null;
let favorite = false;
let favoriteBtn = null;

export function initExerciseModal() {
  document.addEventListener('click', onExerciseStartClick);
}

async function onExerciseStartClick(event) {
  const button = event.target.closest('[data-exercise-start]');

  if (!button) return;

  try {
    currentExercise = await fetchExerciseById(button.dataset.id);
    openExerciseModal(currentExercise);
  } catch {
    iziToast.error({
      message: 'Failed to load exercise details.',
      position: 'topRight',
    });
  }
}

function openExerciseModal(exercise) {
  if (!modalRoot) return;

  modalRoot.innerHTML = createExerciseModalMarkup(exercise);

  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscPress);
  modalRoot.addEventListener('click', onClickCloseModal);

  favoriteBtn = modalRoot.querySelector('[data-favorite-toggle]');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', onClickToggleFavorite);
  }
  
}

function createExerciseModalMarkup(exercise) {
  favorite = isFavorite(exercise._id);

  const starsMarkup = createRatingStarsMarkup(exercise.rating);

  // dynamically change button functionality display
  const btnText = favorite ? 'Remove from favorites' : 'Add to favorites';  
  const btnIconId = favorite ? 'icon-trash' : 'icon-heart';

  return `
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
                <span class="rating-value">${exercise.rating ? Math.round(exercise.rating).toFixed(1) : '0.0'}</span>
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

            <button
              class="favorite-modal-btn"
              type="button"
              data-favorite-toggle
            >
              <span>${btnText}</span>
              <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                <use href="#${btnIconId}"></use>
              </svg>
            </button>           
          </div>          
        </div>           
      </div>
    </div>
  `;
}

function createRatingStarsMarkup(rating) {
  const maxStars = 5;
  // round up rating to whole number
  const filledStarsCount = Math.round(rating || 0);

  let starsMarkup = '';

  for (let i = 1; i <= maxStars; i++) {
    // color star if rating equal or bigger than current index
    const isFilled = i <= filledStarsCount;
    const starClass = isFilled ? 'star-icon filled' : 'star-icon empty';

    starsMarkup += `
      <svg class="${starClass}" width="18" height="18">
        <use href="#icon-star"></use>
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
    svgUse.setAttribute('href', '#icon-heart');
  } else {
    addFavorite(currentExercise._id);
    favorite = true;
    textSpan.textContent = 'Remove from favorites';
    svgUse.setAttribute('href', '#icon-trash');
  }
  
}

function onEscPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}


export function closeModal() {
  if (!modalRoot) return;

  // remove event listener before cleaning html
  if (favoriteBtn) {
    favoriteBtn.removeEventListener('click', onClickToggleFavorite);
    favoriteBtn = null;
  }

  modalRoot.innerHTML = '';
  currentExercise = null;
  favorite = false;

  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscPress);
  modalRoot.removeEventListener('click', onClickCloseModal);
}
