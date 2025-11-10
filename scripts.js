    
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    // accessibility: indicate whether menu is visible
    mobileMenu.setAttribute("aria-hidden", String(!isActive));
});