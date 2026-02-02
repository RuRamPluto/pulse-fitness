// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Interactive Tilt effect for hero image
const heroImage = document.querySelector('.hero-image');
const imgWrap = document.querySelector('.image-wrapper');

if (heroImage && imgWrap) {
    heroImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroImage.getBoundingClientRect();

        // Calculate cursor position relative to the center of the element (-0.5 to 0.5)
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        // Intensity of the tilt
        const intensity = 30; // Max tilt in degrees

        const rotateX = (0.5 - y) * intensity;
        const rotateY = (x - 0.5) * intensity;

        imgWrap.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroImage.addEventListener('mouseleave', () => {
        imgWrap.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
}

// Stats Counter and Reveal Animation
const statsSection = document.querySelector('.stats-bar');
const statItems = document.querySelectorAll('.stat-item');
const counters = document.querySelectorAll('.stat-value');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    const isDecimal = counter.getAttribute('data-decimal') === 'true';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out expo function
        const easeProgress = 1 - Math.pow(2, -10 * progress);

        let currentValue = easeProgress * target;

        if (isDecimal) {
            counter.innerText = currentValue.toFixed(1) + suffix;
        } else {
            counter.innerText = Math.floor(currentValue) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isDecimal) {
                counter.innerText = target.toFixed(1) + suffix;
            } else {
                counter.innerText = target + suffix;
            }
        }
    };

    requestAnimationFrame(update);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('revealed');
                    const counter = item.querySelector('.stat-value');
                    animateCounter(counter);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}
