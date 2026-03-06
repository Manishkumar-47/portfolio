// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===========================
// PARTICLE CANVAS
// ===========================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const PARTICLE_COUNT = 80;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#7b2fff';
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        if (this.life > this.maxLife) this.reset();
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Code text particles
const codeFragments = ['{ }', '</>', '()', '=>', '01', '#!', '&&', '||', '/*', '*/'];
class CodeParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.speed = Math.random() * 0.5 + 0.2;
        this.text = codeFragments[Math.floor(Math.random() * codeFragments.length)];
        this.opacity = Math.random() * 0.2 + 0.05;
        this.size = Math.random() * 5 + 10;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#7b2fff';
    }
    update() {
        this.y -= this.speed;
        if (this.y < -30) this.reset();
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px 'Fira Code', monospace`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
const codeParticles = [];
for (let i = 0; i < 15; i++) {
    const cp = new CodeParticle();
    cp.y = Math.random() * canvas.height;
    codeParticles.push(cp);
}

// Draw connections
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.save();
                ctx.globalAlpha = (1 - dist / 100) * 0.08;
                ctx.strokeStyle = '#00d4ff';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.restore();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    codeParticles.forEach(cp => { cp.update(); cp.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===========================
// TYPING ANIMATION
// ===========================
const typingEl = document.getElementById('typing-text');
const phrases = [
    'Aspiring Software Developer',
    'DSA Enthusiast',
    'AI & ML Explorer',
    'BCA Student @ LPU',
    'Problem Solver'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
    } else {
        typingEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}
setTimeout(typeEffect, 1000);

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
const revealElements = document.querySelectorAll('.reveal');
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

revealElements.forEach(el => revealObserver.observe(el));
timelineItems.forEach(el => revealObserver.observe(el));

// ===========================
// SKILL BARS ANIMATION
// ===========================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                const target = bar.dataset.width;
                setTimeout(() => { bar.style.width = target + '%'; }, 200);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// ===========================
// CONTRIBUTION GRAPH GENERATOR
// ===========================
function generateContribGraph() {
    const grid = document.getElementById('contrib-grid');
    if (!grid) return;
    const totalCells = 52 * 7;
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'graph-cell';
        const rand = Math.random();
        if (rand > 0.6 && rand <= 0.75) cell.classList.add('level-1');
        else if (rand > 0.75 && rand <= 0.87) cell.classList.add('level-2');
        else if (rand > 0.87 && rand <= 0.94) cell.classList.add('level-3');
        else if (rand > 0.94) cell.classList.add('level-4');
        grid.appendChild(cell);
    }
}
generateContribGraph();

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '✅ Message Sent!';
            contactForm.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ===========================
// SMOOTH ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navAnchorList = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchorList.forEach(a => {
                a.style.color = '';
                if (a.getAttribute('href') === '#' + id) {
                    a.style.color = 'var(--accent-blue)';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ===========================
// CURSOR GLOW EFFECT
// ===========================
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number[data-count]').forEach(counter => {
                animateCounter(counter, parseInt(counter.dataset.count));
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));
