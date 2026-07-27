// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Reveal animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});
// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
// Dynamic typing effect (optional enhancement)
const titles = ['Software Engineer', 'Full-Stack Developer', 'AI Enthusiast', 'Problem Solver'];
let currentTitle = 0;
let currentChar = 0;
let isDeleting = false;
function typeEffect() {
    const subtitle = document.querySelector('.hero .subtitle');
    if (!subtitle) return;
    const current = titles[currentTitle];
    if (isDeleting) {
        subtitle.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        subtitle.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && currentChar === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentTitle = (currentTitle + 1) % titles.length;
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}
// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});
// Add hover effects to cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
// Add hover effect to experience cards
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(8px)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0)';
    });
});

// Mobile hamburger nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Dark / light theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        document.body.classList.remove('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Load saved theme preference (defaults to dark)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        const nextTheme = isLight ? 'dark' : 'light';
        applyTheme(nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
    });
}

// Contact form validation + submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const fields = contactForm.querySelectorAll('input[required], textarea[required]');

        fields.forEach(field => {
            const group = field.closest('.form-group');
            const value = field.value.trim();
            let fieldValid = value !== '';

            if (field.type === 'email' && fieldValid) {
                fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }

            if (group) {
                group.classList.toggle('invalid', !fieldValid);
            }
            if (!fieldValid) isValid = false;
        });

        if (!isValid) {
            formStatus.textContent = 'Please fill in all fields correctly.';
            formStatus.className = 'form-status error';
            return;
        }

        fetch('https://formspree.io/f/mojgyped', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(contactForm)
        })
        .then(response => {
            if (response.ok) {
                formStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                formStatus.textContent = "Something went wrong. Please try again or email me directly.";
                formStatus.className = 'form-status error';
            }
        })
        .catch(() => {
            formStatus.textContent = "Something went wrong. Please try again or email me directly.";
            formStatus.className = 'form-status error';
        });
    }); // closes the submit event listener

    // Clear the invalid state as the user types
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group) group.classList.remove('invalid');
        });
    });
} 