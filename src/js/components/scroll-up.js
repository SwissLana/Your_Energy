export function initScrollUp() {
  const scrollUpBtn = document.querySelector('[data-scroll-up]');

  if (!scrollUpBtn) return;

  window.addEventListener('scroll', () => {
    scrollUpBtn.classList.toggle('is-visible', window.scrollY > 400);
  });

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
