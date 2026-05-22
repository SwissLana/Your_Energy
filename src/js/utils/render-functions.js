export function createCategoryCardMarkup({ name, filter, imgURL }) {
  return `
    <li class="category-card" data-name="${name}" data-filter="${filter}">
      <button class="category-card-btn" type="button">
        <img
          class="category-card-img"
          src="${imgURL}"
          alt="${name}"
          loading="lazy"
        />
        <div class="category-card-overlay">
          <h3 class="category-card-title">${name}</h3>
          <p class="category-card-text">${filter}</p>
        </div>
      </button>
    </li>
  `;
}

export function createCategoriesMarkup(categories) {
  return categories.map(createCategoryCardMarkup).join('');
}

// Вспомогательная функция (капитализация)
function capitalizeFirst(str) {
  return typeof str === 'string' && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : str;
}

// 1. Универсальная функция для одной карточки
export function createExerciseCardMarkup(exercise, options = {}) {
  const isFavorite =
    typeof options === 'boolean' ? options : (options?.isFavorite ?? false);

  // Безопасное извлечение данных с дефолтными значениями (Плюс Варианта 1)
  const {
    _id,
    name = exercise.name || 'Unknown Exercise',
    rating = exercise.rating || 0,
    bodyPart = exercise.bodyPart || exercise.bodypart || 'No data',
    target = exercise.target || 'No data',
    burnedCalories = exercise.burnedCalories || exercise.burned_calories || 0,
  } = exercise;

  // Форматирование значений перед выводом
  const bodyPartText = capitalizeFirst(bodyPart);
  const targetText = capitalizeFirst(target);
  const burnedText = `${burnedCalories} / 3 min`;

  // Переключатель верхней панели: Корзина vs Рейтинг
  const topBadgeAction = isFavorite
    ? `
        <button class="favorite-remove-btn" type="button" data-id="${_id}" data-favorite-remove aria-label="Remove exercise from favorites">
          <svg class="trash-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </button>
      `
    : `
        <span class="exercise-card-rating">
          <span class="rating-value">${Number(rating).toFixed(1)}</span>
          <svg class="star-icon" width="14" height="14" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-card-rating-star"></use>
          </svg>
        </span>
      `;

  // Единый HTML-шаблон (BEM-классы подгоняются через модификатор, если нужен разный фон)
  return `
    <li class="exercise-card ${isFavorite ? 'exercise-card--favorite' : ''}" data-id="${_id}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          ${topBadgeAction}
        </div>

        <button class="exercise-start-btn" type="button" data-exercise-start data-id="${_id}" aria-label="Open exercise details">
          Start
          <svg class="arrow-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${name}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item" title="Burned calories: ${burnedText}">
          <span class="card-info-label">Burned calories:</span>
          <span class="info-value">${burnedText}</span>
        </li>
        <li class="info-item" title="Body part: ${bodyPartText}">
          <span class="card-info-label">Body part:</span>
          <span class="info-value">${bodyPartText}</span>
        </li>
        <li class="info-item" title="Target: ${targetText}">
          <span class="card-info-label">Target:</span>
          <span class="info-value">${targetText}</span>
        </li>
      </ul>
    </li>
  `;
}

// 2. Генерация списка обычных карточек
export function createExercisesMarkup(exercises) {
  return exercises
    .map(exercise => createExerciseCardMarkup(exercise, false))
    .join('');
}

// 3. Генерация списка избранных карточек
export function createFavoriteExercisesMarkup(exercises) {
  return exercises
    .map(exercise => createExerciseCardMarkup(exercise, true))
    .join('');
}
