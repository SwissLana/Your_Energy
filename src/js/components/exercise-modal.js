import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import sprite from '../../img/sprite.svg';
import { showLoader, hideLoader } from '../utils/loader';
import { fetchExerciseById } from '../api/exercises-api';
import { createExerciseModalMarkup } from '../utils/render-functions';
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
    showLoader();

    currentExercise = await fetchExerciseById(button.dataset.id);
    openExerciseModal(currentExercise);
  } catch (error) {
    console.error('Failed to load exercise:', error);
    iziToast.error({
      message: 'Failed to load exercise details.',
      position: 'topCenter',
    });
  } finally {
    hideLoader();
  }
}

export function openExerciseModal(exercise) {
  if (!modalRoot || !exercise) return;

  // show modal if it is already rendered but hidden
  if (backdropExercise) {
    backdropExercise.classList.remove('is-hidden');
    return;
  }

  favorite = isFavorite(exercise._id);

  // generate mark up if it is first opening
  modalRoot.innerHTML = createExerciseModalMarkup(exercise);

  backdropExercise = modalRoot.querySelector('[data-modal-backdrop]');

  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscPress);
  modalRoot.addEventListener('click', onClickCloseModal);

  // add event listeners to buttons
  favoriteBtn = modalRoot.querySelector('[data-favorite-toggle]');
  if (favoriteBtn) favoriteBtn.addEventListener('click', onClickToggleFavorite);

  ratingBtn = modalRoot.querySelector('[data-give-rating]');
  if (ratingBtn) ratingBtn.addEventListener('click', onClickOpenRatingModal);
}

function onClickOpenRatingModal() {
  // hide exercise modal window
  if (backdropExercise) {
    backdropExercise.classList.add('is-hidden');
  }

  openRatingModal(currentExercise);
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

  // inform favorites page that favorites list changed
  document.dispatchEvent(new CustomEvent('favoritesUpdated'));
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
    ratingBtn.removeEventListener('click', onClickOpenRatingModal);
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
