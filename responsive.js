// Responsive JavaScript - Add this to your existing JS

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  if (mobileMenuToggle && sidebar) {
    // Toggle sidebar on mobile menu click
    mobileMenuToggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event from bubbling to document
      sidebar.classList.toggle("active");
      document.body.classList.toggle("sidebar-open");

      // Toggle menu icon
      const menuIcon = mobileMenuToggle.querySelector("i");
      if (sidebar.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
      } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !sidebar.contains(e.target) &&
        !mobileMenuToggle.contains(e.target) &&
        sidebar.classList.contains("active")
      ) {
        sidebar.classList.remove("active");
        document.body.classList.remove("sidebar-open");

        // Reset menu icon
        const menuIcon = mobileMenuToggle.querySelector("i");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });

    // Close sidebar when clicking on a navigation link
    const navLinks = document.querySelectorAll(".sidebar-nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("active");
          document.body.classList.remove("sidebar-open");

          // Reset menu icon
          const menuIcon = mobileMenuToggle.querySelector("i");
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      });
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      document.body.classList.remove("sidebar-open");

      // Reset menu icon
      const menuIcon = mobileMenuToggle.querySelector("i");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });

  // Initialize sidebar state based on screen size
  if (window.innerWidth <= 768) {
    sidebar.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }
});
