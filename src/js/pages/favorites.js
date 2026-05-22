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

  // 1. Визначаємо ліміт карток залежно від ширини екрана користувача
  // Якщо екран десктопний (від 1168px), ставимо ліміт 6, інакше (таблет/мобільний) — 10
  const limit = window.innerWidth >= 1168 ? 6 : 10;

  // 2. Обрізаємо масив відповідно до знайденого ліміту
  const limitedFavorites = favorites.slice(0, limit);
  refs.favoritesList.innerHTML =
    createFavoriteExercisesMarkup(limitedFavorites);
}

function onRemoveFavoriteClick(event) {
  const button = event.target.closest('.favorite-remove-btn');

  if (!button) return;

  removeFavorite(button.dataset.id);
  renderFavorites();
}

// Дозволяє сторінці миттєво підлаштовувати кількість карток при зміні розміру вікна
window.addEventListener('resize', renderFavorites);
