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

const consultationModal = document.createElement('div');
consultationModal.className = 'consultation-modal';
consultationModal.setAttribute('aria-hidden', 'true');
consultationModal.innerHTML = `
  <div class="consultation-backdrop" data-consultation-close></div>
  <section class="consultation-dialog" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
    <button class="consultation-close" type="button" aria-label="Close consultation form" data-consultation-close>×</button>
    <div class="consultation-heading"><div class="section-kicker">Start a conversation</div><h2 id="consultation-title">Let’s make room<br><em>for something beautiful.</em></h2><p>Tell us a little about your project and we will get back to you soon.</p></div>
    <form class="consultation-form"><div class="consultation-form-row"><label>First name<input name="firstName" type="text" required></label><label>Last name<input name="lastName" type="text" required></label></div><div class="consultation-form-row"><label>Email<input name="email" type="email" required></label><label>Phone<input name="phone" type="tel" required></label></div><label>Project type<select name="projectType" required><option value="">Select one</option><option>Residential interiors</option><option>Commercial space</option><option>Turnkey design</option><option>Styling &amp; curation</option></select></label><label>Tell us about your project<textarea name="message" rows="3" required></textarea></label><button class="button arrow" type="submit">Send enquiry</button><p class="consultation-success" role="status">Thank you. We will be in touch soon.</p></form>
  </section>`;
document.body.appendChild(consultationModal);

const openConsultation = (event) => {
  event.preventDefault();
  consultationModal.classList.add('is-open');
  consultationModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  consultationModal.querySelector('input')?.focus();
};
const closeConsultation = () => {
  consultationModal.classList.remove('is-open');
  consultationModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};
document.querySelectorAll('.header-cta, .final-cta .button').forEach((trigger) => trigger.addEventListener('click', openConsultation));
consultationModal.querySelectorAll('[data-consultation-close]').forEach((closeButton) => closeButton.addEventListener('click', closeConsultation));
consultationModal.querySelector('.consultation-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  consultationModal.querySelector('.consultation-success')?.classList.add('is-visible');
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeConsultation(); });
