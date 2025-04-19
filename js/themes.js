/**
 * Theme and language toggle functionality
 */

// DOM Elements
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const footerThemeToggle = document.getElementById('footer-theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const footerLangToggle = document.getElementById('footer-lang-toggle');

// Initialize theme and language settings
function initThemeAndLanguage() {
    // Setup event listeners
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
    
    if (footerThemeToggle) {
        footerThemeToggle.addEventListener('change', function() {
            themeToggle.checked = this.checked;
            toggleTheme();
        });
    }
    
    if (langToggle) {
        langToggle.addEventListener('change', toggleLanguage);
    }
    
    if (footerLangToggle) {
        footerLangToggle.addEventListener('change', function() {
            langToggle.checked = this.checked;
            toggleLanguage();
        });
    }
    
    // Apply saved preferences
    applySavedPreferences();
}

// Toggle between light and dark theme
function toggleTheme() {
    const isDarkMode = themeToggle.checked;
    
    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (footerThemeToggle) {
            footerThemeToggle.checked = true;
        }
    } else {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (footerThemeToggle) {
            footerThemeToggle.checked = false;
        }
    }
    
    // Update testimonial section theme if it exists
    if (typeof updateTestimonialTheme === 'function') {
        updateTestimonialTheme();
    }
}

// Toggle between German and English language
function toggleLanguage() {
    const isEnglish = langToggle.checked;
    const deLangElements = document.querySelectorAll('[data-lang="de"]');
    const enLangElements = document.querySelectorAll('[data-lang="en"]');
    
    if (isEnglish) {
        deLangElements.forEach(el => el.style.display = 'none');
        enLangElements.forEach(el => el.style.display = 'block');
        localStorage.setItem('lang', 'en');

        // 📝 Neue Placeholder-Übersetzungen EN
        const msg = document.getElementById('message');
        if (msg) msg.placeholder = "How can we help you?";
        const subject = document.getElementById('subject');
        if (subject) subject.placeholder = "Your inquiry";
        const name = document.getElementById('name');
        if (name) name.placeholder = "Your name";
        const email = document.getElementById('email');
        if (email) email.placeholder = "your@email.com";

    } else {
        deLangElements.forEach(el => el.style.display = 'block');
        enLangElements.forEach(el => el.style.display = 'none');
        localStorage.setItem('lang', 'de');

        // 📝 Neue Placeholder-Übersetzungen DE
        const msg = document.getElementById('message');
        if (msg) msg.placeholder = "Wie können wir helfen?";
        const subject = document.getElementById('subject');
        if (subject) subject.placeholder = "Ihre Anfrage";
        const name = document.getElementById('name');
        if (name) name.placeholder = "Max Mustermann";
        const email = document.getElementById('email');
        if (email) email.placeholder = "max@example.com";
    }
}


// Apply saved theme and language preferences from localStorage
function applySavedPreferences() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && themeToggle) {
        themeToggle.checked = true;
        if (footerThemeToggle) {
            footerThemeToggle.checked = true;
        }
        body.setAttribute('data-theme', 'dark');
    }
    
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en' && langToggle) {
        const deLangElements = document.querySelectorAll('[data-lang="de"]');
        const enLangElements = document.querySelectorAll('[data-lang="en"]');
        deLangElements.forEach(el => el.style.display = 'none');
        enLangElements.forEach(el => el.style.display = 'block');
        langToggle.checked = true;
        if (footerLangToggle) {
            footerLangToggle.checked = true;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initThemeAndLanguage);