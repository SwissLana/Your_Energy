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

  return `
    <li class="exercise-card" data-id="${_id}">
      <div class="exercise-card-top">
        <span class="exercise-card-badge">WORKOUT</span>
        <span class="exercise-card-rating">${rating ?? '0.0'} ★</span>

        <button

          class="exercise-start-btn"
          type="button"
          data-exercise-start
          data-id="${_id}"
          aria-label="Open exercise details"
        >
          Start →
        </button>
      </div>

      <h3 class="exercise-card-title">${name}</h3>

      <ul class="exercise-card-info">
        <li>Burned calories: <span>${burnedCalories} / 3 min</span></li>
        <li>Body part: <span>${bodyPart}</span></li>
        <li>Target: <span>${target}</span></li>
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
