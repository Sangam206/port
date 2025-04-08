// DOM Elements
const header = document.getElementById("header")
const themeToggle = document.getElementById("theme-toggle")
const themeToggleMobile = document.getElementById("theme-toggle-mobile")
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileNav = document.querySelector(".mobile-nav")
const navLinks = document.querySelectorAll(".nav-link")
const tabBtns = document.querySelectorAll(".tab-btn")
const tabPanes = document.querySelectorAll(".tab-pane")
const backToTopBtn = document.getElementById("back-to-top")
const contactForm = document.getElementById("contactForm")
const currentYearSpan = document.getElementById("current-year")

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear()

// Theme Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode")

  const isDarkMode = document.body.classList.contains("dark-mode")
  localStorage.setItem("darkMode", isDarkMode)

  // Update icons
  const themeIcon = isDarkMode ? "fa-sun" : "fa-moon"
  themeToggle.innerHTML = `<i class="fas ${themeIcon}"></i>`
  themeToggleMobile.innerHTML = `<i class="fas ${themeIcon}"></i>`
}

// Check for saved theme preference
window.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true"
  if (savedDarkMode) {
    document.body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>'
  }
})

themeToggle.addEventListener("click", toggleDarkMode)
themeToggleMobile.addEventListener("click", toggleDarkMode)

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open")

  // Animate hamburger to X
  const bars = mobileMenuBtn.querySelectorAll(".bar")
  if (mobileNav.classList.contains("open")) {
    bars[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    bars[1].style.opacity = "0"
    bars[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    bars[0].style.transform = "none"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "none"
  }
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open")

    // Reset hamburger
    const bars = mobileMenuBtn.querySelectorAll(".bar")
    bars[0].style.transform = "none"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "none"
  })
})

// Tabs functionality
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and panes
    tabBtns.forEach((b) => b.classList.remove("active"))
    tabPanes.forEach((p) => p.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Show corresponding tab pane
    const tabId = btn.getAttribute("data-tab")
    document.getElementById(tabId).classList.add("active")
  })
})

// Scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }

  // Header shadow on scroll
  if (window.scrollY > 50) {
    header.style.boxShadow = "var(--shadow-md)"
  } else {
    header.style.boxShadow = "var(--shadow)"
  }

  // Update active nav link based on scroll position
  const scrollPosition = window.scrollY + 100

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Form submission (prevent default for demo)
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for your message! This is a demo form, so no message was actually sent.")
    contactForm.reset()
  })
}

// Add placeholder images if real images aren't available
document.addEventListener("DOMContentLoaded", () => {
  // Project images
  const projectImages = document.querySelectorAll(".project-image img")
  projectImages.forEach((img, index) => {
    if (img.getAttribute("src").includes("project-")) {
      img.setAttribute("src", `https://source.unsplash.com/random/600x400?tech,${index}`)
    }
  })

  // Blog images
  const blogImages = document.querySelectorAll(".blog-image img")
  blogImages.forEach((img, index) => {
    if (img.getAttribute("src").includes("blog-")) {
      img.setAttribute("src", `https://source.unsplash.com/random/600x400?coding,${index}`)
    }
  })
})

