/**
 * main.js - Vanilla JavaScript for Diyan's Portfolio
 * Features: Responsive Navigation, Project Filtering, Gmail Compose Form, Email Obfuscation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Email obfuscation — assemble href at runtime so scrapers can't harvest it
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    const addr = emailLink.dataset.u + '@' + emailLink.dataset.d;
    emailLink.href = 'mailto:' + addr;
  }

  // 1. Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.focus();
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // 2. Project Filtering (on projects.html)
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterChips.length > 0 && projectCards.length > 0) {
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        // Toggle active chip
        filterChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        const filterValue = chip.getAttribute('data-filter').toLowerCase();

        projectCards.forEach((card) => {
          const categories = (card.getAttribute('data-category') || '').toLowerCase();
          
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Contact Form — opens user's email client with everything pre-filled
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('contact-name')?.value.trim() || '';
      const email   = document.getElementById('contact-email')?.value.trim() || '';
      const subject = document.getElementById('contact-subject')?.value.trim() || '';
      const message = document.getElementById('contact-message')?.value.trim() || '';

      if (!name || !email || !message) return;

      const sub  = encodeURIComponent(subject || `Message from ${name}`);
      const body = encodeURIComponent(
        `Hi Diyan,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`
      );

      // Use Gmail compose URL — opens in browser directly, no default mail app needed
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=diyanmaner06@gmail.com&su=${sub}&body=${body}`;
      window.open(gmailUrl, '_blank', 'noopener');
    });
  }
});
