/**
 * Emergescale Landing Page Interactions
 * Handles: Scroll effects, 3D mouse parallax, Intersection Observers, and Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll-driven Header ---
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="16" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
    `;
    navbar.insertBefore(mobileToggle, navbar.lastElementChild); // Insert before the Let's Talk button

    // Create mobile menu overlay
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    mobileMenuOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(250, 248, 245, 0.98);
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    
    // Copy nav links into overlay
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const cloned = item.cloneNode(true);
        cloned.style.fontSize = '1.5rem';
        cloned.style.fontWeight = '600';
        cloned.addEventListener('click', () => {
            toggleMobileMenu();
        });
        mobileMenuOverlay.appendChild(cloned);
    });

    document.body.appendChild(mobileMenuOverlay);

    let isMenuOpen = false;
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenuOverlay.style.opacity = '1';
            mobileMenuOverlay.style.pointerEvents = 'all';
            mobileToggle.innerHTML = '&times;'; // Close symbol
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenuOverlay.style.opacity = '0';
            mobileMenuOverlay.style.pointerEvents = 'none';
            mobileToggle.innerHTML = '&#9776;'; // Hamburger
            document.body.style.overflow = '';
        }
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);

    // --- Laptop Mouse Parallax ---
    const laptopContainer = document.querySelector('.laptop-container');
    const heroSection = document.querySelector('.hero');
    
    if (laptopContainer && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            // Mouse coordinate relative to the hero section container center
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            // Normalize values (-0.5 to 0.5)
            const normX = x / rect.width;
            const normY = y / rect.height;
            
            // Calculate tilt angles (limit rotation to 15 degrees max)
            const rotateY = normX * 15;
            const rotateX = -normY * 15;
            
            // Apply transform to the laptop container
            // Maintain the CSS float animation base translation, adding the mouse tilt
            laptopContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        // Reset tilt on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            laptopContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            laptopContainer.style.transition = 'transform 0.5s ease-out';
        });
        
        heroSection.addEventListener('mouseenter', () => {
            laptopContainer.style.transition = 'none';
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Fade-In ---
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Trigger animation only once
        });
    }, appearOptions);
    
    fadeSections.forEach(section => {
        appearOnScroll.observe(section);
    });

    // --- Newsletter Form Mock Handling ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            if (email) {
                alert(`Thank you! ${email} has been subscribed to our newsletter.`);
                emailInput.value = '';
            }
        });
    }
});
