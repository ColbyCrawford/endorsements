const body = document.querySelector("body")
const themeToggle = document.getElementById("theme-toggle")
const logo = document.getElementById("logo")

themeToggle.addEventListener("click", function() {
    let isDarkModeEnabled = themeToggle.checked;

    if (isDarkModeEnabled) {
        logo.setAttribute("src", "/assets/images/logo-light.svg")
    } else {
        logo.setAttribute("src", "/assets/images/logo-dark.svg")
    }
    
    body.classList.toggle("theme-dark")
})
