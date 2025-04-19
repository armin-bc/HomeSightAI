/**
 * Main JavaScript file - initializes all modules
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Make sure the testimonial grid is created if it exists
    if (typeof createMasonryLayout === 'function') {
        createMasonryLayout();
    }
    
    // Apply preferences for theme and language
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeToggles = document.querySelectorAll('#theme-toggle, #footer-theme-toggle');
        themeToggles.forEach(toggle => {
            if (toggle) toggle.checked = true;
        });
    }
    
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en') {
        const deLangElements = document.querySelectorAll('[data-lang="de"]');
        const enLangElements = document.querySelectorAll('[data-lang="en"]');
        deLangElements.forEach(el => el.style.display = 'none');
        enLangElements.forEach(el => el.style.display = 'block');
        
        const langToggles = document.querySelectorAll('#lang-toggle, #footer-lang-toggle');
        langToggles.forEach(toggle => {
            if (toggle) toggle.checked = true;
        });
    }
});

