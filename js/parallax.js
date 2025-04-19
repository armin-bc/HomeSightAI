// Modified GSAP Parallax Implementation - With Fixed Testimonial Animations
document.addEventListener('DOMContentLoaded', function() {
  // Make sure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded. Please add the required scripts to your HTML.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Valuation section animations
  function initValuationAnimations() {
    const valuationSection = document.querySelector('.valuation');
    if (!valuationSection) return;
    
    // Target the specific elements with data-lang attributes
    gsap.from('.valuation .section-header h2[data-lang="de"]', {
      scrollTrigger: {
        trigger: valuationSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    });
    
    gsap.from('.valuation .section-header p[data-lang="de"]', {
      scrollTrigger: {
        trigger: valuationSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });
    
    gsap.from('.form-container', {
      scrollTrigger: {
        trigger: valuationSection,
        start: "top 70%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.4,
      ease: "power3.out"
    });
    
    // Additional animation for form steps
    gsap.from('.form-steps .step-indicator', {
      scrollTrigger: {
        trigger: '.form-steps',
        start: "top 85%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1, // Staggered animation for each step
      ease: "power3.out"
    });
  }

  // Features section animations - entrance only
  function initFeaturesAnimations() {
    const featuresSection = document.querySelector('.features-section');
    if (!featuresSection) return;
    
    // Main section elements animations
    gsap.from('.features-heading', {
      scrollTrigger: {
        trigger: featuresSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    });
    
    gsap.from('.features-description', {
      scrollTrigger: {
        trigger: featuresSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });
    
    // Feature cards staggered animation - entrance only
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      // Entrance animation
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true // Only trigger once
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: 0.1 * index,
        ease: "power3.out"
      });
    });
  }

  // Process section animations - entrance only
  function initProcessAnimations() {
    const processSection = document.querySelector('.process-section');
    if (!processSection) return;
    
    gsap.from(processSection.querySelector('h2'), {
      scrollTrigger: {
        trigger: processSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    });
    
    gsap.from(processSection.querySelector('p'), {
      scrollTrigger: {
        trigger: processSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });
    
    // Process steps staggered animation - entrance only
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach((card, index) => {
      // Initial animation when scrolling into view
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true // Only trigger once
        },
        opacity: 0,
        y: 70,
        duration: 0.7,
        delay: 0.15 * index,
        ease: "power3.out"
      });
    });
  }

  // Pricing section animations - entrance only
  function initPricingAnimations() {
    const pricingSection = document.querySelector('.pricing-section');
    if (!pricingSection) return;
    
    gsap.from(pricingSection.querySelector('h2'), {
      scrollTrigger: {
        trigger: pricingSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    });
    
    gsap.from(pricingSection.querySelector('p'), {
      scrollTrigger: {
        trigger: pricingSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });
    
    // Price cards staggered animation - entrance only
    const priceCards = document.querySelectorAll('.pricing-card');
    priceCards.forEach((card, index) => {
      // Initial animation
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true // Only trigger once
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.15 * index,
        ease: "power3.out"
      });
    });
  }

  // Testimonial section animations - entrance only and play only once!
  function initTestimonialAnimations() {
    const testimonialSection = document.querySelector('.testimonial-section');
    if (!testimonialSection) return;
    
    // Create a single ScrollTrigger for the entire section
    const testimonialTrigger = ScrollTrigger.create({
      trigger: testimonialSection,
      start: "top 80%",
      once: true, // Critical: only trigger once
      onEnter: () => playTestimonialAnimations()
    });
    
    function playTestimonialAnimations() {
      // Animate header elements
      gsap.from('.testimonial-header h2', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from('.testimonial-header p', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
      
      // Testimonial cards with staggered effect - animate only once
      const cards = document.querySelectorAll('.testimonial-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: 0.3 + (0.1 * index), // Staggered delay
          ease: "power3.out"
        });
      });
    }
  }

  // Contact section animations - entrance only
  function initContactAnimations() {
    const contactSection = document.querySelector('.contact');
    if (!contactSection) return;
    
    gsap.from('.contact .section-header h2', {
      scrollTrigger: {
        trigger: contactSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    });
    
    gsap.from('.contact .section-header p', {
      scrollTrigger: {
        trigger: contactSection,
        start: "top 80%",
        once: true // Only trigger once
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });
    
    // Split the animation between form and info - entrance only
    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.contact-grid',
        start: "top 85%",
        once: true // Only trigger once
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out"
    });
    
    gsap.from('.contact-info-block', {
      scrollTrigger: {
        trigger: '.contact-grid',
        start: "top 85%",
        once: true // Only trigger once
      },
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Form fields staggered effect - entrance only
    const formFields = document.querySelectorAll('.contact-form .form-group');
    formFields.forEach((field, index) => {
      gsap.from(field, {
        scrollTrigger: {
          trigger: field,
          start: "top 90%",
          once: true // Only trigger once
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.1 * index,
        ease: "power3.out"
      });
    });
    
    // Contact info items staggered effect - entrance only
    const infoItems = document.querySelectorAll('.info-group');
    infoItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          once: true // Only trigger once
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.1 * index,
        ease: "power3.out"
      });
    });
  }

  // Footer animations - entrance only
  function initFooterAnimations() {
    const footer = document.querySelector('.main-footer');
    if (!footer) return;
    
    // Staggered fade-in for footer columns - entrance only
    const footerColumns = document.querySelectorAll('.footer-column');
    footerColumns.forEach((column, index) => {
      gsap.from(column, {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true // Only trigger once
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.1 * index,
        ease: "power3.out"
      });
    });
    
    // Social icons popping in - entrance only
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach((icon, index) => {
      gsap.from(icon, {
        scrollTrigger: {
          trigger: icon,
          start: "top 95%",
          once: true // Only trigger once
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.8 + (0.1 * index),
        ease: "back.out(1.7)"
      });
    });
  }

  // Add subtle entrance animation to radio cards
  function initRadioCardAnimations() {
    const radioCards = document.querySelectorAll('.radio-card');
    radioCards.forEach((card, index) => {
      // Only add entrance animation
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.1 * index,
        ease: "power3.out"
      });
    });
  }

  // Initialize all animations
  function initAllAnimations() {
    initValuationAnimations();
    initFeaturesAnimations();
    initProcessAnimations();
    initPricingAnimations();
    initTestimonialAnimations(); // Using the fixed implementation
    initContactAnimations();
    initFooterAnimations();
    initRadioCardAnimations();
    
    console.log('Entrance animations initialized with fixed testimonial section');
  }

  // Start animations
  initAllAnimations();
});