import sprite from '../../img/sprite.svg';
import {isFavorite } from './storage';

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

// universal function to generate one card
export function createExerciseCardMarkup(exercise, options = {}) {
  const isFavorite =
    typeof options === 'boolean' ? options : (options?.isFavorite ?? false);
  const { _id, name, rating, burnedCalories, bodyPart, target } = exercise;

  // check exercise status: for favorite render trash icon, for regular card render rating
  const topBadgeAction = isFavorite
    ? `
        <button
          class="favorite-remove-btn"
          type="button"
          data-id="${_id}"
          aria-label="Remove exercise from favorites"
        >
          <svg class="trash-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </button>
      `
    : (() => {
        // provide rating only for regular cards
        const formattedRating = Number(rating).toFixed(1);
        return `
        <span class="exercise-card-rating">
          <span class="exercise-card-rating-value">${formattedRating}</span>
          <svg class="exercise-card-star-icon" width="18" height="18" aria-hidden="true" focusable="false">
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
          <svg class="arrow-icon" width="16" height="16" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-card-title-container">
        <div class="run-icon-wrapper">
          <svg class="run-icon" width="14" height="14" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#icon-running-figure"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${name}</h3>
      </div>

      <ul class="exercise-card-info">
        <li class="info-item" title="Burned calories: ${burnedCalories} / 3 min">
          <span class="info-label">Burned calories:&nbsp;</span>
          <span class="info-value">${burnedCalories} / 3 min</span>
        </li>
        <li class="info-item" title="Body part: ${bodyPart}">
          <span class="info-label">Body part:&nbsp;</span>
          <span class="info-value">${bodyPart}</span>
        </li>
        <li class="info-item" title="Target: ${target}">
          <span class="info-label">Target:&nbsp;</span>
          <span class="info-value">${target}</span>
        </li>
      </ul>
    </li>
  `;
}

// generate regular cards list
export function createExercisesMarkup(exercises) {
  return exercises
    .map(exercise => createExerciseCardMarkup(exercise, false))
    .join('');
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

// generate list of cards with favorite exercises
export function createFavoriteExercisesMarkup(exercises) {
  return exercises.map(createFavoriteCardMarkup).join('');
}

//-----------EXERCISE MODAL WINDOW RENDER----------------

export function createExerciseModalMarkup(exercise) {
  const favorite = isFavorite(exercise._id);

  const starsMarkup = createRatingStarsMarkup(exercise.rating);

  // dynamically change button functionality display
  const btnText = favorite ? 'Remove from favorites' : 'Add to favorites';
  const btnIconId = favorite ? 'icon-trash' : 'icon-heart';

  return `
    <div class="backdrop" data-modal-backdrop>
      <div class="modal exercise-modal" role="dialog" aria-modal="true">
        <button
          class="close-btn exercise-close"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          <svg class="modal-close-icon" aria-hidden="true">
            <use href="${sprite}#icon-x"></use>
          </svg>
        </button>
        <div class="modal-content">
          <div class="exercise-modal-media">
            ${
              exercise.gifUrl
                ? `<img src="${exercise.gifUrl}" alt="${exercise.name}" loading="lazy" />`
                : '<p>Video is not available.</p>'
            }
          </div>
          <div class="exercise-description">
            <div class="exercise-heading">
              <h2 class="exercise-modal-title">${exercise.name}</h2>
              <div class="exercise-rating-container">
                <span class="rating-value">${exercise.rating ? Number(exercise.rating).toFixed(1) : '0.0'}</span>
                <div class="rating-stars">
                  ${starsMarkup}
                </div>
              </div>
            </div>
            <ul class="exercise-modal-info">
              <li class="info-item">
                <p class="info-label">Target</p>
                <span class="info-value">${exercise.target}</span>
              </li>

              <li class="info-item">
                <p class="info-label">Body Part</p>
                <span class="info-value">${exercise.bodyPart}</span>
              </li>
              
              <li class="info-item">
                <p class="info-label">Equipment</p>
                <span class="info-value">${exercise.equipment}</span>
              </li>
              
              <li class="info-item">
                <p class="info-label">Popular</p>
                <span class="info-value">${exercise.popularity}</span>
              </li>

              <li class="info-item">
                <p class="info-label">Burned Calories</p>
                <span class="info-value">${exercise.burnedCalories} / ${exercise.time} min</span></li>
            </ul>

            <p class="exercise-modal-description">
              ${exercise.description || 'Description is not available.'}
            </p>

            <div class="btn-wrapper">
              <button
                class="modal-btn favorite-modal-btn"
                type="button"
                data-favorite-toggle
              >
                <span>${btnText}</span>
                <svg class="modal-btn-icon" width="18" height="18" aria-hidden="true">
                  <use href="${sprite}#${btnIconId}"></use>
                </svg>
              </button>
              <button
                class="modal-btn give-rating-btn"
                type="button"
                data-give-rating
              >
                Give a rating
              </button>
            </div>
          </div>          
        </div>           
      </div>
    </div>
  `;
}

export function createRatingStarsMarkup(rating) {
  const maxStars = 5;
  
  const currentRating = Number(rating || 0);

  let starsMarkup = '';

  // calculate coloring percentage for the star
  const fillPercentage = Math.round((currentRating % 1) * 100);

  // create dynamic gradient
  starsMarkup += `
    <svg width="0" height="0" style="position:absolute;">
      <defs>
        <linearGradient id="partial-star-gradient">
          <stop offset="${fillPercentage}%" stop-color="rgb(238, 161, 12)" /> <stop offset="${fillPercentage}%" stop-color="rgba(244, 244, 244, 0.2)" /> </linearGradient>
      </defs>
    </svg>
  `;

  for (let i = 1; i <= maxStars; i++) {
    let starFill;

    if (i <= Math.floor(currentRating)) {
      // if star less or equal whole part of rating, it is colored orange
      starFill = 'rgb(238, 161, 12)';
    } else if (i === Math.ceil(currentRating) && currentRating % 1 !== 0) {
      // if this is next star and there is a part, apply gradient based on id
      starFill = 'url(#partial-star-gradient)';
    } else {
      // all other stars are gray
      starFill = 'rgba(244, 244, 244, 0.2)';
    }

    starsMarkup += `
      <svg width="18" height="18" aria-hidden="true" style="fill: ${starFill};">
        <use href="${sprite}#icon-add-rating-star"></use>
      </svg>
    `;
  }

  return starsMarkup;
}
