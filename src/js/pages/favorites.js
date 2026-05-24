import { getFavorites, removeFavorite } from '../utils/storage';
import { fetchExerciseById } from '../api/exercises-api';
import { createFavoriteExercisesMarkup } from '../utils/render-functions';
import { showLoader, hideLoader } from '../utils/loader';
import { initExerciseModal } from '../components/exercise-modal';
import { initRatingModal } from '../components/rating-modal';
import { initQuote } from '../components/quote';
import { initScrollUp } from '../components/scroll-up';
import { initHeader } from '../components/header';
import { createPaginationMarkup, getClickedPage } from '../components/pagination';

const refs = {
  favoritesList: document.querySelector('[data-favorites-list]'),
  emptyMessage: document.querySelector('[data-empty-favorites]'),
  pagination: document.querySelector('[data-pagination]'),
};

// define number of cards on page based on screen size
const getFavoritesLimit = () => (window.innerWidth < 768 ? 8 : 10);

// create state object to save page
const state = {
  page: 1,
  get perPage() {
    return getFavoritesLimit();
  },
};

initHeader();
initQuote();
initScrollUp();
initExerciseModal();
initRatingModal();

renderFavorites();

refs.favoritesList?.addEventListener('click', onRemoveFavoriteClick);
refs.pagination?.addEventListener('click', onPaginationClick);
window.addEventListener('resize', debounce(onWindowResize, 250));

async function renderFavorites() {
  const favoriteIds = getFavorites();

  if (!favoriteIds.length) {
    refs.favoritesList.innerHTML = '';
    refs.emptyMessage.classList.remove('is-hidden');
    if (refs.pagination) refs.pagination.innerHTML = '';
    return;
  }

  refs.emptyMessage.classList.add('is-hidden');

  const totalPages = Math.ceil(favoriteIds.length / state.perPage);
  
  if (state.page > totalPages) {
    state.page = totalPages || 1;
  }

  // define part of the exercise IDs necessary for current page
  const startIndex = (state.page - 1) * state.perPage;
  const endIndex = startIndex + state.perPage;
  const idsForCurrentPage = favoriteIds.slice(startIndex, endIndex);

  try {
    showLoader();

    const results = await Promise.allSettled(
      idsForCurrentPage.map(id => fetchExerciseById(id))
    );

    const exercises = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

    if (!exercises.length) {
      refs.favoritesList.innerHTML = '';
      refs.emptyMessage.classList.remove('is-hidden');
      if (refs.pagination) refs.pagination.innerHTML = '';
      return;
    }

    refs.favoritesList.innerHTML = createFavoriteExercisesMarkup(exercises);

    // create pagination markup
    if (refs.pagination) {
      refs.pagination.innerHTML = createPaginationMarkup(totalPages, state.page);
    }
  } catch {
    refs.favoritesList.innerHTML = '';
    if (refs.pagination) refs.pagination.innerHTML = '';
    refs.emptyMessage.classList.remove('is-hidden');
  } finally {
    hideLoader();
  }
}

function onPaginationClick(event) {
  const clickedPage = getClickedPage(event);
  if (!clickedPage) return;

  state.page = clickedPage;
  renderFavorites();

  // scroll to the Favorites title
  const favoritesTitle = document.querySelector('.favorites-title') || refs.favoritesList;
  if (favoritesTitle) {
    favoritesTitle.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

function onRemoveFavoriteClick(event) {
  const button = event.target.closest('[data-favorite-remove]');

  if (!button) return;

  removeFavorite(button.dataset.id);

  renderFavorites();
}

// listen to modal to evoke favorite cards list rerender when toggle add/remove favorites button
document.addEventListener('favoritesUpdated', renderFavorites);

// control cards quantity when change screen width
function onWindowResize() {
  renderFavorites();
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}