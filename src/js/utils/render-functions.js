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
              <use href="./img/sprite.svg#icon-card-rating-star"></use>
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

export function createExercisesMarkup(exercises) {
  return exercises.map(createExerciseCardMarkup).join('');
}

function capitalizeFirst(str) {
  return typeof str === 'string' && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : str;
}

export function createFavoriteCardMarkup(exercise) {
  const { _id, name, burnedCalories, bodyPart, target } = exercise;

  const bodyPartText = capitalizeFirst(bodyPart);
  const targetText = capitalizeFirst(target);
  const burnedText = `${burnedCalories} / 3 min`;

  return `
    <li class="favorite-card" data-id="${_id}">
      <div class="favorite-card-top">
        <div class="favorite-card-badges">
          <span class="favorite-card-badge">WORKOUT</span>
          <button
            class="favorite-card-remove-btn"
            type="button"
            data-favorite-remove
            data-id="${_id}"
            aria-label="Remove exercise from favorites"
          >
            <svg class="favorite-card-trash-icon" width="16" height="16">
              <use href="./img/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>

        <button
          class="favorite-card-start-btn"
          type="button"
          data-exercise-start
          data-id="${_id}"
          aria-label="Open exercise details"
        >
          Start
          <svg class="favorite-card-arrow-icon" width="16" height="16">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="favorite-card-heading">
        <div class="favorite-card-icon-wrap">
          <svg class="favorite-card-icon" width="14" height="14">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="favorite-card-title">${name}</h3>
      </div>

      <ul class="favorite-card-info">
        <li class="favorite-info-item" title="Burned calories: ${burnedText}">
          <span class="favorite-info-label">Burned calories:&nbsp;</span>
          <span class="favorite-info-value">${burnedText}</span>
        </li>
        <li class="favorite-info-item" title="Body part: ${bodyPartText}">
          <span class="favorite-info-label">Body part:&nbsp;</span>
          <span class="favorite-info-value">${bodyPartText}</span>
        </li>
        <li class="favorite-info-item" title="Target: ${targetText}">
          <span class="favorite-info-label">Target:&nbsp;</span>
          <span class="favorite-info-value">${targetText}</span>
        </li>
      </ul>
    </li>
  `;
}

export function createFavoriteExercisesMarkup(exercises) {
  return exercises.map(createFavoriteCardMarkup).join('');
}
