// Function to handle language change
function changeLanguage(selectedLanguage) {
    // Get the current page name (without the file extension)
    const currentUrl = window.location.href;
    const currentPage = currentUrl.substring(currentUrl.lastIndexOf("/") + 1, currentUrl.lastIndexOf("."));

    // Define a mapping between English and Portuguese pages
    const languageMap = {
        "living-with-fatigue-and-pain": {
            "en": "living-with-fatigue-and-pain-en.html",
            "pt": "living-with-fatigue-and-pain-pt.html"
        },
        "reporter-with-repetitive-stress-injury": {
            "en": "reporter-with-repetitive-stress-injury-en.html",
            "pt": "reporter-with-repetitive-stress-injury-pt.html"
        },
        "retiree-with-low-vision-hand-tremor": {
            "en": "retiree-with-low-vision-hand-tremor-en.html",
            "pt": "retiree-with-low-vision-hand-tremor-pt.html"
        }
    };

    // Check the current page in the languageMap and redirect accordingly
    if (languageMap[currentPage]) {
        const targetPage = languageMap[currentPage][selectedLanguage];
        if (targetPage) {
            window.location.href = targetPage;  // Redirect to the selected language page
        }
    }
}

// Function to toggle language dropdown visibility
function toggleDropdown(dropdownBox) {
    const isExpanded = dropdownBox.style.display === 'block';
    dropdownBox.style.display = isExpanded ? 'none' : 'block';
}

// Attach event listeners to language selection
function attachLanguageHandlers() {
    const languagesDropdown = document.getElementById("dropdown-box-languages");
    const englishOption = languagesDropdown.querySelector("li:nth-child(1)");
    const portugueseOption = languagesDropdown.querySelector("li:nth-child(2)");

    // Click event listeners for language options
    englishOption.addEventListener("click", () => {
        changeLanguage("en");  // Change to English
    });

    portugueseOption.addEventListener("click", () => {
        changeLanguage("pt");  // Change to Portuguese
    });
}

// Function to handle the visibility of the languages dropdown
function setupLanguageDropdown() {
    const languageBox = document.getElementById("box2");  // The Languages tab
    const languagesDropdown = document.getElementById("dropdown-box-languages");

    // Toggle the dropdown when clicking the Languages tab
    languageBox.addEventListener("click", () => {
        toggleDropdown(languagesDropdown);
    });

    // Attach language handlers after initializing the dropdown
    attachLanguageHandlers();
}

// Initialize language dropdown on page load
setupLanguageDropdown();
