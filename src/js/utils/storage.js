import { FAVORITES_KEY, QUOTE_KEY } from './constants';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorites(data) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
}

export function addFavorite(idToAdd) {
  const favorites = getFavorites();

  if (favorites.some(id => id === idToAdd)) {
    return;
  }

  favorites.push(idToAdd);
  saveFavorites(favorites);
}

export function removeFavorite(idToRemove) {
  const favorites = getFavorites().filter(id => id !== idToRemove);

  saveFavorites(favorites);
}

export function isFavorite(idToCheck) {
  return getFavorites().some(id => id === idToCheck);
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
