// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const navbarBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");

  navbarBurger.addEventListener("click", () => {
    navbarBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });

  // Smooth scrolling for anchor links (adjusted for relative paths)
  document
    .querySelectorAll('a[href^="../../index.html#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").split("#")[1]; // Get only the ID part
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Close mobile menu if open
          navbarBurger.classList.remove("is-active");
          navbarMenu.classList.remove("is-active");

          // Scroll to target
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
});
