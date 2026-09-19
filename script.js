const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const year = document.getElementById('year');
const bars = document.querySelectorAll('.bar-track span');
const revealEls = document.querySelectorAll('.reveal, .fade-in-up, .reveal-card, .timeline-item, .skill-pills span');
const typingRole = document.getElementById('typing-role');
const header = document.querySelector('.site-header');
const cursor = document.querySelector('.cursor');
const tiltCards = document.querySelectorAll('.tilt-card');

if (year) {
  year.textContent = new Date().getFullYear();
}

const roles = ['Full Stack Developer', 'UI Designer', 'Engineering Student'];

if (typingRole) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeRole = () => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingRole.textContent = currentRole.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, 1200);
        return;
      }
    } else {
      typingRole.textContent = currentRole.slice(0, charIndex - 1);
      charIndex -= 1;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(typeRole, speed);
  };

  typeRole();
}

bars.forEach((bar) => {
  const value = bar.dataset.value || '80%';
  requestAnimationFrame(() => {
    bar.style.width = value;
  });
});

const skillTags = document.querySelectorAll('.skill-pills span');
skillTags.forEach((tag, index) => {
  tag.style.setProperty('--delay', `${index * 0.08}s`);
});

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (header) {
  const updateHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

if (window.matchMedia('(pointer: fine)').matches && cursor) {
  document.body.classList.add('cursor-visible');

  window.addEventListener('pointermove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .tilt-card, .skill-pills span, .impact-card, .project-card, .showcase-card').forEach((element) => {
    element.addEventListener('pointerenter', () => document.body.classList.add('cursor-hover'));
    element.addEventListener('pointerleave', () => document.body.classList.remove('cursor-hover'));
  });
}

tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = (0.5 - (y / rect.height)) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => revealObserver.observe(el));
