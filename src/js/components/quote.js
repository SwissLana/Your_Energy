import { fetchQuote } from '../api/exercises-api';
import { getSavedQuote, saveQuote } from '../utils/storage';

export async function initQuote() {
  const quoteText = document.querySelector('[data-quote-text]');
  const quoteAuthor = document.querySelector('[data-quote-author]');

  if (!quoteText || !quoteAuthor) return;

  const savedQuote = getSavedQuote();

  if (savedQuote) {
    renderQuote(savedQuote, quoteText, quoteAuthor);
    return;
  }

  try {
    const quote = await fetchQuote();

    saveQuote(quote);
    renderQuote(quote, quoteText, quoteAuthor);
  } catch {
    quoteText.textContent = 'Quote is not available now.';
    quoteAuthor.textContent = '';
  }
}

function renderQuote(quote, quoteText, quoteAuthor) {
  quoteText.textContent = quote.quote;
  quoteAuthor.textContent = quote.author;
}
