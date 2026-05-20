function setActiveNavLink() {
  const navItems = document.querySelectorAll(
    '.header-nav-list .header-nav-link'
  );
  if (!navItems.length) return;

  const getFileName = path => {
    const file = path.split('/').pop();
    return !file || file === '' ? 'index.html' : file;
  };

  const currentFile = getFileName(window.location.pathname);

  navItems.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;
    const linkFile = getFileName(link.pathname);
    item.classList.toggle('active', linkFile === currentFile);
  });
}

export function initHeader() {
  setActiveNavLink();

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
