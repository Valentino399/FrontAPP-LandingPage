    // DOM Elements
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelectorAll('a[href^="#"]');
const buttons = document.querySelectorAll('button, .btn-outline, .btn-filled, .btn-download');
const sections = document.querySelectorAll('section');
const heroContent = document.querySelector('.hero-content');

// Mobile menu toggle with smooth animation
hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = isActive ? 'hidden' : '';
    mobileMenu.setAttribute("aria-hidden", String(!isActive));
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                hamburger.click();
            }
        }
    });
});

// Add hover effect to buttons
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionTop + sectionHeight * 0.3) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
const initAnimations = () => {
    // Hero content animation
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Section animations
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Initial check for elements in viewport
    setTimeout(animateOnScroll, 100);
};

// Page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        initAnimations();
    }, 100);
});

// Scroll event listener with throttling
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        animateOnScroll();
    }, 66); // ~15fps for scroll events
});