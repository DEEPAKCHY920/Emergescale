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

    // --- Page Transitions ---
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);
    
    // Fade out overlay on load
    setTimeout(() => {
        transitionOverlay.classList.add('fade-out');
    }, 50);

    // Fade in overlay on page switch
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        const target = link.getAttribute('target');
        
        // Exclude anchors, tel, mailto, etc.
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && href !== 'javascript:void(0);' && target !== '_blank') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                transitionOverlay.classList.remove('fade-out');
                transitionOverlay.classList.add('fade-in');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            });
        }
    });

    // --- Premium Mobile Menu Toggle ---
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block; color: #FF6B00;">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="16" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
    `;
    navbar.appendChild(mobileToggle); 

    // Create premium mobile menu overlay
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    
    // Check current active page to apply highlight
    const path = window.location.pathname;
    const isHome = path.includes('index.html') || path.endsWith('/');
    const isServices = path.includes('services.html');
    const isAbout = path.includes('about.html');

    mobileMenuOverlay.innerHTML = `
        <div class="mobile-menu-card">
            <div class="mobile-menu-header">
                <a href="index.html" class="logo-icon-text-container">
                    <img src="assets/logo.png" alt="ES Logo" class="navbar-logo-img">
                    <span class="navbar-logo-text">EMERGESCALE</span>
                </a>
                <button class="mobile-menu-close-btn">&times;</button>
            </div>
            
            <div class="mobile-menu-links">
                <a href="index.html" class="mobile-menu-link ${isHome ? 'active' : ''}">
                    <span class="mobile-menu-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </span>
                    <span class="mobile-menu-text">Home</span>
                </a>
                <a href="services.html" class="mobile-menu-link ${isServices ? 'active' : ''}">
                    <span class="mobile-menu-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    </span>
                    <span class="mobile-menu-text">Services</span>
                </a>
                <a href="about.html" class="mobile-menu-link ${isAbout ? 'active' : ''}">
                    <span class="mobile-menu-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </span>
                    <span class="mobile-menu-text">About</span>
                </a>
                <a href="index.html#cta" class="mobile-menu-link">
                    <span class="mobile-menu-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </span>
                    <span class="mobile-menu-text">Contact</span>
                </a>
            </div>
            
            <div class="mobile-menu-actions">
                <a href="tel:+918796072717" class="mobile-action-btn btn-consult">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #FF6B00;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Get Free Consultation
                </a>
                <a href="https://wa.me/918796072717" target="_blank" rel="noopener" class="mobile-action-btn btn-wa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="color: #25D366;"><path d="M12.012 2c-5.506 0-9.988 4.47-9.988 9.953 0 1.76.46 3.473 1.336 4.982L2 22l5.22-.1.026.015c1.472.852 3.143 1.301 4.766 1.301 5.507 0 9.988-4.47 9.988-9.953 0-2.656-1.036-5.15-2.916-7.03C17.228 4.35 14.712 3.328 12.01 3.328h.002zm0 1.674c2.26 0 4.385.882 5.98 2.477a8.27 8.27 0 0 1 2.482 5.963c0 4.606-3.753 8.349-8.375 8.349-1.464 0-2.894-.383-4.14-1.107l-.297-.17-3.08.08.082-3.003-.187-.297A8.29 8.29 0 0 1 3.7 11.95c0-4.606 3.753-8.348 8.31-8.348h.002zm-3.666 3.195c-.17 0-.395.056-.566.248-.17.198-.654.64-.654 1.56s.67 1.808.76 1.932c.09.124 1.31 2.01 3.178 2.82.445.193.79.308 1.062.395.447.14.854.12 1.176.073.358-.052 1.1-.45 1.253-.883.153-.435.153-.807.108-.883-.045-.078-.17-.123-.358-.218-.188-.095-1.1-.544-1.27-.606-.17-.062-.294-.093-.418.093-.124.186-.48.606-.587.728-.108.124-.216.14-.404.045-.188-.095-.795-.293-1.516-.938-.56-.5-1.004-1.12-1.114-1.308-.11-.188-.012-.29.083-.384.086-.084.188-.22.282-.33.093-.11.124-.188.188-.314.062-.124.03-.233-.015-.327-.045-.095-.418-1.01-.572-1.383-.15-.36-.316-.31-.43-.316-.11-.005-.236-.005-.363-.005z"></path></svg>
                    Chat on WhatsApp
                </a>
            </div>
            
            <div class="mobile-menu-socials">
                <a href="#" class="social-circle" aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" class="social-circle" aria-label="Instagram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" class="social-circle" aria-label="YouTube">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(mobileMenuOverlay);

    const closeBtn = mobileMenuOverlay.querySelector('.mobile-menu-close-btn');
    const mobileHeaderLogo = mobileMenuOverlay.querySelector('.mobile-menu-header .logo-icon-text-container');

    if (mobileHeaderLogo) {
        mobileHeaderLogo.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            transitionOverlay.classList.remove('fade-out');
            transitionOverlay.classList.add('fade-in');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 400);
        });
    }

    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', openMobileMenu);
    closeBtn.addEventListener('click', closeMobileMenu);
    
    // Close menu when overlay is clicked directly
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Close menu on link click (with page transition integration)
    mobileMenuOverlay.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMobileMenu();
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Otherwise normal transition
                e.preventDefault();
                closeMobileMenu();
                transitionOverlay.classList.remove('fade-out');
                transitionOverlay.classList.add('fade-in');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });

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
