import { getFavorites, removeFavorite } from '../utils/storage';

import { createFavoriteExercisesMarkup } from '../utils/render-functions';

import { initExerciseModal } from '../components/modal';
import { initQuote } from '../components/quote';
import { initSubscription } from '../components/subscription';
import { initScrollUp } from '../components/scroll-up';
import { initHeader } from '../components/header';

const refs = {
  favoritesList: document.querySelector('[data-favorites-list]'),
  emptyMessage: document.querySelector('[data-empty-favorites]'),
};

initHeader();
initQuote();
initSubscription();
initScrollUp();
initExerciseModal();

renderFavorites();

refs.favoritesList?.addEventListener('click', onRemoveFavoriteClick);

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    refs.favoritesList.innerHTML = '';
    refs.emptyMessage.classList.remove('is-hidden');
    return;
  }

  refs.emptyMessage.classList.add('is-hidden');

  refs.favoritesList.innerHTML = createFavoriteExercisesMarkup(favorites);
}

function onRemoveFavoriteClick(event) {
  const button = event.target.closest('.favorite-remove-btn');

  if (!button) return;

  removeFavorite(button.dataset.id);
  renderFavorites();
}
