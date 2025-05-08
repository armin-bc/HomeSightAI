// For demo purposes - show popup when clicking Next on Step 3
document.addEventListener('DOMContentLoaded', function() {
  const step3NextBtn = document.querySelector('#step3 .nav-buttons button:nth-child(2)');
  const popup = document.getElementById("step3Popup");
  
  if (step3NextBtn && popup) {
    step3NextBtn.addEventListener('click', function() {
      const mainDropzone = document.querySelector('.main-dropzone input');
      const secondaryDropzone = document.querySelector('.secondary-dropzone input');
      
      // Check if no files were uploaded
      if ((!mainDropzone || mainDropzone.files.length === 0) && 
          (!secondaryDropzone || secondaryDropzone.files.length === 0)) {
        popup.classList.add("show");
        
        // Hide popup after 3 seconds
        setTimeout(() => {
          popup.classList.remove("show");
        }, 3000);
      }
    });
  }
});let currentStep = 0;
const steps = document.querySelectorAll(".form-step");
const stepIndicators = document.querySelectorAll(".step");
const langToggle = document.getElementById("languageToggle");
const langLabel = document.querySelector(".lang-label");

let selectedSegment = null;
let selectedKPIs = new Set();

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
    stepIndicators[i].classList.toggle("active", i === index);
  });
  currentStep = index;

  // Re-activate buttons if selection was made previously
  if (index === 0 && selectedSegment) {
    const btn = document.getElementById("step1Next");
    if (btn) btn.disabled = false;
  }
  if (index === 1 && selectedKPIs.size > 0) {
    const btn = document.getElementById("step2Next");
    if (btn) btn.disabled = false;
    updateKpiCounter();
  }
}

function updateKpiCounter() {
  const count = selectedKPIs.size;
  const countDisplay = document.getElementById("kpiCount");
  if (countDisplay) {
    if (count === 1) {
      countDisplay.innerText = "eine KPI ausgewählt";
    } else {
      countDisplay.innerText = count + " KPIs ausgewählt";
    }
  }
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

document.querySelectorAll(".step").forEach((el, index) => {
  el.addEventListener("click", () => showStep(index));
});

document.querySelectorAll(".form-step").forEach((step, stepIndex) => {
  const options = step.querySelectorAll(".option");
  options.forEach(opt => {
    opt.addEventListener("click", () => {
      const multi = (stepIndex === 1);
      if (!multi) {
        // Allow deselection for segment (Step 1)
        if (opt.classList.contains("selected")) {
          opt.classList.remove("selected");
          selectedSegment = null;
          const btn = document.getElementById("step1Next");
          if (btn) btn.disabled = true;
          
          // Clear validation message when making changes
          const validationMsg = document.getElementById("step1ValidationMsg");
          if (validationMsg) validationMsg.textContent = "";
          
          return;
        }
        options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        selectedSegment = opt.innerText;
        const btn = document.getElementById("step1Next");
        if (btn) btn.disabled = false;
        
        // Clear validation message when making a selection
        const validationMsg = document.getElementById("step1ValidationMsg");
        if (validationMsg) validationMsg.textContent = "";
        
        // Clear tooltip when selection is made
        const tooltip = document.getElementById("step1Tooltip");
        if (tooltip) tooltip.textContent = "";
      } else {
        const label = opt.innerText;
        opt.classList.toggle("selected");
        if (selectedKPIs.has(label)) {
          selectedKPIs.delete(label);
        } else {
          selectedKPIs.add(label);
        }
        
        updateKpiCounter();
        
        const btn = document.getElementById("step2Next");
        if (btn) btn.disabled = (selectedKPIs.size === 0);
        
        // Clear validation message when making changes
        const validationMsg = document.getElementById("step2ValidationMsg");
        if (validationMsg) validationMsg.textContent = "";
        
        // Clear tooltip when selection is made
        const tooltip = document.getElementById("step2Tooltip");
        if (tooltip) tooltip.textContent = "";
      }
    });
  });
});

// Language toggle
langToggle.addEventListener("click", () => {
  const currentLang = langLabel.textContent;
  langLabel.textContent = currentLang === "DE" ? "EN" : "DE";
});

function downloadResult() {
  const content = "Dies ist ein Platzhalter-Ergebnis.";
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ergebnis.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Event listeners for dropzones
const dropzones = document.querySelectorAll(".dropzone");
if (dropzones.length) {
  dropzones.forEach(dropzone => {
    ["dragenter", "dragover"].forEach(evt =>
      dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      })
    );
    ["dragleave", "drop"].forEach(evt =>
      dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
      })
    );
  });
}

// Validation for Step 1 Next button
document.getElementById("step1Next").addEventListener("click", () => {
  const tooltip = document.getElementById("step1Tooltip");
  const popup = document.getElementById("step1Popup");
  
  if (!selectedSegment) {
    if (tooltip) tooltip.textContent = "Bitte wählen Sie ein Segment aus.";
    
    // Show popup message
    if (popup) {
      popup.classList.add("show");
      // Hide popup after 3 seconds
      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }
    
    return;
  }
  
  // Clear tooltip when proceeding
  if (tooltip) tooltip.textContent = "";
  nextStep();
});

// Validation for Step 2 Next button
document.getElementById("step2Next").addEventListener("click", () => {
  const tooltip = document.getElementById("step2Tooltip");
  const popup = document.getElementById("step2Popup");
  
  if (selectedKPIs.size === 0) {
    if (tooltip) tooltip.textContent = "Bitte wählen Sie mindestens eine KPI aus.";
    
    // Show popup message
    if (popup) {
      popup.classList.add("show");
      // Hide popup after 3 seconds
      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }
    
    return;
  }
  
  // Clear tooltip when proceeding
  if (tooltip) tooltip.textContent = "";
  nextStep();
});

// Initialize the first step
showStep(currentStep);