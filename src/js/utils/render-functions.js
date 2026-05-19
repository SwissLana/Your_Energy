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

export function createExerciseCardMarkup(exercise) {
  const { _id, name, rating, burnedCalories, bodyPart, target } = exercise;

  // Форматуємо рейтинг, щоб завжди було одне число після коми (наприклад, 4 -> 4.0)
  const formattedRating = Number(rating).toFixed(1);

  return `
    <li class="exercise-card" data-id="${_id}">
      <div class="exercise-card-top">
        <div class="exercise-card-badge-rating">
          <span class="exercise-card-badge">WORKOUT</span>
          <span class="exercise-card-rating">
            <span class="rating-value">${formattedRating}</span>
            <svg class="star-icon" width="14" height="14">
              <use href="./img/icons.svg#icon-star"></use>
            </svg>
          </span>
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
            <use href="./img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="24" height="24">
            <use href="./img/icons.svg#icon-run"></use>
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

export function createExercisesMarkup(exercises) {
  return exercises.map(createExerciseCardMarkup).join('');
}

export function createFavoriteExerciseCardMarkup(exercise) {
  return `
    ${createExerciseCardMarkup(exercise).replace(
      '</li>',
      `
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${exercise._id}"
          aria-label="Remove exercise from favorites"
        >
          🗑
        </button>
      </li>`
    )}
  `;
}

export function createFavoriteExercisesMarkup(exercises) {
  return exercises.map(createFavoriteExerciseCardMarkup).join('');
}
