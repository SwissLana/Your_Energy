import sprite from '../../img/sprite.svg';

const icon = id =>
  `<svg class="pagination-icon" aria-hidden="true" focusable="false"><use href="${sprite}#${id}"></use></svg>`;

const doubleIcon = id => `${icon(id)}${icon(id)}`;

const ICONS = {
  first: doubleIcon('icon-arrow-back'),
  prev: icon('icon-arrow-back'),
  next: icon('icon-arrow-forward'),
  last: doubleIcon('icon-arrow-forward'),
};

export function createPaginationMarkup(totalPages, currentPage) {
  if (totalPages <= 1) return '';

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const showNav = totalPages > 3;

  const windowStart = Math.min(
    Math.max(1, currentPage - 1),
    Math.max(1, totalPages - 2)
  );
  const windowEnd = Math.max(
    Math.min(currentPage + 1, totalPages),
    Math.min(3, totalPages)
  );
  const showEllipsisBefore = showNav && windowStart > 1;
  const showEllipsisAfter = showNav && windowEnd < totalPages;

  const navBtn = (iconMarkup, page, disabled, ariaLabel, isDouble = false) =>
    `<button
      class="pagination-btn pagination-btn--nav${isDouble ? ' pagination-btn--double' : ''}"
      type="button"
      data-page="${page}"
      ${disabled ? 'disabled' : ''}
      aria-label="${ariaLabel}"
    >${iconMarkup}</button>`;

  const pageBtn = page =>
    `<button
      class="pagination-btn${page === currentPage ? ' is-active' : ''}"
      type="button"
      data-page="${page}"
      aria-label="Go to page ${page}"
      ${page === currentPage ? 'aria-current="page"' : ''}
    >${page}</button>`;

  const pages = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) =>
    pageBtn(windowStart + i)
  );

  const ellipsis = '<span class="pagination-ellipsis">...</span>';

  return [
    showNav ? navBtn(ICONS.first, 1, isFirst, 'First page', true) : '',
    showNav
      ? navBtn(
          ICONS.prev,
          Math.max(1, currentPage - 1),
          isFirst,
          'Previous page'
        )
      : '',
    showEllipsisBefore ? ellipsis : '',
    ...pages,
    showEllipsisAfter ? ellipsis : '',
    showNav
      ? navBtn(
          ICONS.next,
          Math.min(totalPages, currentPage + 1),
          isLast,
          'Next page'
        )
      : '',
    showNav ? navBtn(ICONS.last, totalPages, isLast, 'Last page', true) : '',
  ].join('');
}

export function getClickedPage(event) {
  const button = event.target.closest('.pagination-btn');

  if (!button || button.disabled) return null;

  return Number(button.dataset.page);
}
