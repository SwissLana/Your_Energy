import { getFavorites, removeFavorite } from '../utils/storage';
import { fetchExerciseById } from '../api/exercises-api';
import { createFavoriteExercisesMarkup } from '../utils/render-functions';
import { showLoader, hideLoader } from '../utils/loader';
import { initExerciseModal } from '../components/exercise-modal';
import { initRatingModal } from '../components/rating-modal';
import { initQuote } from '../components/quote';
import { initScrollUp } from '../components/scroll-up';
import { initHeader } from '../components/header';

const refs = {
  favoritesList: document.querySelector('[data-favorites-list]'),
  emptyMessage: document.querySelector('[data-empty-favorites]'),
};

initHeader();
initQuote();
initScrollUp();
initExerciseModal();
initRatingModal();

renderFavorites();

refs.favoritesList?.addEventListener('click', onRemoveFavoriteClick);

async function renderFavorites() {
  const favoriteIds = getFavorites();

  if (!favoriteIds.length) {
    refs.favoritesList.innerHTML = '';
    refs.emptyMessage.classList.remove('is-hidden');
    return;
  }

  refs.emptyMessage.classList.add('is-hidden');

  try {
    showLoader();

    const results = await Promise.allSettled(
      favoriteIds.map(id => fetchExerciseById(id))
    );

    const exercises = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

    if (!exercises.length) {
      refs.favoritesList.innerHTML = '';
      refs.emptyMessage.classList.remove('is-hidden');
      return;
    }

    refs.favoritesList.innerHTML = createFavoriteExercisesMarkup(exercises);
  } catch {
    refs.favoritesList.innerHTML = '';
    refs.emptyMessage.classList.remove('is-hidden');
  } finally {
    hideLoader();
  }
}

function onRemoveFavoriteClick(event) {
  const button = event.target.closest('[data-favorite-remove]');

  if (!button) return;

  removeFavorite(button.dataset.id);

  const card = button.closest('.favorite-card');
  card?.remove();

  if (!getFavorites().length) {
    refs.favoritesList.innerHTML = '';
    refs.emptyMessage.classList.remove('is-hidden');
  }
}
