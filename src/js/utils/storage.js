import { FAVORITES_KEY, QUOTE_KEY } from './constants';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorites(data) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
}

export function addFavorite(exercise) {
  const favorites = getFavorites();

  if (favorites.some(item => item._id === exercise._id)) {
    return;
  }

  favorites.push(exercise);
  saveFavorites(favorites);
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(item => item._id !== id);

  saveFavorites(favorites);
}

export function isFavorite(id) {
  return getFavorites().some(item => item._id === id);
}

export function saveQuote(quote) {
  const today = new Date().toISOString().split('T')[0];

  localStorage.setItem(
    QUOTE_KEY,
    JSON.stringify({
      date: today,
      quote,
    })
  );
}

export function getSavedQuote() {
  const saved = JSON.parse(localStorage.getItem(QUOTE_KEY));

  if (!saved) return null;

  const today = new Date().toISOString().split('T')[0];

  return saved.date === today ? saved.quote : null;
}
