/* ===========================
   SERIF & CO. — MAIN.JS
   GSAP · ScrollTrigger · Interactions
   =========================== */

gsap.registerPlugin(ScrollTrigger);

/* ================
   CUSTOM CURSOR
   ================ */

const cursor = document.createElement('div');
cursor.className = 'cursor';
const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.append(cursor, follower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function animFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animFollower);
})();

document.querySelectorAll('a, button, .project-item, .service-row, .video-placeholder').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('expanded');
    follower.classList.add('expanded');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('expanded');
    follower.classList.remove('expanded');
  });
});

/* ================
   INTRO SEQUENCE
   ================ */

const intro = document.getElementById('intro');
const introLines = document.querySelectorAll('.intro-line');
const introSkip = document.getElementById('intro-skip');
const site = document.getElementById('site');

function revealSite() {
  // Ensure site is visible
  site.classList.remove('hidden');

  const tl = gsap.timeline();

  // Fade out intro
  tl.to(intro, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      intro.style.display = 'none';
      // Start hero animations
      animateHero();
    }
  });

  // Reveal site
  tl.to(site, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4');
}

// Animate intro lines in
const introTl = gsap.timeline({ delay: 0.4 });

introTl
  .to(introLines, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.22
  })
  .to(introSkip, {
    opacity: 1,
    duration: 0.7,
    ease: 'power2.out'
  }, '-=0.2')
  // Texto visible durante 4 segundos completos antes de salir
  .to(introLines, {
    opacity: 0,
    y: -22,
    duration: 0.8,
    ease: 'power3.in',
    stagger: 0.12,
    delay: 4.0
  })
  .to(introSkip, {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in'
  }, '<')
  .call(revealSite, [], '-=0.25');

// Skip SOLO al hacer clic en el botón "Continuar"
let skipped = false;
function skipIntro() {
  if (skipped) return;
  skipped = true;
  introTl.kill();
  gsap.killTweensOf([introLines, introSkip]);
  gsap.to(introLines, { opacity: 0, y: -18, duration: 0.5, ease: 'power3.in', stagger: 0.08 });
  gsap.to(introSkip, { opacity: 0, duration: 0.3 });
  setTimeout(revealSite, 400);
}

introSkip.addEventListener('click', skipIntro);

/* ================
   HERO ANIMATION
   ================ */

function animateHero() {
  const tl = gsap.timeline({ delay: 0.1 });

  tl.to('.hero-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out'
  })
  .to('.h-line', {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.12
  }, '-=0.5')
  .to('.hero-sub', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.6')
  .to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .to('.hero-scroll-hint', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.hero-stack-main', {
    opacity: 0,
    x: 30,
    duration: 1.1,
    ease: 'power3.out'
  }, '-=0.8')
  .from('.hero-stack-secondary', {
    opacity: 0,
    y: 24,
    duration: 1.0,
    ease: 'power3.out'
  }, '-=0.7')
  .from('.hero-stack-label', {
    opacity: 0,
    x: -12,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5');


}

/* ================
   NAVBAR
   ================ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Add data-text attribute for hover effect
document.querySelectorAll('.nav-link').forEach(link => {
  link.setAttribute('data-text', link.querySelector('span').textContent);
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('open');
    gsap.fromTo(mobileMenu, 
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    gsap.fromTo('.mobile-link',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );
    // Animate toggle to X
    navToggle.querySelectorAll('span')[0].style.transform = 'translateY(6px) rotate(45deg)';
    navToggle.querySelectorAll('span')[1].style.transform = 'translateY(0) rotate(-45deg)';
  } else {
    gsap.to(mobileMenu, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('hidden');
      }
    });
    navToggle.querySelectorAll('span')[0].style.transform = '';
    navToggle.querySelectorAll('span')[1].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    mobileMenu.classList.add('hidden');
    navToggle.querySelectorAll('span')[0].style.transform = '';
    navToggle.querySelectorAll('span')[1].style.transform = '';
  });
});

/* ================
   SCROLL REVEALS
   ================ */

function setupScrollAnimations() {

  // Section labels
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0, y: 15, duration: 0.8, ease: 'power3.out'
    });
  });

  // Section titles
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 82%' },
      opacity: 0, y: 40, duration: 1.1, ease: 'power3.out'
    });
  });

  // Project items stagger
  gsap.from('.project-item', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 75%'
    },
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.2
  });

  // Service rows stagger
  gsap.from('.service-row', {
    scrollTrigger: {
      trigger: '.services-list',
      start: 'top 80%'
    },
    opacity: 0,
    x: -30,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12
  });

  // Nosotros left / right
  gsap.from('.nosotros-left', {
    scrollTrigger: {
      trigger: '.nosotros-inner',
      start: 'top 78%'
    },
    opacity: 0,
    x: -40,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.nosotros-right', {
    scrollTrigger: {
      trigger: '.nosotros-inner',
      start: 'top 78%'
    },
    opacity: 0,
    x: 40,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.15
  });

  // Contact heading word-by-word
  gsap.from('.contact-heading', {
    scrollTrigger: {
      trigger: '.contact-heading',
      start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.contact-links, .contact-cta', {
    scrollTrigger: {
      trigger: '.contact-links',
      start: 'top 85%'
    },
    opacity: 0,
    y: 25,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.2
  });

  // Blog section
  gsap.from('.blog-coming', {
    scrollTrigger: {
      trigger: '.blog-coming',
      start: 'top 85%'
    },
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: 'power3.out'
  });
}

// Set up scroll animations once site is revealed
// We defer to after intro so ScrollTrigger positions are correct
setTimeout(setupScrollAnimations, 500);

/* ================
   PARALLAX SUBTLE
   ================ */

gsap.to('.hero-heading', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  },
  y: 60,
  ease: 'none'
});

/* ================
   MARQUEE HOVER PAUSE
   ================ */

const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ================
   FAB — BOTÓN FLOTANTE
   ================ */

const fab = document.getElementById('fab-pencil');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    fab.classList.add('visible');
  } else {
    fab.classList.remove('visible');
  }
}, { passive: true });

fab.addEventListener('click', (e) => {
  e.preventDefault();
  const contacto = document.getElementById('contacto');
  if (contacto) {
    contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Add cursor expand on FAB
if (fab) {
  fab.addEventListener('mouseenter', () => {
    cursor.classList.add('expanded');
    follower.classList.add('expanded');
  });
  fab.addEventListener('mouseleave', () => {
    cursor.classList.remove('expanded');
    follower.classList.remove('expanded');
  });
}

/* ================
   CONTACTO SCROLL ANIMATIONS
   ================ */

function setupContactAnimations() {
  gsap.from('.contact-welcome', {
    scrollTrigger: { trigger: '.contact-welcome', start: 'top 82%' },
    opacity: 0, y: 50, duration: 1.2, ease: 'power3.out'
  });

  gsap.from('.contact-tagline', {
    scrollTrigger: { trigger: '.contact-tagline', start: 'top 85%' },
    opacity: 0, y: 25, duration: 0.9, ease: 'power3.out', delay: 0.15
  });

  gsap.from('.btn-hire', {
    scrollTrigger: { trigger: '.btn-hire', start: 'top 85%' },
    opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out'
  });

  gsap.from('.contacto-divider', {
    scrollTrigger: { trigger: '.contacto-divider', start: 'top 88%' },
    scaleX: 0, duration: 1.2, ease: 'power3.out', transformOrigin: 'left'
  });

  gsap.from('.contacto-col', {
    scrollTrigger: { trigger: '.contacto-info', start: 'top 82%' },
    opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.2
  });

  gsap.from('.contacto-map', {
    scrollTrigger: { trigger: '.contacto-map', start: 'top 88%' },
    opacity: 0, y: 20, duration: 1, ease: 'power3.out'
  });

  // Footer
  gsap.from('.footer-brand', {
    scrollTrigger: { trigger: '#footer', start: 'top 88%' },
    opacity: 0, y: 30, duration: 1, ease: 'power3.out'
  });

  gsap.from('.footer-social-link', {
    scrollTrigger: { trigger: '.footer-mid', start: 'top 92%' },
    opacity: 0, x: -20, duration: 0.8, ease: 'power3.out', stagger: 0.15
  });
}

setTimeout(setupContactAnimations, 600);
