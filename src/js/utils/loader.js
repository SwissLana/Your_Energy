const loader = document.querySelector('[data-loader]');

let loaderTimer = null;

export function showLoader() {
  loaderTimer = setTimeout(() => {
    loader?.classList.remove('is-hidden');
  }, 300);
}

export function hideLoader() {
  clearTimeout(loaderTimer);
  loader?.classList.add('is-hidden');
}
