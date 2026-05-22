import iziToast from 'izitoast';
import { sendRating } from '../api/exercises-api';
import {
  isValidEmail,
  hasUserAlreadyRated,
  saveRatedExercise,
} from '../utils/helpers';
import { openExerciseModal } from './exercise-modal';

const ratingModal = document.querySelector('[data-modal-rating]');
const ratingForm = document.querySelector('.rating-form');
const ratingCloseBtn = document.querySelector('[data-rating-close]');

let currentExercise = null;

export function initRatingModal() {
  if (!ratingModal || !ratingForm) return;

  ratingCloseBtn.addEventListener('click', closeRatingModal);
  ratingModal.addEventListener('click', onBackdropClick);
  ratingForm.addEventListener('submit', onRatingFormSubmit);
}

export function openRatingModal(exercise) {
  currentExercise = exercise;
  ratingModal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function closeRatingModal() {
  ratingForm.reset();
  ratingModal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');

  // open modal window with exercise
  openExerciseModal(currentExercise);
}

function onBackdropClick(event) {
  if (event.target === ratingModal) {
    closeRatingModal();
  }
}

async function onRatingFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const rating = formData.get('rating');
  const email = formData.get('email');
  const comment = formData.get('comment');

  if (!rating) {
    iziToast.warning({
      message: 'Please select stars.',
      position: 'topCenter',
    });
    return;
  }

  if (!email.trim() || !comment.trim()) {
    iziToast.warning({
      message: 'Please fill out all fields.',
      position: 'topCenter',
    });
    return;
  }

  // validate email
  if (!isValidEmail(email)) {
    iziToast.warning({
      message: 'Please enter a valid email address.',
      position: 'topCenter',
    });
    return;
  }

  // check for rating duplicate
  if (hasUserAlreadyRated(currentExercise._id, email)) {
    iziToast.error({
      message: 'You have already rated this exercise!',
      position: 'topCenter',
    });
    return;
  }

  const requestBody = {
    rate: Number(rating),
    email: email,
    review: comment,
  };

  try {
    // send rating update request to server
    await sendRating(currentExercise._id, requestBody);
    saveRatedExercise(currentExercise._id, email);

    iziToast.success({
      message: 'Thank you for your review!',
      position: 'topCenter',
    });
    closeRatingModal();
  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'Something went wrong.' });
  }
}
