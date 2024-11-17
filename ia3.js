document.querySelectorAll('.line.large-line').forEach(line => {
    const knob = line.querySelector('.slider-knob');
    const lineRect = line.getBoundingClientRect();
    const lineWidth = line.offsetWidth;
    const bodyText = document.getElementById('body-text');
    const bodyText2 = document.querySelector('.body-text2');
    const fontSizeDisplay = document.getElementById('font-size-display');

    // Helper function to calculate font size based on slider position
    const updateFontSize = (percentage) => {
        const minFontSize = 14; // Minimum font size in px
        const maxFontSize = 28; // Maximum font size in px
        const newFontSize = Math.round(minFontSize + (percentage * (maxFontSize - minFontSize) / 100));

        // Update body text font size
        bodyText.style.fontSize = `${newFontSize}px`;
        fontSizeDisplay.textContent = `${newFontSize}px`; // Update font size display

        // Update bodyText2 to always be 20% larger than bodyText
        const bodyText2FontSize = newFontSize * 1.4; // 20% larger
        bodyText2.style.fontSize = `${bodyText2FontSize}px`;
    };

    const updateKnobPosition = (x) => {
        const offset = Math.min(Math.max(x - lineRect.left, 0), lineWidth);
        const percentage = (offset / lineWidth) * 100;
        knob.style.left = `${percentage}%`;
        updateFontSize(percentage);
    };

    knob.addEventListener('mousedown', (e) => {
        const onMouseMove = (event) => {
            updateKnobPosition(event.clientX);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    line.addEventListener('click', (e) => {
        updateKnobPosition(e.clientX);
    });

    // Initialize the slider and font size display with the current size
    const initialFontSize = parseInt(getComputedStyle(bodyText).fontSize);
    const initialPercentage = ((initialFontSize - 14) / (28 - 14)) * 100; // Calculate initial percentage
    knob.style.left = `${initialPercentage}%`;
    fontSizeDisplay.textContent = `${initialFontSize}px`;

    // Update initial font sizes
    updateFontSize(initialPercentage);
});
