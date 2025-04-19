/**
 * Form processing functions for the property valuation form
 */

// DOM elements
const valuationForm = document.getElementById('valuation-form');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const stepIndicators = document.querySelectorAll('.step-indicator');
const formSteps = document.querySelectorAll('.form-step');
const submitFormButton = document.getElementById('submit-form');
const loadingSpinner = document.getElementById('loading-spinner');
const fileDropzone = document.getElementById('file-dropzone');
const fileInput = document.getElementById('file-input');
const radioCards = document.querySelectorAll('.radio-card');

// Initialize form elements
function initFormElements() {
    // Multi-Step Form Navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = parseInt(button.getAttribute('data-next')) - 1;
            const nextStep = button.getAttribute('data-next');
            
            // Mark current step as completed
            stepIndicators[currentStep - 1].classList.add('completed');
            
            goToStep(nextStep);
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevStep = button.getAttribute('data-prev');
            goToStep(prevStep);
        });
    });

    // Form Submission
    if (valuationForm) {
        valuationForm.addEventListener('submit', handleFormSubmit);
    }

    // File Upload Handling
    if (fileDropzone && fileInput) {
        setupFileUpload();
    }

    // Radio Card Selection
    radioCards.forEach(setupRadioCard);
}

// Navigate to specified form step
function goToStep(stepNumber) {
    // Hide all steps
    formSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Deactivate all indicators
    stepIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    // Activate current indicator
    const targetIndicator = document.querySelector(`.step-indicator[data-step="${stepNumber}"]`);
    if (targetIndicator) {
        targetIndicator.classList.add('active');
    }
    
    // Add floating animation to active inputs
    setTimeout(() => {
        const activeInputs = targetStep.querySelectorAll('input, select');
        activeInputs.forEach(addInputAnimations);
    }, 100);
}

// Add hover/focus animations to form inputs
function addInputAnimations(input) {
    input.style.transition = 'transform 0.3s, box-shadow 0.3s';
    
    input.addEventListener('focus', () => {
        input.style.transform = 'translateY(-2px)';
        input.style.boxShadow = '0 4px 8px var(--shadow-color)';
    });
    
    input.addEventListener('blur', () => {
        input.style.transform = '';
        input.style.boxShadow = '';
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Hide form
    valuationForm.style.display = 'none';
    
    // Show loading spinner
    loadingSpinner.style.display = 'block';
    
    // Simulate API call delay
    setTimeout(() => {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        
        // Redirect to results page or show results
        alert('Form submitted! In a real application, this would show results or redirect to a results page.');
        
        // Reset form for demo purposes
        valuationForm.reset();
        valuationForm.style.display = 'block';
        goToStep(1);
        stepIndicators.forEach(indicator => {
            indicator.classList.remove('completed');
        });
    }, 2000);
}

// Setup file upload functionality
function setupFileUpload() {
    const langToggle = document.getElementById('lang-toggle');
    
    fileDropzone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Add basic file upload interaction
    fileInput.addEventListener('change', updateFileDisplay);
    
    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileDropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        fileDropzone.addEventListener(eventName, highlightDropZone, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        fileDropzone.addEventListener(eventName, unhighlightDropZone, false);
    });
    
    // Handle file drop
    fileDropzone.addEventListener('drop', handleDrop);
}

// Prevent default drag/drop behavior
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop zone on drag over
function highlightDropZone() {
    fileDropzone.style.borderColor = 'var(--primary-color)';
    fileDropzone.style.backgroundColor = 'rgba(89, 87, 249, 0.05)';
}

// Remove highlight from drop zone
function unhighlightDropZone() {
    if (!fileInput.files.length) {
        fileDropzone.style.borderColor = '';
        fileDropzone.style.backgroundColor = '';
    }
}

// Handle files dropped into drop zone
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        fileInput.files = files;
        
        // Trigger change event to update UI
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    }
}

// Update file display after selection
function updateFileDisplay() {
    const langToggle = document.getElementById('lang-toggle');
    
    if (fileInput.files.length > 0) {
        fileDropzone.style.borderColor = 'var(--primary-color)';
        fileDropzone.innerHTML = `
            <i class="fas fa-check" style="color: var(--primary-color);"></i>
            <p data-lang="de">${fileInput.files.length} Datei(en) ausgewählt</p>
            <p data-lang="en" style="display:none;">${fileInput.files.length} file(s) selected</p>
        `;
        
        // Apply current language
        if (langToggle.checked) {
            document.querySelector('[data-lang="de"]').style.display = 'none';
            document.querySelector('[data-lang="en"]').style.display = 'block';
        }
    }
}

// Setup radio card functionality
function setupRadioCard(card) {
    const radio = card.querySelector('input[type="radio"]');
    
    radio.addEventListener('change', () => {
        if (radio.checked) {
            // Reset all cards first
            radioCards.forEach(c => {
                c.style.transform = '';
                c.style.boxShadow = '';
            });
            
            // Style the selected card
            card.style.transform = 'translateY(-3px)';
            card.style.boxShadow = '0 4px 8px var(--shadow-color)';
        }
    });
}

// Add animation to form elements
function animateFormElements() {
    // Subtle float animation for radio cards
    radioCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'none'; // Reset first
        
        setTimeout(() => {
            card.style.animation = 'float 3s ease-in-out infinite';
            
            // Different timing for each card to create a wave effect
            card.style.animationDelay = `${index * 0.2}s`;
        }, 10);
    });
    
    // Add subtle hover animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transition = 'transform 0.3s, box-shadow 0.3s';
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px var(--shadow-color)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFormElements();
    animateFormElements();
});