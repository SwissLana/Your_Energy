export function createPaginationMarkup(totalPages, currentPage) {
  if (totalPages <= 1) return '';

  return Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;

    return `
      <button
        class="pagination-btn ${page === currentPage ? 'is-active' : ''}"
        type="button"
        data-page="${page}"
        aria-label="Go to page ${page}"
      >
        ${page}
      </button>
    `;
  }).join('');
}

export function getClickedPage(event) {
  const button = event.target.closest('.pagination-btn');

  if (!button) return null;

  return Number(button.dataset.page);
}
