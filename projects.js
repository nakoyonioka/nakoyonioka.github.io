// ============================================
// AUDIO AMPLIFIER PROJECT JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // NAVIGATION FUNCTIONALITY
  // ============================================

  // Mobile menu toggle
  const navbarBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");

  if (navbarBurger && navbarMenu) {
    navbarBurger.addEventListener("click", function () {
      navbarBurger.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navbarMenu.classList.contains("is-active")) {
          navbarBurger.classList.remove("is-active");
          navbarMenu.classList.remove("is-active");
        }
      }
    });
  });

  // ============================================
  // SPEC CARDS INTERACTION
  // ============================================

  // Animate spec bars on scroll
  const specRows = document.querySelectorAll(".spec-row");
  const animateSpecs = () => {
    specRows.forEach((row) => {
      const rect = row.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        const specFill = row.querySelector(".spec-fill");
        if (specFill && !specFill.classList.contains("animated")) {
          specFill.classList.add("animated");
          const targetWidth = specFill.style.width;
          specFill.style.width = "0%";

          setTimeout(() => {
            specFill.style.width = targetWidth;
          }, 200);
        }
      }
    });
  };

  // Spec row hover effects
  specRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      const specValue = this.querySelector(".spec-value");
      const specLabel = this.querySelector(".spec-label");

      specValue.style.transform = "scale(1.05)";
      specLabel.style.color = "var(--accent-green)";
    });

    row.addEventListener("mouseleave", function () {
      const specValue = this.querySelector(".spec-value");
      const specLabel = this.querySelector(".spec-label");

      specValue.style.transform = "scale(1)";
      specLabel.style.color = "var(--text-secondary)";
    });
  });

  // ============================================
  // TIMELINE INTERACTION
  // ============================================

  const timelineItems = document.querySelectorAll(".timeline-item");
  let activeTimelineIndex = 0;

  // Timeline auto-progression
  const progressTimeline = () => {
    timelineItems.forEach((item) => item.classList.remove("active"));

    if (timelineItems[activeTimelineIndex]) {
      timelineItems[activeTimelineIndex].classList.add("active");
      activeTimelineIndex = (activeTimelineIndex + 1) % timelineItems.length;
    }
  };

  // Start timeline progression when section is visible
  let timelineInterval;
  const startTimelineProgression = () => {
    if (!timelineInterval) {
      timelineInterval = setInterval(progressTimeline, 3000);
    }
  };

  const stopTimelineProgression = () => {
    if (timelineInterval) {
      clearInterval(timelineInterval);
      timelineInterval = null;
    }
  };

  // Timeline item click handlers
  timelineItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      stopTimelineProgression();
      timelineItems.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      activeTimelineIndex = (index + 1) % timelineItems.length;

      // Restart auto-progression after user interaction
      setTimeout(startTimelineProgression, 5000);
    });

    item.addEventListener("mouseenter", function () {
      stopTimelineProgression();
    });

    item.addEventListener("mouseleave", function () {
      setTimeout(startTimelineProgression, 2000);
    });
  });

  // ============================================
  // DESIGN CONSIDERATIONS CATEGORY SWITCHING
  // ============================================

  const categoryButtons = document.querySelectorAll(".category-btn");
  const considerationCards = document.querySelectorAll(".consideration-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetCategory = this.getAttribute("data-category");

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Update active card
      considerationCards.forEach((card) => {
        card.classList.remove("active");
        if (card.getAttribute("data-category") === targetCategory) {
          card.classList.add("active");
        }
      });

      // Add subtle animation feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // ============================================
  // COMPONENT BADGES TOOLTIPS
  // ============================================

  const componentBadges = document.querySelectorAll(
    ".component-badge[data-tooltip]"
  );

  componentBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
    });

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // ============================================
  // SCROLL ANIMATIONS AND EFFECTS
  // ============================================

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "-50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Special handling for spec animations
        if (entry.target.classList.contains("spec-card")) {
          setTimeout(animateSpecs, 300);
        }

        // Special handling for timeline
        if (entry.target.classList.contains("technical-section")) {
          setTimeout(startTimelineProgression, 1000);
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".glass-box, .spec-card, .technical-section"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================

  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    // Show/hide back to top button
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ============================================
  // ENHANCED BUTTON EFFECTS
  // ============================================

  // Cyber buttons glitch effect
  const cyberButtons = document.querySelectorAll(".btn-cyber");

  cyberButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      const glitch = this.querySelector(".btn-glitch");
      if (glitch) {
        glitch.style.opacity = "0.1";
        glitch.style.animation = "glitch 0.3s ease-in-out";
      }
    });

    button.addEventListener("mouseleave", function () {
      const glitch = this.querySelector(".btn-glitch");
      if (glitch) {
        glitch.style.opacity = "0";
        glitch.style.animation = "none";
      }
    });

    // Click ripple effect
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ============================================
  // PARTICLE SYSTEM ENHANCEMENT
  // ============================================

  // Create additional interactive particles on mouse movement
  let mouseParticles = [];
  const maxMouseParticles = 5;

  document.addEventListener("mousemove", function (e) {
    if (Math.random() > 0.95) {
      // Only create particles occasionally
      createMouseParticle(e.clientX, e.clientY);
    }
  });

  function createMouseParticle(x, y) {
    if (mouseParticles.length >= maxMouseParticles) {
      const oldParticle = mouseParticles.shift();
      if (oldParticle && oldParticle.parentNode) {
        oldParticle.parentNode.removeChild(oldParticle);
      }
    }

    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, var(--accent-green) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: mouseParticleFade 2s ease-out forwards;
        `;

    document.body.appendChild(particle);
    mouseParticles.push(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      const index = mouseParticles.indexOf(particle);
      if (index > -1) {
        mouseParticles.splice(index, 1);
      }
    }, 2000);
  }

  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================

  // Throttle scroll events
  let ticking = false;

  function updateOnScroll() {
    animateSpecs();
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });

  // ============================================
  // ACCESSIBILITY ENHANCEMENTS
  // ============================================

  // Keyboard navigation for interactive elements
  document.addEventListener("keydown", function (e) {
    // Tab navigation for timeline items
    if (
      e.key === "Tab" &&
      document.activeElement.classList.contains("timeline-item")
    ) {
      e.preventDefault();
      const currentIndex = Array.from(timelineItems).indexOf(
        document.activeElement
      );
      const nextIndex = e.shiftKey
        ? (currentIndex - 1 + timelineItems.length) % timelineItems.length
        : (currentIndex + 1) % timelineItems.length;

      timelineItems[nextIndex].focus();
    }

    // Enter/Space to activate timeline items
    if (
      (e.key === "Enter" || e.key === " ") &&
      document.activeElement.classList.contains("timeline-item")
    ) {
      e.preventDefault();
      document.activeElement.click();
    }
  });

  // Make timeline items focusable
  timelineItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute(
      "aria-label",
      `View ${item.querySelector(".timeline-title").textContent} details`
    );
  });

  // ============================================
  // FOOTER YEAR UPDATE
  // ============================================

  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // ============================================
  // ERROR HANDLING
  // ============================================

  window.addEventListener("error", function (e) {
    console.warn(
      "Audio Amplifier Project: Non-critical error occurred:",
      e.error
    );
  });

  // ============================================
  // INITIALIZATION COMPLETE
  // ============================================

  console.log("Audio Amplifier Project: JavaScript initialized successfully");

  // Add loaded class to body for CSS animations
  document.body.classList.add("js-loaded");
});
