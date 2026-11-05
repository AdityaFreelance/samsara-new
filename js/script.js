const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const siteHeader = document.querySelector('.site-header');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const syncStickyHeader = () => {
  siteHeader?.classList.toggle('is-sticky', window.scrollY > 24);
};

window.addEventListener('scroll', syncStickyHeader, { passive: true });
syncStickyHeader();
