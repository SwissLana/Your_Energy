import iziToast from 'izitoast';

import { fetchExerciseById } from '../api/exercises-api';
import { addFavorite, removeFavorite, isFavorite } from '../utils/storage';

const modalRoot = document.querySelector('[data-modal-root]');

let currentExercise = null;

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
  modalRoot.addEventListener('click', onModalClick);
}

function createExerciseModalMarkup(exercise) {
  const favorite = isFavorite(exercise._id);

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

        <div class="exercise-modal-media">
          ${
            exercise.gifUrl
              ? `<img src="${exercise.gifUrl}" alt="${exercise.name}" loading="lazy" />`
              : '<p>Video is not available.</p>'
          }
        </div>

        <div class="exercise-modal-content">
          <h2 class="exercise-modal-title">${exercise.name}</h2>

          <ul class="exercise-modal-info">
            <li>Rating: <span>${exercise.rating ?? '0.0'} ★</span></li>
            <li>Target: <span>${exercise.target}</span></li>
            <li>Body part: <span>${exercise.bodyPart}</span></li>
            <li>Equipment: <span>${exercise.equipment}</span></li>
            <li>Popularity: <span>${exercise.popularity}</span></li>
            <li>Burned calories: <span>${exercise.burnedCalories} / 3 min</span></li>
          </ul>

          <p class="exercise-modal-description">
            ${exercise.description || 'Description is not available.'}
          </p>

          <button
            class="favorite-modal-btn"
            type="button"
            data-favorite-toggle
          >
            ${favorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function onModalClick(event) {
  if (
    event.target.matches('[data-modal-backdrop]') ||
    event.target.matches('[data-modal-close]')
  ) {
    closeModal();
    return;
  }

  const favoriteBtn = event.target.closest('[data-favorite-toggle]');

  if (!favoriteBtn || !currentExercise) return;

  if (isFavorite(currentExercise._id)) {
    removeFavorite(currentExercise._id);
    favoriteBtn.textContent = 'Add to favorites';
  } else {
    addFavorite(currentExercise);
    favoriteBtn.textContent = 'Remove from favorites';
  }
}

function onEscPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

export function closeModal() {
  if (!modalRoot) return;

  modalRoot.innerHTML = '';
  currentExercise = null;

  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscPress);
  modalRoot.removeEventListener('click', onModalClick);
}
