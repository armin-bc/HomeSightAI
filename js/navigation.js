/**
 * Navigation functionality for smooth scrolling
 */

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavigation);

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Setup smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

// Handle navigation link clicks
function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        smoothScrollTo(targetElement);
    }
}

// Smooth scroll to target element
function smoothScrollTo(element) {
    window.scrollTo({
        top: element.offsetTop - 80, // Offset for header height
        behavior: 'smooth'
    });
}