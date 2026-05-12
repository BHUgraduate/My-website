
(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.menu');
  if (navToggle && menu) {
    navToggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  const revealTargets = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.14 });

  revealTargets.forEach(el => io.observe(el));

  const cards = document.querySelectorAll('.tilt');
  cards.forEach(card => {
    const limit = 10;
    const reset = () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -limit;
      const ry = ((x / r.width) - 0.5) * limit;
      card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchend', reset, { passive: true });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
