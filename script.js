// ===========================
// CERTIFICATE DATA
// ===========================
const CERTS = [
  {
    title: "NEBOSH IGC",
    issuer: "NEBOSH · Birmingham, United Kingdom",
    year: "2019",
    desc: "International General Certificate in Occupational Health & Safety — one of the world's most recognised qualifications for health, safety, and environmental management.",
    img: "nebosh.jpg"
  },
  {
    title: "IOSH Certificate",
    issuer: "IOSH · United Kingdom",
    year: "2019",
    desc: "Certificate from the Institution of Occupational Safety and Health — the world's biggest professional health and safety membership organisation.",
    img: "iosh.jpg"
  },
  {
    title: "HSE Manager Qualification",
    issuer: "British Safety Service · Ouargla, Algeria",
    year: "2019",
    desc: "Professional qualification certifying competence in Health, Safety and Environmental management across industrial and commercial operations.",
    img: "BritishSafetyService.jpg"
  },
  {
    title: "First Aid – Level 3",
    issuer: "Highfield Qualifications · Dubai, UAE",
    year: "2019",
    desc: "Internationally recognised Level 3 First Aid certificate covering emergency response, CPR, AED use, and workplace medical emergencies.",
    img: "FirstAid.jpg"
  },
  {
    title: "HACCP Certification",
    issuer: "British Safety Service · Algeria",
    year: "2019",
    desc: "Hazard Analysis and Critical Control Points — food hygiene and safety management system certification for pharmaceutical and food-adjacent industries.",
    img: ""
  },
  {
    title: "Firefighting Training",
    issuer: "British Safety Service · Algeria",
    year: "2019",
    desc: "Professional fire safety and emergency response training covering fire prevention, suppression techniques, evacuation management, and incident command.",
    img: "fire.jpg"
  },
  {
    title: "ATEX Training",
    issuer: "Industry Certification · Algeria",
    year: "Certified",
    desc: "Explosive Atmospheres (ATEX) directive safety training — hazard identification, zone classification, and equipment selection in explosive environments.",
    img: ""
  },
  {
    title: "Hazardous Chemicals",
    issuer: "Industry Certification · Algeria",
    year: "2022",
    desc: "Handling and storage of hazardous chemicals and pressurized gas — covering SDS interpretation, PPE selection, safe storage, and emergency response.",
    img: ""
  },
  {
    title: "Electrical Habilitation",
    issuer: "Industry Certification · Algeria",
    year: "2022",
    desc: "Electrical safety habilitation for non-electricians — covering electrical hazard awareness, safe isolation procedures, and emergency protocols.",
    img: ""
  },
  {
    title: "HSE Supervisor Certification",
    issuer: "TECHNOFORMAT School · Bouira, Algeria",
    year: "2016–2017",
    desc: "Foundational professional HSE Supervisor qualification covering risk assessment, legal compliance, safety management systems, and workplace inspection.",
    img: "TechnoFormat.jpg"
  }
];

// ===========================
// CERT MODAL LOGIC (UPDATED FOR REAL IMAGES)
// ===========================
let currentCertIdx = 0;
const certModal = document.getElementById('certModal');
const certFrame = document.getElementById('certFrame');
const certModalClose = document.getElementById('certModalClose');
const certBackdrop = document.getElementById('certBackdrop');
const certPrev = document.getElementById('certPrev');
const certNext = document.getElementById('certNext');
const modalTitle = document.getElementById('modalTitle');
const modalIssuer = document.getElementById('modalIssuer');
const modalYear = document.getElementById('modalYear');
const modalDesc = document.getElementById('modalDesc');
const modalCounter = document.getElementById('modalCounter');

function openCertModal(idx) {
  currentCertIdx = idx;
  renderCertModal();
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCertModal() {
  const cert = CERTS[currentCertIdx];
  certFrame.innerHTML = '';

  if (cert.img) {
    const imgEl = document.createElement('img');
    imgEl.src = cert.img;
    imgEl.alt = cert.title;
    imgEl.style.maxWidth = '100%';
    imgEl.style.maxHeight = '100%';
    imgEl.style.objectFit = 'contain';
    imgEl.style.display = 'block';
    imgEl.style.borderRadius = '4px';
    imgEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
    imgEl.style.border = '1px solid rgba(255,107,0,0.2)';
    imgEl.loading = 'lazy';
    certFrame.appendChild(imgEl);
  } else {
    certFrame.innerHTML = `<div style="text-align:center; padding:40px; color:var(--gray);"><i class="fas fa-file-invoice" style="font-size:3.5rem; margin-bottom:15px; color:var(--orange); opacity:0.7;"></i><br><span style="font-family:'Rajdhani',sans-serif; font-weight:600; font-size:1.2rem; tracking:1px;">DOCUMENT DIGITIZATION PENDING</span></div>`;
  }

  modalTitle.textContent = cert.title;
  if (modalIssuer.querySelector('span')) {
    modalIssuer.querySelector('span').textContent = cert.issuer;
  } else {
    modalIssuer.innerHTML = `<i class="fas fa-building"></i> <span>${cert.issuer}</span>`;
  }
  
  if (modalYear.querySelector('span')) {
    modalYear.querySelector('span').textContent = cert.year;
  } else {
    modalYear.innerHTML = `<i class="fas fa-calendar-check"></i> <span>${cert.year}</span>`;
  }

  modalDesc.textContent = cert.desc;
  modalCounter.textContent = `${currentCertIdx + 1} / ${CERTS.length}`;

  certFrame.style.opacity = '0';
  certFrame.style.transform = 'scale(0.97)';
  requestAnimationFrame(() => {
    certFrame.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    certFrame.style.opacity = '1';
    certFrame.style.transform = 'scale(1)';
  });
}

// Attach listeners
document.querySelectorAll('.cert-card[data-cert]').forEach(card => {
  card.addEventListener('click', () => openCertModal(parseInt(card.dataset.cert)));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCertModal(parseInt(card.dataset.cert));
    }
  });
});

if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certBackdrop) certBackdrop.addEventListener('click', closeCertModal);
if (certPrev) certPrev.addEventListener('click', () => { currentCertIdx = (currentCertIdx - 1 + CERTS.length) % CERTS.length; renderCertModal(); });
if (certNext) certNext.addEventListener('click', () => { currentCertIdx = (currentCertIdx + 1) % CERTS.length; renderCertModal(); });

document.addEventListener('keydown', (e) => {
  if (!certModal.classList.contains('open')) return;
  if (e.key === 'Escape') closeCertModal();
  if (e.key === 'ArrowLeft') { currentCertIdx = (currentCertIdx - 1 + CERTS.length) % CERTS.length; renderCertModal(); }
  if (e.key === 'ArrowRight') { currentCertIdx = (currentCertIdx + 1) % CERTS.length; renderCertModal(); }
});

// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ===========================
// SCROLL REVEAL
// ===========================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ===========================
// ANIMATED COUNTERS
// ===========================
let countersStarted = false;
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.stat-num').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        if (target === 0) return;
        let current = 0;
        const step = target / (1800 / 16);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { counter.textContent = target; clearInterval(timer); return; }
          counter.textContent = Math.floor(current);
        }, 16);
      });
    }
  }, { threshold: 0.5 }).observe(statsEl);
}

// ===========================
// SKILL BARS
// ===========================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      setTimeout(() => { fill.style.width = fill.dataset.w + '%'; }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-fill').forEach(f => skillObserver.observe(f));

// ===========================
// LANGUAGE RINGS
// ===========================
const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const ring = entry.target;
      const pct = parseFloat(ring.dataset.pct) / 100;
      setTimeout(() => { ring.style.strokeDashoffset = 314 - (pct * 314); }, 200);
      ringObserver.unobserve(ring);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.ring-fill').forEach(r => ringObserver.observe(r));

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) link.style.color = 'var(--orange)';
  });
});

// ===========================
// SCROLL PROGRESS BAR
// ===========================
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  if (scrollBar) scrollBar.style.width = ((window.scrollY / total) * 100) + '%';
});

// ===========================
// BACK TO TOP
// ===========================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => { if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400); });
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
});
(function animCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  if (cursor) { cursor.style.left = curX + 'px'; cursor.style.top = curY + 'px'; }
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a, button, .cert-card, .sector-card, .iso-badge, .attr-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ===========================
// THEME TOGGLE
// ===========================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// ===========================
// TYPING ANIMATION
// ===========================
const typingEl = document.getElementById('typingText');
const titles = ['HSE MANAGER', 'RISK SPECIALIST', 'SAFETY LEADER', 'ISO EXPERT', 'AUDIT MANAGER'];
let titleIdx = 0, charIdx = 0, isDeleting = false;
function typeWriter() {
  if (!typingEl) return;
  const current = titles[titleIdx];
  typingEl.textContent = isDeleting ? current.substring(0, charIdx - 1) : current.substring(0, charIdx + 1);
  isDeleting ? charIdx-- : charIdx++;
  if (!isDeleting && charIdx === current.length) { setTimeout(() => { isDeleting = true; typeWriter(); }, 2200); return; }
  if (isDeleting && charIdx === 0) { isDeleting = false; titleIdx = (titleIdx + 1) % titles.length; }
  setTimeout(typeWriter, isDeleting ? 55 : 95);
}
setTimeout(typeWriter, 2500);

// ===========================
// PARTICLE CANVAS
// ===========================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const SYMBOLS = ['⚠', '☢', '⊕', '△', '◈', '⬡'];
  const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    size: Math.random() * 10 + 6,
    speedX: (Math.random() - 0.5) * 0.4, speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.1 + 0.03,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.008
  }));

  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity; ctx.fillStyle = '#FF6B00';
      ctx.font = `${p.size}px sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(p.symbol, 0, 0); ctx.restore();
      p.x += p.speedX; p.y += p.speedY; p.rotation += p.rotSpeed;
      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.height + 20;
      if (p.y > canvas.height + 20) p.y = -20;
    });
    requestAnimationFrame(draw);
  })();
}

// ===========================
// EXPERIENCE FILTER
// ===========================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.sector === filter) ? '' : 'none';
    });
  });
});

// ===========================
// PANEL BLINK STATUS
// ===========================
const statusRows = document.querySelectorAll('.status-ok');
setInterval(() => {
  const random = statusRows[Math.floor(Math.random() * statusRows.length)];
  if (random) { random.style.opacity = '0.3'; setTimeout(() => { random.style.opacity = '1'; }, 200); }
}, 3000);

// ===========================
// HERO PARALLAX
// ===========================
window.addEventListener('scroll', () => {
  const grid = document.querySelector('.hero-grid-overlay');
  if (grid) grid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

