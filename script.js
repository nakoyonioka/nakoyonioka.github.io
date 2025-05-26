document.addEventListener("DOMContentLoaded", () => {
  // Toggle mobile navigation
  const navbarBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");
  const navbar = document.querySelector(".navbar");
  const navbarItems = document.querySelectorAll(".navbar-menu .navbar-item"); // Select all navbar items

  navbarBurger.addEventListener("click", () => {
    navbarBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });

  // Close mobile menu when a navbar item is clicked
  navbarItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Check if the menu is active (i.e., it's a mobile view interaction)
      if (navbarMenu.classList.contains("is-active")) {
        navbarBurger.classList.remove("is-active");
        navbarMenu.classList.remove("is-active");
      }
    });
  });

  // Close mobile menu when clicking anywhere outside the navbar burger or menu
  document.addEventListener("click", (event) => {
    const isClickInsideNavbarBurger = navbarBurger.contains(event.target);
    const isClickInsideNavbarMenu = navbarMenu.contains(event.target);

    // If the menu is active and the click is outside both the burger and the menu
    if (
      navbarMenu.classList.contains("is-active") &&
      !isClickInsideNavbarBurger &&
      !isClickInsideNavbarMenu
    ) {
      navbarBurger.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
    }
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

  const customSelect = document.querySelector(".custom-select");

  // Only proceed if the custom select element actually exists in the DOM
  if (customSelect) {
    const selectedValueDisplay = customSelect.querySelector(".selected-value");
    const optionsList = customSelect.querySelector(".options-list");
    const hiddenSubjectSelect = document.getElementById(
      "hidden-subject-select"
    );
    const options = optionsList.querySelectorAll(".option");

    // Function to close the dropdown
    const closeDropdown = () => {
      customSelect.classList.remove("is-open");
      optionsList.style.display = "none";
      customSelect.setAttribute("aria-expanded", "false"); // Accessibility
    };

    // Toggle dropdown visibility on click
    customSelect.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent document click from closing immediately
      const isOpen = customSelect.classList.contains("is-open");
      if (isOpen) {
        closeDropdown();
      } else {
        // Close any other open dropdowns first (if you add more)
        document
          .querySelectorAll(".custom-select.is-open")
          .forEach((openSelect) => {
            if (openSelect !== customSelect) {
              openSelect.classList.remove("is-open");
              openSelect.querySelector(".options-list").style.display = "none";
              openSelect.setAttribute("aria-expanded", "false");
            }
          });

        customSelect.classList.add("is-open");
        optionsList.style.display = "block";
        customSelect.setAttribute("aria-expanded", "true"); // Accessibility
        // Optional: Scroll to make sure it's visible if it opens off-screen
        optionsList.scrollTop =
          optionsList.querySelector(".option.selected")?.offsetTop -
            optionsList.offsetTop || 0;
      }
    });

    // Handle option selection
    options.forEach((option) => {
      option.addEventListener("click", () => {
        const newValue = option.dataset.value;
        const newText = option.textContent;

        selectedValueDisplay.textContent = newText;
        hiddenSubjectSelect.value = newValue; // Update the hidden select for form submission

        // Remove 'selected' class from all options and add to the clicked one
        options.forEach((o) => o.classList.remove("selected"));
        option.classList.add("selected");

        // --- IMPORTANT CHANGE HERE ---
        // Delay the closeDropdown to ensure all updates are processed
        setTimeout(() => {
          closeDropdown();
        }, 50); // A small delay, like 50 milliseconds

        // Trigger change event on hidden select for form validation/listeners
        const changeEvent = new Event("change");
        hiddenSubjectSelect.dispatchEvent(changeEvent);
      });
    });

    // Close dropdown when clicking outside (already there, but good to re-confirm)
    document.addEventListener("click", (event) => {
      if (!customSelect.contains(event.target)) {
        closeDropdown();
      }
    });

    // Initialize selected value (if any option is pre-selected in the HTML)
    const initialSelectedOption =
      hiddenSubjectSelect.querySelector("option:checked");
    if (initialSelectedOption && initialSelectedOption.value !== "") {
      selectedValueDisplay.textContent = initialSelectedOption.textContent;
      // Also apply 'selected' class to the corresponding custom option
      const matchingCustomOption = optionsList.querySelector(
        `.option[data-value="${initialSelectedOption.value}"]`
      );
      if (matchingCustomOption) {
        matchingCustomOption.classList.add("selected");
      }
    } else {
      // Ensure the "Select a topic" custom option is not marked as selected initially
      options.forEach((o) => o.classList.remove("selected"));
    }

    customSelect.addEventListener("keydown", (e) => {
      const isDropdownOpen = customSelect.classList.contains("is-open");
      let currentIndex = Array.from(options).findIndex((o) =>
        o.classList.contains("selected")
      );
      if (currentIndex === -1 && options.length > 0) currentIndex = 0; // Default to first if none selected

      switch (e.key) {
        case "Enter":
        case " ": // Spacebar
          if (isDropdownOpen) {
            if (options[currentIndex]) {
              options[currentIndex].click(); // Simulate click on the selected option
            }
          } else {
            customSelect.click(); // Open the dropdown
          }
          e.preventDefault(); // Prevent default scroll/form submit
          break;
        case "Escape":
          closeDropdown();
          e.preventDefault();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isDropdownOpen) {
            customSelect.click(); // Open dropdown
          } else {
            currentIndex = (currentIndex + 1) % options.length;
            options.forEach((o) => o.classList.remove("selected"));
            options[currentIndex].classList.add("selected");
            options[currentIndex].scrollIntoView({ block: "nearest" }); // Scroll into view
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isDropdownOpen) {
            customSelect.click(); // Open dropdown
          } else {
            currentIndex = (currentIndex - 1 + options.length) % options.length;
            options.forEach((o) => o.classList.remove("selected"));
            options[currentIndex].classList.add("selected");
            options[currentIndex].scrollIntoView({ block: "nearest" }); // Scroll into view
          }
          break;
      }
    });
  }
});
