import { fetchFilters, fetchExercises } from '../api/exercises-api';
import {
  FILTERS,
  FILTERS_PER_PAGE,
  EXERCISES_PER_PAGE,
} from '../utils/constants';
import {
  createCategoriesMarkup,
  createExercisesMarkup,
} from '../utils/render-functions';
import {
  createPaginationMarkup,
  getClickedPage,
} from '../components/pagination';
import { showLoader, hideLoader } from '../utils/loader';
import { initExerciseModal } from '../components/modal';
import { initQuote } from '../components/quote';
import { initSubscription } from '../components/subscription';
import { initScrollUp } from '../components/scroll-up';
import { initHeader } from '../components/header';

const refs = {
  filters: document.querySelector('[data-filters]'),
  categoriesList: document.querySelector('[data-categories-list]'),
  exercisesList: document.querySelector('[data-exercises-list]'),
  pagination: document.querySelector('[data-pagination]'),
  searchForm: document.querySelector('[data-search-form]'),
  selectedCategory: document.querySelector('[data-selected-category]'),
};

const state = {
  filter: FILTERS.MUSCLES,
  category: '',
  page: 1,
  keyword: '',
  mode: 'categories',
};

initHeader();
initQuote();
initSubscription();
initScrollUp();
initExerciseModal();

refs.filters.addEventListener('click', onFilterClick);
refs.categoriesList.addEventListener('click', onCategoryClick);
refs.pagination.addEventListener('click', onPaginationClick);
refs.searchForm.addEventListener('submit', onSearchSubmit);

updateSelectedPath();

loadCategories();

async function loadCategories() {
  try {
    showLoader();

    state.mode = 'categories';
    refs.searchForm.classList.add('is-hidden');
    updateSelectedPath();
    refs.exercisesList.innerHTML = '';

    const data = await fetchFilters(state.filter, state.page, FILTERS_PER_PAGE);

    refs.categoriesList.innerHTML = createCategoriesMarkup(data.results);
    refs.pagination.innerHTML = createPaginationMarkup(
      data.totalPages,
      state.page
    );
  } catch {
    refs.categoriesList.innerHTML = '<li>Categories not found.</li>';
    refs.pagination.innerHTML = '';
  } finally {
    hideLoader();
  }
}

async function loadExercises() {
  try {
    showLoader();

    state.mode = 'exercises';
    refs.searchForm.classList.remove('is-hidden');
    refs.categoriesList.innerHTML = '';

    const params = {
      page: state.page,
      limit: EXERCISES_PER_PAGE,
    };

    if (state.keyword) {
      params.keyword = state.keyword;
    }

    const categoryValue = state.category.toLowerCase();

    if (state.filter === FILTERS.MUSCLES) {
      params.muscles = categoryValue;
    }

    if (state.filter === FILTERS.BODY_PARTS) {
      params.bodypart = categoryValue;
    }

    if (state.filter === FILTERS.EQUIPMENT) {
      params.equipment = categoryValue;
    }

    const data = await fetchExercises(params);

    updateSelectedPath();

    if (!data.results.length) {
      refs.exercisesList.innerHTML = '<li>Exercises not found.</li>';
      refs.pagination.innerHTML = '';
      return;
    }

    refs.exercisesList.innerHTML = createExercisesMarkup(data.results);
    refs.pagination.innerHTML = createPaginationMarkup(
      data.totalPages,
      state.page
    );
  } catch {
    refs.exercisesList.innerHTML = '<li>Exercises not found.</li>';
    refs.pagination.innerHTML = '';
  } finally {
    hideLoader();
  }
}

function onFilterClick(event) {
  const button = event.target.closest('[data-filter]');
  if (!button) return;

  refs.filters
    .querySelectorAll('[data-filter]')
    .forEach(btn => btn.classList.remove('is-active'));

  button.classList.add('is-active');

  state.filter = button.dataset.filter;
  state.category = '';
  state.keyword = '';
  state.page = 1;

  refs.searchForm.reset();
  loadCategories();
}

function onCategoryClick(event) {
  const card = event.target.closest('[data-name]');
  if (!card) return;

  state.category = card.dataset.name;
  state.keyword = '';
  state.page = 1;

  refs.searchForm.reset();
  loadExercises();
}

function onPaginationClick(event) {
  const page = getClickedPage(event);
  if (!page) return;

  state.page = page;

  if (state.mode === 'categories') {
    loadCategories();
  } else {
    loadExercises();
  }
}

function onSearchSubmit(event) {
  event.preventDefault();

  state.keyword = event.currentTarget.elements.search.value.trim();
  state.page = 1;

  loadExercises();
}

function updateSelectedPath() {
  refs.selectedCategory.textContent = `/ ${state.filter}`;
}
