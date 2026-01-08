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

// Optional: Parallax effect for hero image
const imageWrapper = document.querySelector('.image-wrapper');
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (imageWrapper) {
        imageWrapper.style.transform = `rotateY(-${15 - scroll/50}deg) rotateX(${10 - scroll/100}deg) translateY(${scroll/20}px)`;
    }
});
