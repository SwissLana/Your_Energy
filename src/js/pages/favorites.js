import { getFavorites, removeFavorite } from '../utils/storage';
import { fetchExerciseById } from '../api/exercises-api';
import { createExerciseCardMarkup } from '../utils/render-functions';
import { showLoader, hideLoader } from '../utils/loader';
import { initExerciseModal } from '../components/modal';
import { initQuote } from '../components/quote';
import { initScrollUp } from '../components/scroll-up';
import { initHeader } from '../components/header';
import {
  createPaginationMarkup,
  getClickedPage,
} from '../components/pagination';

const refs = {
  favoritesList: document.querySelector('[data-favorites-list]'),
  emptyMessage: document.querySelector('[data-empty-favorites]'),
  pagination:
    document.querySelector('[data-pagination]') ||
    document.querySelector('[data-favorites-pagination]') ||
    document.querySelector('.pagination-container'),
};

const state = {
  page: 1,
};

initHeader();
initQuote();
initScrollUp();
initExerciseModal();

renderFavorites();

refs.favoritesList?.addEventListener('click', onRemoveFavoriteClick);
// Слушатель вешаем безопасно, используя опциональную цепочку ?.
refs.pagination?.addEventListener('click', onPaginationClick);

window.addEventListener('resize', () => {
  state.page = 1;
  renderFavorites();
});

async function renderFavorites() {
  const favoriteIds = getFavorites();

  if (!favoriteIds || favoriteIds.length === 0) {
    if (refs.favoritesList) refs.favoritesList.innerHTML = '';
    refs.emptyMessage?.classList.remove('is-hidden');
    if (refs.pagination) refs.pagination.innerHTML = '';
    return;
  }

  try {
    showLoader();

    const results = await Promise.allSettled(
      favoriteIds.map(id => fetchExerciseById(id))
    );

    const exercises = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

    if (!exercises.length) {
      if (refs.favoritesList) refs.favoritesList.innerHTML = '';
      refs.emptyMessage?.classList.remove('is-hidden');
      if (refs.pagination) refs.pagination.innerHTML = '';
      return;
    }

    refs.emptyMessage?.classList.add('is-hidden');

    let limit = 8; // По умолчанию для мобильных (Меньше 768px)

    if (window.innerWidth >= 1440) {
      limit = 6; // Для десктопов (От 1440px и выше)
    } else if (window.innerWidth >= 768) {
      limit = 10; // Для планшетов (От 768px до 1439px)
    }

    const totalPages = Math.ceil(exercises.length / limit);

    if (state.page > totalPages) {
      state.page = totalPages || 1;
    }

    const startIndex = (state.page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedExercises = exercises.slice(startIndex, endIndex);

    // Безопасный рендер карточек
    if (refs.favoritesList) {
      refs.favoritesList.innerHTML = paginatedExercises
        .map(exercise => createExerciseCardMarkup(exercise, true))
        .join('');
    }

    // БЕЗОПАСНЫЙ рендер пагинации с проверкой существования контейнера
    if (refs.pagination) {
      if (totalPages > 1) {
        refs.pagination.innerHTML = createPaginationMarkup(
          totalPages,
          state.page
        );
      } else {
        refs.pagination.innerHTML = '';
      }
    }
  } catch (error) {
    console.error(error);
    if (refs.favoritesList) refs.favoritesList.innerHTML = '';
    refs.emptyMessage?.classList.remove('is-hidden');
  } finally {
    hideLoader();
  }
}

function onPaginationClick(event) {
  const page = getClickedPage(event);
  if (!page) return;

  state.page = page;
  renderFavorites();
  refs.favoritesList?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function onRemoveFavoriteClick(event) {
  const button = event.target.closest('[data-favorite-remove]');
  if (!button) return;

  removeFavorite(button.dataset.id);
  renderFavorites();
}
