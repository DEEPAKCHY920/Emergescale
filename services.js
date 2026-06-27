/**
 * Emergescale Services Page Interactions
 * Handles: Navbar scroll, Mobile menu drawer, and Project Estimate Configurator
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
    mobileToggle.innerHTML = '&#9776;'; // Hamburger icon
    navbar.appendChild(mobileToggle);

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
    
    // Copy nav links into overlay (excluding logo container)
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

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all active items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


});
