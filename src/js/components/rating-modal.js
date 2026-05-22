import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { sendRating } from '../api/exercises-api';
import {
  isValidEmail,
  hasUserAlreadyRated,
  saveRatedExercise,
} from '../utils/helpers';
import { backdropExercise } from './exercise-modal';

const ratingModal = document.querySelector('[data-modal-rating]');
const ratingForm = document.querySelector('.rating-form');
const ratingCloseBtn = document.querySelector('[data-rating-close]');
const ratingValueText = document.querySelector('.live-rating-value');
const starInputs = document.querySelectorAll(
  '.stars-radio-group>input[type="radio"]'
);

let currentExercise = null;

export function initRatingModal() {
  if (!ratingModal || !ratingForm) return;

  ratingCloseBtn.addEventListener('click', closeRatingModal);
  ratingModal.addEventListener('click', onBackdropClick);
  ratingForm.addEventListener('submit', onRatingFormSubmit);
  ratingForm.addEventListener('change', handleRatingChange);
}

export function openRatingModal(exercise) {
  currentExercise = exercise;
  ratingModal.classList.remove('is-hidden');
}

function closeRatingModal() {
  if (ratingValueText) {
    ratingValueText.textContent = '0.0';
  }
  ratingForm.reset();
  ratingModal.classList.add('is-hidden');

  // open modal window with exercise
  if (backdropExercise) {
    backdropExercise.classList.remove('is-hidden')
  }
}

function onBackdropClick(event) {
  if (event.target === ratingModal) {
    closeRatingModal();
  }
}

function handleRatingChange(event) {
  if (event.target.name !== 'rating') {
    return;
  }
  const selectedRating = event.target.value;
  ratingValueText.textContent = `${selectedRating}.0`;
}

async function onRatingFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const rating = formData.get('rating');
  const email = formData.get('email');
  const comment = formData.get('comment');

  if (!rating) {
    iziToast.warning({
      message: 'Please select stars!',
      position: 'topCenter',
    });
    return;
  }

  if (!email.trim() || !comment.trim()) {
    iziToast.warning({
      message: 'Please fill out all the fields!',
      position: 'topCenter',
    });
    return;
  }

  // validate email
  if (!isValidEmail(email)) {
    iziToast.warning({
      message: 'Please enter a valid email address!',
      position: 'topCenter',
    });
    return;
  }

  // check for user review, if exists close modal
  if (hasUserAlreadyRated(currentExercise._id, email)) {
    iziToast.error({
      message: 'You have already rated this exercise!',
      position: 'topCenter',
    });
    closeRatingModal();
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
    iziToast.error({ message: 'Something went wrong.', position: 'topCenter' });
  }
}
