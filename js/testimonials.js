// Testimonial data
const testimonials = [
    {
        text: "HomeSight AI has transformed how we evaluate properties. Its precise AI predictions have improved our valuation accuracy by over 30%. I won't use anything else.",
        name: "Sarah Miller",
        company: "Berlin Real Estate Group"
    },
    {
        text: "I went from needing hours to accurately value a property to getting precise results in minutes. HomeSight AI has become the industry standard for our firm overnight! Pretty wild market-fit.",
        name: "Thomas Weber",
        company: "Munich Property Advisors"
    },
    {
        text: "HomeSight AI is at least a 2x improvement over traditional valuation methods. It's amazing having an AI assistant, and is an incredible accelerator for me and my team.",
        name: "Julia Schmidt",
        company: "Frankfurt Investment Group"
    },
    {
        text: "Started using HomeSight AI yesterday & I'm blown away. It's how property valuation should feel. I'm completely off spreadsheets now.",
        name: "Martin Hoffmann",
        company: "Hamburg Realty"
    },
    {
        text: "After many recommendations, I finally switched from traditional tools to HomeSight AI and... wow! It's absolutely incredible. If you like manual valuation (or if you don't), you'll be blown away by HomeSight AI. There is no going back. The accuracy and speed at which it delivers results has fundamentally changed how our entire office approaches property valuations.",
        name: "Anna Becker",
        company: "Vienna Property Associates"
    },
    {
        text: "HomeSight AI is the best product I've used in a while - it's an AI-enabled valuation tool that actually understands the real estate market. It's feature-rich and literally gets more accurate with every property.",
        name: "Stefan Mayer",
        company: "Berlin Property Tech"
    },
    {
        text: "I installed HomeSight AI... oh my god!",
        name: "Klaus Müller",
        company: "Düsseldorf Real Estate"
    },
    {
        text: "The HomeSight AI completion while searching for comparable properties is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what I want to do. It is enough to make you believe that eventually you'll be able to value at the speed of thought.",
        name: "Markus Wagner",
        company: "Stuttgart Realty"
    },
    {
        text: "I really like how HomeSight AI edits my existing valuation data - was inconsistent with my work and suddenly up popped this suggestion with all my other calculations!",
        name: "Christine Fischer",
        company: "Dresden Property Management"
    }
];

// Function to create a testimonial card
function createTestimonialCard(testimonial, index) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.style.cssText = `
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 25px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        margin-bottom: 20px;
    `;
    
    card.innerHTML = `
        <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; color: #e2e8f0;">${testimonial.text}</p>
        <div style="display: flex; align-items: center;">
            <img src="/api/placeholder/48/48" alt="${testimonial.name}" style="width: 48px; height: 48px; border-radius: 50%; margin-right: 15px;">
            <div>
                <h4 style="font-size: 1rem; margin-bottom: 2px; color: #fff;">${testimonial.name}</h4>
                <p style="font-size: 0.8rem; color: #94a3b8;">${testimonial.company}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Function to create and manage testimonial layout
function createMasonryLayout() {
    const grid = document.getElementById('testimonial-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Create column layout
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        position: relative;
    `;
    
    // Check window width for responsive design
    if (window.innerWidth < 768) {
        grid.style.gridTemplateColumns = '1fr';
    } else if (window.innerWidth < 1200) {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    
    // Shuffle testimonials to create more natural waterfall effect
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    
    // Add testimonials to grid
    shuffled.forEach((testimonial, index) => {
        const card = createTestimonialCard(testimonial, index);
        grid.appendChild(card);
        
        // Use GSAP for the entrance animation (only once)
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true // Critical: only trigger once
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: 0.1 * index,
            ease: "power3.out"
        });
    });
}

// Function to update theme colors
function updateTestimonialTheme() {
    const section = document.getElementById('testimonial-section');
    if (!section) return;
    
    const isDark = document.body.hasAttribute('data-theme');
    
    if (isDark) {
        section.style.backgroundColor = '#0f172a'; // Dark blue in dark mode
    } else {
        section.style.backgroundColor = '#1a1a2e'; // Deep navy in light mode
    }
}

// Create layout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded, if not, fall back to CSS animations
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not detected. Using CSS animations as fallback.');
        createMasonryLayoutWithCSSAnimations();
    } else {
        createMasonryLayout();
    }
    
    updateTestimonialTheme();
    
    // Listen for window resize to maintain responsive layout
    window.addEventListener('resize', () => {
        // Only recreate the layout, don't re-animate
        const grid = document.getElementById('testimonial-grid');
        if (!grid) return;
        
        if (window.innerWidth < 768) {
            grid.style.gridTemplateColumns = '1fr';
        } else if (window.innerWidth < 1200) {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    });
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    const footerThemeToggle = document.getElementById('footer-theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('change', updateTestimonialTheme);
    }
    
    if (footerThemeToggle) {
        footerThemeToggle.addEventListener('change', updateTestimonialTheme);
    }
});

// CSS fallback in case GSAP isn't loaded
function createMasonryLayoutWithCSSAnimations() {
    const grid = document.getElementById('testimonial-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Create column layout
    grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-auto-rows: 1fr;
    align-items: start;
    gap: 30px;
`;
    
    // Check window width for responsive design
    if (window.innerWidth < 768) {
        grid.style.gridTemplateColumns = '1fr';
    } else if (window.innerWidth < 1200) {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    
    // Shuffle testimonials to create more natural waterfall effect
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    
    // Add testimonials to grid with CSS animations
    shuffled.forEach((testimonial, index) => {
        const card = createTestimonialCard(testimonial, index);
        
        // Apply CSS animation that only runs once
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        grid.appendChild(card);
        
        // Ensure animation happens after card is added to DOM
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.transitionDelay = `${0.1 * index}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    });
}