document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const project = contactForm.querySelector('#project').value.trim();

            if (!name || !email) {
                alert('Please provide your name and email.');
                return;
            }

            alert(`Thanks, ${name}! Your message has been received. We will follow up at ${email}.`);
            contactForm.reset();
        });
    }

    // Scroll animation fade-ins
    const fadeItems = document.querySelectorAll('.fade-in-section');
    if (fadeItems.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        });

        fadeItems.forEach(item => observer.observe(item));
    }

    // Dynamic Online Status Indicator (IST Timezone)
    function updateOnlineStatus() {
        const statusDot = document.querySelector('#online-status .status-dot');
        const statusText = document.querySelector('#online-status .status-text');
        if (!statusDot || !statusText) return;

        // Get UTC time
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        
        // India is UTC+5:30
        const istTime = new Date(utc + (3600000 * 5.5));

        const day = istTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const hours = istTime.getHours();
        const minutes = istTime.getMinutes();
        const timeInMinutes = hours * 60 + minutes;

        let isOpen = false;

        if (day >= 1 && day <= 5) {
            // Monday - Friday: 8:00 AM - 6:00 PM (480 mins to 1080 mins)
            if (timeInMinutes >= 480 && timeInMinutes <= 1080) {
                isOpen = true;
            }
        } else if (day === 6) {
            // Saturday: 10:00 AM - 4:00 PM (600 mins to 960 mins)
            if (timeInMinutes >= 600 && timeInMinutes <= 960) {
                isOpen = true;
            }
        }

        if (isOpen) {
            statusDot.className = 'status-dot green-dot';
            statusText.textContent = "We're currently online";
        } else {
            statusDot.className = 'status-dot gray-dot';
            statusText.textContent = "We're currently offline";
        }
    }

    updateOnlineStatus();
    setInterval(updateOnlineStatus, 60000); // Check status every minute
});
