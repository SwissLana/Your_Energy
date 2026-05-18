export function initHeader() {
  const openMenuBtn = document.querySelector('[data-menu-open]');
  const closeMenuBtn = document.querySelector('[data-menu-close]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (!openMenuBtn || !closeMenuBtn || !mobileMenu) return;

  openMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    document.body.classList.add('no-scroll');
  });

  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  });

  mobileMenu.addEventListener('click', event => {
    if (event.target.matches('a')) {
      mobileMenu.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  });
}
