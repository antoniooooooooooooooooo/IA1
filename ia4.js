// Function to toggle dropdown visibility
function toggleDropdown(dropdownBox) {
    const isExpanded = dropdownBox.style.display === 'block';
    dropdownBox.style.display = isExpanded ? 'none' : 'block';
}

// Function to close dropdown
function closeDropdown(dropdownBox) {
    dropdownBox.style.display = 'none';
}

// Utility function to handle dropdown click and keydown events
function attachDropdownHandlers(triggerId, dropdownId) {
    const triggerElement = document.getElementById(triggerId);
    const dropdownBox = document.getElementById(dropdownId);

    // Click event to toggle dropdown
    triggerElement.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent triggering the document click handler
        toggleDropdown(dropdownBox);
    });

    // Keyboard events for 'Enter' and 'Space' to toggle the dropdown
    triggerElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent default scrolling behavior with space
            toggleDropdown(dropdownBox); // Toggle the dropdown visibility
        } else if (event.key === "Tab") {
            closeDropdown(dropdownBox); // Close the dropdown if Tab is pressed
        }
    });

    // Click outside of the dropdown to close it
    document.addEventListener("click", (event) => {
        // Check if the clicked target is outside the dropdown and the trigger
        if (!triggerElement.contains(event.target) && !dropdownBox.contains(event.target)) {
            closeDropdown(dropdownBox);
        }
    });
}

// Handle navigation within dropdowns (for items inside dropdowns)
function handleDropdownNavigation() {
    document.querySelectorAll('#dropdown-box-cards li, #dropdown-box-languages li').forEach(item => {
        item.setAttribute('tabindex', '0'); // Make list items focusable

        item.addEventListener('keydown', (event) => {
            const dropdownBox = item.closest('.dropdown-box'); // Get parent dropdown
            if (event.key === "ArrowDown") {
                const next = item.nextElementSibling || item.parentElement.firstElementChild;
                next.focus();
            } else if (event.key === "ArrowUp") {
                const prev = item.previousElementSibling || item.parentElement.lastElementChild;
                prev.focus();
            } else if (event.key === "Tab") {
                closeDropdown(dropdownBox);
            }
        });
    });
}

// Slider control and font size adjustment
function initializeSlider() {
    document.querySelectorAll('.line.large-line').forEach(line => {
        const knob = line.querySelector('.slider-knob');
        const sectionTitle = document.querySelector('.section-title');
        const sectionText = document.querySelector('.section-text');
        const fontSizeDisplay = document.getElementById('font-size-display');

        const updateFontSize = (percentage) => {
            const minFontSize = 14;
            const maxFontSize = 28;
            const newFontSize = Math.round(minFontSize + (percentage * (maxFontSize - minFontSize) / 100));
            sectionText.style.fontSize = `${newFontSize}px`;
            fontSizeDisplay.textContent = `${newFontSize}px`;
            sectionTitle.style.fontSize = `${newFontSize * 1.5}px`;
        };

        const updateKnobPosition = (x) => {
            const lineRect = line.getBoundingClientRect();
            const lineWidth = line.offsetWidth;
            const offset = Math.min(Math.max(x - lineRect.left, 0), lineWidth);
            const percentage = (offset / lineWidth) * 100;
            knob.style.left = `${percentage}%`;
            updateFontSize(percentage);
        };

        knob.addEventListener('mousedown', (e) => {
            const onMouseMove = (event) => updateKnobPosition(event.clientX);
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        line.addEventListener('click', (e) => updateKnobPosition(e.clientX));

        knob.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                updateKnobPosition(knob.getBoundingClientRect().left - 10);
            } else if (event.key === 'ArrowRight') {
                updateKnobPosition(knob.getBoundingClientRect().left + 10);
            }
        });

        // Initialize the slider
        const initialFontSize = parseInt(getComputedStyle(sectionText).fontSize);
        const initialPercentage = ((initialFontSize - 14) / (28 - 14)) * 100;
        knob.style.left = `${initialPercentage}%`;
        fontSizeDisplay.textContent = `${initialFontSize}px`;
        updateFontSize(initialPercentage);
    });
}

// Tab navigation and focus management
function setupTabNavigation() {
    document.querySelectorAll('[role="tab"]').forEach((tab, index, tabs) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            tab.setAttribute('aria-selected', 'true');
        });

        tab.addEventListener('keydown', (event) => {
            let nextIndex;
            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                tab.click();
                return;
            } else {
                return;
            }
            tabs[nextIndex].focus();
            event.preventDefault();
        });
    });
}

// Function to set focus to the relevant section
function focusSection(tabId, sectionId) {
    const tab = document.getElementById(tabId);
    const section = document.getElementById(sectionId);

    tab.addEventListener('click', () => {
        section.focus(); // Set focus to the section when the tab is clicked
    });
}

// Add focus style when Tab key is used
let isTabPressed = false;
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        isTabPressed = true;
    }
});

// Change background color on focus for tab elements
function addFocusStyle(event) {
    if (isTabPressed) {
        event.target.style.backgroundColor = '#d08e8e'; // Change background color
    }
}

function removeFocusStyle(event) {
    event.target.style.backgroundColor = '#F5F2D9'; // Restore original background color
}

// Reset Tab key flag when focus changes
document.addEventListener('focusin', () => { isTabPressed = false; });

// Apply focus styles to specific elements
['box1', 'box2', 'box3'].forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('focus', addFocusStyle, true);
    element.addEventListener('blur', removeFocusStyle, true);
});

// Attach dropdown handlers and manage focus for box elements
['box1', 'box2'].forEach((boxId, index) => {
    const dropdownId = index === 0 ? 'dropdown-box-cards' : 'dropdown-box-languages';
    attachDropdownHandlers(boxId, dropdownId);
});

// Initialize dropdown navigation, slider functionality, and tab navigation
handleDropdownNavigation();
initializeSlider();
setupTabNavigation();

// Focus management for tab-section links
focusSection("box1", "section1");
focusSection("box2", "section2");
focusSection("box3", "section3");

function initializeSlider() {
    document.querySelectorAll('.line.large-line').forEach(line => {
        const knob = line.querySelector('.slider-knob');
        const sectionTitle = document.querySelector('.section-title');
        const sectionText = document.querySelector('.section-text');
        const fontSizeDisplay = document.getElementById('font-size-display');

        const updateFontSize = (percentage) => {
            const minFontSize = 14;
            const maxFontSize = 28;
            const newFontSize = Math.round(minFontSize + (percentage * (maxFontSize - minFontSize) / 100));
            sectionText.style.fontSize = `${newFontSize}px`;
            fontSizeDisplay.textContent = `${newFontSize}px`;
            sectionTitle.style.fontSize = `${newFontSize * 1.5}px`;
        };

        const updateKnobPosition = (x) => {
            const lineRect = line.getBoundingClientRect();
            const lineWidth = line.offsetWidth;
            const offset = Math.min(Math.max(x - lineRect.left, 0), lineWidth);
            const percentage = (offset / lineWidth) * 100;
            knob.style.left = `${percentage}%`;
            updateFontSize(percentage);
        };

        // Mouse events
        knob.addEventListener('mousedown', (e) => {
            const onMouseMove = (event) => updateKnobPosition(event.clientX);
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        line.addEventListener('click', (e) => updateKnobPosition(e.clientX));

        knob.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                updateKnobPosition(knob.getBoundingClientRect().left - 10);
            } else if (event.key === 'ArrowRight') {
                updateKnobPosition(knob.getBoundingClientRect().left + 10);
            }
        });

        // Touch events for mobile devices
        let touchStartX = 0;
        let isTouching = false;

        knob.addEventListener('touchstart', (e) => {
            isTouching = true;
            touchStartX = e.touches[0].clientX; // Store initial touch position
        });

        knob.addEventListener('touchmove', (e) => {
            if (isTouching) {
                const touchMoveX = e.touches[0].clientX; // Current touch position
                updateKnobPosition(touchMoveX); // Update knob position based on touch
            }
        });

        knob.addEventListener('touchend', () => {
            isTouching = false; // End touch interaction
        });

        // Initialize the slider
        const initialFontSize = parseInt(getComputedStyle(sectionText).fontSize);
        const initialPercentage = ((initialFontSize - 14) / (28 - 14)) * 100;
        knob.style.left = `${initialPercentage}%`;
        fontSizeDisplay.textContent = `${initialFontSize}px`;
        updateFontSize(initialPercentage);
    });
}
