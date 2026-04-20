/* ============================================
   PORTFOLIO — AMELIA DUBOIS
   script.js — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR: scroll effect + hamburger ──────────────────────
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  // ── 2. SCROLL REVEAL ─────────────────────────────────────────
  // Elements with class .reveal animate in when scrolled into view
  const revealEls = document.querySelectorAll(
    '.skill-card, .proj-card, .about-grid, .contact-grid, .fact-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));


  // ── 3. SKILL BARS: animate width on scroll ───────────────────
  const skillFills = document.querySelectorAll('.skill-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth;
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => barObserver.observe(fill));


  // ── 4. PROJECT FILTER ────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards  = document.querySelectorAll('.proj-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards with smooth fade
      projCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;

        if (show) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // ── 5. CONTACT FORM ──────────────────────────────────────────
  const form        = document.getElementById('contactForm');
  const successMsg  = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-primary');
    btn.textContent = 'Mengirim... ✨';
    btn.disabled = true;

    // Simulate send (replace with your backend / EmailJS / Formspree)
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Kirim Pesan 💌';
      btn.disabled = false;
      successMsg.style.display = 'block';

      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }, 1200);
  });


  // ── 6. ACTIVE NAV LINK on scroll ─────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--rose)'
            : '';
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  // ── 7. STICKER PARALLAX (subtle) ─────────────────────────────
  const stickers = document.querySelectorAll('.sticker');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    stickers.forEach((s, i) => {
      const speed = (i % 2 === 0) ? 0.04 : -0.03;
      s.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

});
