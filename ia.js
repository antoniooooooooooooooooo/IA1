// JavaScript for dynamic font resizing
const slider = document.getElementById('font-slider');

// Initialize the CSS variable for the slider fill
slider.style.setProperty('--value', slider.value + '%');

// Update the font size dynamically and fill effect
slider.addEventListener('input', function () {
    // Update the CSS variable with the current value of the slider
   
    // Update the font size dynamically
    document.documentElement.style.setProperty('--base-font-size', this.value + '%');
});
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
    });
});
