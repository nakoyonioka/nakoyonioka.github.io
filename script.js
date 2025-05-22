// Toggle mobile navigation
document.addEventListener("DOMContentLoaded", () => {
  const navbarBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");
  const navbar = document.querySelector(".navbar");

  navbarBurger.addEventListener("click", () => {
    navbarBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Adjust scroll threshold as needed
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  });

  // Terminal text animation for the hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = ""; // Clear text for typing effect
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 75); // Adjust typing speed here
      }
    }
    setTimeout(typeWriter, 1000); // Delay before starting typing
  }

  // Create circuit traces animation in hero section
  const heroTraces = document.getElementById("heroTraces");
  if (heroTraces) {
    heroTraces.style.position = "absolute";
    heroTraces.style.top = "0";
    heroTraces.style.left = "0";
    heroTraces.style.width = "100%";
    heroTraces.style.height = "100%";
    heroTraces.style.overflow = "hidden";
    heroTraces.style.zIndex = "1";

    function createCircuitPattern(container, density, opacity) {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.style.position = "absolute";
      svg.style.top = 0;
      svg.style.left = 0;
      svg.style.opacity = opacity;

      for (let i = 0; i < density; i++) {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        const startX = Math.random() * width;
        const startY = Math.random() * height;

        let d = `M${startX},${startY} `;
        let x = startX;
        let y = startY;

        const segments = 5 + Math.floor(Math.random() * 5);
        for (let j = 0; j < segments; j++) {
          const isHorizontal = Math.random() > 0.5;

          if (isHorizontal) {
            x = Math.max(0, Math.min(width, x + (Math.random() * 200 - 100)));
            d += `H${x} `;
          } else {
            y = Math.max(0, Math.min(height, y + (Math.random() * 200 - 100)));
            d += `V${y} `;
          }
        }

        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#4FC3F7");
        path.setAttribute("stroke-width", "2");
        svg.appendChild(path);

        if (Math.random() > 0.5) {
          const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle.setAttribute("cx", x);
          circle.setAttribute("cy", y);
          circle.setAttribute("r", 3 + Math.random() * 2);
          circle.setAttribute("fill", "#4FC3F7");
          svg.appendChild(circle);
        }
      }
      container.appendChild(svg);
    }
    createCircuitPattern(heroTraces, 15, 0.5);
  }

  // Back to top button visibility
  const backToTopBtn = document.getElementById("backToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Portfolio Filtering Logic
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'is-active' from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      // Add 'is-active' to the clicked button
      button.classList.add("is-active");

      const filterValue = button.getAttribute("data-filter");

      projectItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block"; // Show the item
        } else {
          item.style.display = "none"; // Hide the item
        }
      });
    });
  });

  // Add event listener to make project cards clickable
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      // Prevent default link behavior if clicking on the link inside the overlay
      if (event.target.classList.contains("project-link")) {
        return;
      }
      const href = card.getAttribute("data-href");
      if (href) {
        window.location.href = href;
      }
    });
  });

  // Contact Form Submission (using Formspree)
  const contactForm = document.getElementById("contact-form");
  const formMessages = document.getElementById("form-messages");

  if (contactForm && formMessages) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute("action");

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json", // Important for Formspree to return JSON
          },
        });
        if (response.ok) {
          formMessages.classList.remove("error");
          formMessages.classList.add("success");
          formMessages.textContent =
            "Thank you for your message! I will get back to you shortly.";
          contactForm.reset(); // Clear the form
        } else {
          const data = await response.json();
          if (data.errors) {
            formMessages.textContent = data.errors
              .map((error) => error.message)
              .join(", ");
          } else {
            formMessages.textContent =
              "Oops! There was a problem submitting your form.";
          }
          formMessages.classList.remove("success");
          formMessages.classList.add("error");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        formMessages.textContent = "Network error. Please try again later.";
        formMessages.classList.remove("success");
        formMessages.classList.add("error");
      }
    });
  }

  // Set current year in footer
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
