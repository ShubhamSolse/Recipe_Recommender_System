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

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Model card interaction
const modelCards = document.querySelectorAll('.model-card');
modelCards.forEach(card => {
    card.addEventListener('click', function() {
        modelCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(14, 17, 23, 1)';
    } else {
        navbar.style.background = 'rgba(14, 17, 23, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, model cards, and tech items
document.querySelectorAll('.feature-card, .model-card, .tech-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to floating food emojis
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const foodEmojis = document.querySelectorAll('.food-emoji');
    
    foodEmojis.forEach((emoji, index) => {
        const speed = 0.5 + (index * 0.1);
        emoji.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to pipeline steps
const pipelineSteps = document.querySelectorAll('.pipeline-step');
pipelineSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Animate numbers or stats if needed
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add click effect to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.left = e.clientX - this.offsetLeft - 50 + 'px';
        ripple.style.top = e.clientY - this.offsetTop - 50 + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.fontSize = '2rem';
        menuToggle.style.cursor = 'pointer';
        menuToggle.style.color = 'var(--primary)';
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        document.querySelector('.navbar').appendChild(menuToggle);
    }
};

// Initialize on load
window.addEventListener('load', () => {
    // Add any initialization code here
    console.log('🍽️ Recipe Recommender AI Website Loaded!');
});

// Add dynamic year to footer if needed
const currentYear = new Date().getFullYear();
const footerContent = document.querySelector('.footer-content');
if (footerContent && !footerContent.textContent.includes(currentYear)) {
    const yearSpan = document.createElement('p');
    yearSpan.textContent = `© ${currentYear} AI Recipe Recommender`;
    yearSpan.style.marginTop = '1rem';
    yearSpan.style.color = 'var(--gray)';
    footerContent.appendChild(yearSpan);
}
