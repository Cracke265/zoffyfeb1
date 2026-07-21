// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Effect for Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        // Sticky navbar becomes more opaque and shrinks slightly on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Floating Highlight for Navigation Items
    const navLinks = document.querySelectorAll('.nav-links .nav-item');
    const activeHighlight = document.querySelector('.active-highlight');
    const navLinksContainer = document.querySelector('.nav-links');

    if (activeHighlight && navLinksContainer) {
        function moveHighlight(link) {
            const linkRect = link.getBoundingClientRect();
            const containerRect = navLinksContainer.getBoundingClientRect();
            
            // Adjust the highlight width and position dynamically
            activeHighlight.style.width = `${linkRect.width}px`;
            activeHighlight.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
        }

        // Initialize position based on active item
        const activeLink = document.querySelector('.nav-item.active');
        if (activeLink) {
            moveHighlight(activeLink);
            // Highlight is initially invisible, visible only on container hover (managed in CSS)
            // If you want it always visible under the active link, you can un-comment below:
            // activeHighlight.style.opacity = '1';
        }

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                moveHighlight(link);
            });
        });

        // Snap back to active link on mouse leave
        navLinksContainer.addEventListener('mouseleave', () => {
            const active = document.querySelector('.nav-item.active');
            if (active) {
                moveHighlight(active);
            }
        });
    }

    // 4. Button Ripple Effect and Span Wrapping
    const buttons = document.querySelectorAll('.primary-btn');
    buttons.forEach(button => {
        // Wrap text in a span if not already wrapped (for proper z-index layering)
        if (!button.querySelector('.btn-text')) {
            const text = button.textContent;
            button.textContent = '';
            const span = document.createElement('span');
            span.classList.add('btn-text');
            span.textContent = text;
            button.appendChild(span);
        }

        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple);

            // Remove ripple element after animation finishes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 5. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            
            // Prevent scrolling on the body when mobile menu is open
            if (mobileMenu.classList.contains('open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a link inside it
        const mobileLinks = mobileMenu.querySelectorAll('a, button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                body.style.overflow = '';
            });
        });
    }
});
