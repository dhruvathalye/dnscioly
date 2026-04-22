// ============================================
// DNSO Science Olympiad — main.js
// ============================================

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Particle generator (home page only)
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  const COUNT = 40;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left   = Math.random() * 100 + '%';
    p.style.top    = (50 + Math.random() * 50) + '%';
    p.style.setProperty('--dur',   (4 + Math.random() * 8) + 's');
    p.style.setProperty('--delay', (Math.random() * 6) + 's');
    particleContainer.appendChild(p);
  }
}

// Intersection Observer for scroll-triggered fade-ins
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Pause all fade-in elements that are below the fold until they scroll into view
document.querySelectorAll('.fade-in').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top > window.innerHeight) {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  }
});

// Smooth active nav link on scroll (optional enhancement)
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0) {
  const navItems = document.querySelectorAll('.nav-links a');
  const scrollHandler = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
}
