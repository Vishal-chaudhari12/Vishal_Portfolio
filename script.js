// Sticky Header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

mobileMenuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("sidebar-active");
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (
    !sidebar.contains(e.target) &&
    !mobileMenuToggle.contains(e.target) &&
    sidebar.classList.contains("active")
  ) {
    sidebar.classList.remove("active");
    mainContent.classList.remove("sidebar-active");
  }
});

// Close sidebar when clicking on a navigation link on mobile
const sidebarNavLinks = document.querySelectorAll(".sidebar-nav a");
sidebarNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
      mainContent.classList.remove("sidebar-active");
    }
  });
});

// Active Navigation Link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar-nav a");

const setActiveLink = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", setActiveLink);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Typing Animation
const typingElement = document.querySelector(".typing");
const words = JSON.parse(typingElement.getAttribute("data-words"));
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typingDelay = 1000; // Pause at the end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingDelay = 500; // Pause before starting new word
  } else {
    typingDelay = isDeleting ? 50 : 100;
  }

  setTimeout(type, typingDelay);
}

// Start typing animation
type();

// Scroll Animation
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-text");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Initial check for elements in view
animateOnScroll();

// Check for elements in view on scroll
window.addEventListener("scroll", animateOnScroll);

// Form Submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Here you would typically send the form data to a server
    // For now, we'll just log it and show a success message
    console.log("Form submitted:", { name, email, subject, message });

    // Show success message
    alert("Thank you for your message! I will get back to you soon.");

    // Reset form
    contactForm.reset();
  });
}

// Add CSS for notifications
const style = document.createElement("style");
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background-color: #4CAF50;
    }
    
    .notification.error {
        background-color: #f44336;
    }
`;
document.head.appendChild(style);

// Add animation classes to elements
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to sections
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("animate-on-scroll");
  });

  // Add animation classes to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.add("animate-on-scroll");
  });

  // Add animation classes to skill items
  document.querySelectorAll(".skill-item").forEach((item) => {
    item.classList.add("animate-on-scroll");
  });
});

// Show/Hide Project Details
const showMoreButtons = document.querySelectorAll(".show-more-btn");
showMoreButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const projectContent = this.parentElement;
    const projectDescription = projectContent.querySelector("p");

    if (projectDescription.style.maxHeight) {
      projectDescription.style.maxHeight = null;
      this.textContent = "Show More";
    } else {
      projectDescription.style.maxHeight =
        projectDescription.scrollHeight + "px";
      this.textContent = "Show Less";
    }
  });
});
