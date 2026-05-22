import { getFavorites, removeFavorite } from '../utils/storage';
import { fetchExerciseById } from '../api/exercises-api';

import { createFavoriteExercisesMarkup } from '../utils/render-functions';

import { showLoader, hideLoader } from '../utils/loader';
import { initExerciseModal } from '../components/modal';
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

    const limit = window.innerWidth >= 1168 ? 6 : 10;

    // 2. Обрізаємо масив відповідно до знайденого ліміту
    const limitedFavorites = favorites.slice(0, limit);

    if (!exercises.length) {
      refs.favoritesList.innerHTML = '';
      refs.emptyMessage.classList.remove('is-hidden');
      return;
    }

    refs.favoritesList.innerHTML =
      createFavoriteExercisesMarkup(limitedFavorites);
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

// Дозволяє сторінці миттєво підлаштовувати кількість карток при зміні розміру вікна
window.addEventListener('resize', renderFavorites);
