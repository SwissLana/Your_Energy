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

// 1. Основна функція для генерації однієї картки (універсальна)
export function createExerciseCardMarkup(exercise, options = {}) {
  const isFavorite =
    typeof options === 'boolean' ? options : (options?.isFavorite ?? false);
  const { _id, name, rating, burnedCalories, bodyPart, target } = exercise;

  // Перевіряємо статус: для "обраного" рендеримо кошик, для звичайного — рейтинг
  const topBadgeAction = isFavorite
    ? `
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${_id}"
          aria-label="Remove exercise from favorites"
        >
          <svg class="trash-icon" width="16" height="16">
            <use href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </button>
      `
    : (() => {
        // Оптимізація: рейтинг обчислюється тільки для звичайних карток
        const formattedRating = Number(rating).toFixed(1);
        return `
        <span class="exercise-card-rating">
          <span class="rating-value">${formattedRating}</span>
          <svg class="star-icon" width="14" height="14">
            <use href="./img/sprite.svg#icon-card-rating-star"></use>
          </svg>
        </span>
      `;
      })();

  return `
    <li class="exercise-card" data-id="${_id}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          ${topBadgeAction}
        </div>

        <button
          class="exercise-start-btn"
          type="button"
          data-exercise-start
          data-id="${_id}"
          aria-label="Open exercise details"
        >
          Start
          <svg class="arrow-icon" width="16" height="16">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="24" height="24">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${name}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item">Burned calories: <span class="info-value">${burnedCalories} / 3 min</span></li>
        <li class="info-item">Body part: <span class="info-value">${bodyPart}</span></li>
        <li class="info-item">Target: <span class="info-value">${target}</span></li>
      </ul>
    </li>
  `;
}

// 2. Генерація списку звичайних карток
export function createExercisesMarkup(exercises) {
  return exercises
    .map(exercise => createExerciseCardMarkup(exercise, false))
    .join('');
}

// 3. Генерація однієї картки для сторінки обраного
export function createFavoriteExerciseCardMarkup(exercise) {
  return createExerciseCardMarkup(exercise, true);
}

// 4. Генерація списку обраних карток
export function createFavoriteExercisesMarkup(exercises) {
  return exercises.map(createFavoriteExerciseCardMarkup).join('');
}
