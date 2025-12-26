// ====================================
// Navigation & Menu Toggle
// ====================================

const navbar = document.getElementById("navbar")
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Change navbar background on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ====================================
// Active Navigation Link on Scroll
// ====================================

const sections = document.querySelectorAll("section")

function setActiveLink() {
  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", setActiveLink)

// ====================================
// Typing Animation Effect
// ====================================

const typingText = document.getElementById("typingText")
const words = ["Data Scientist", "AI & ML Engineer", "Problem Solver", "Tech Enthusiast"]
let wordIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 150

function typeEffect() {
  const currentWord = words[wordIndex]

  if (isDeleting) {
    // Remove characters
    typingText.textContent = currentWord.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    // Add characters
    typingText.textContent = currentWord.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 150
  }

  // Check if word is complete
  if (!isDeleting && charIndex === currentWord.length) {
    // Pause at end of word
    typingSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    // Move to next word
    isDeleting = false
    wordIndex = (wordIndex + 1) % words.length
    typingSpeed = 500
  }

  setTimeout(typeEffect, typingSpeed)
}

// Start typing effect when page loads
window.addEventListener("load", typeEffect)

// ====================================
// Scroll Reveal Animation
// ====================================

function revealOnScroll() {
  const reveals = document.querySelectorAll(".scroll-reveal")

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    const revealPoint = 150

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)

// Initial check on page load
window.addEventListener("load", revealOnScroll)

// ====================================
// Animate Skill Progress Bars
// ====================================

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    const barTop = bar.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (barTop < windowHeight - 100 && !bar.classList.contains("animated")) {
      bar.style.width = progress + "%"
      bar.classList.add("animated")
    }
  })
}

window.addEventListener("scroll", animateSkillBars)
window.addEventListener("load", animateSkillBars)

// ====================================
// Contact Form Validation
// ====================================

const contactForm = document.getElementById("contactForm")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const subjectInput = document.getElementById("subject")
const messageInput = document.getElementById("message")
const successMessage = document.getElementById("successMessage")

// Error message elements
const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const subjectError = document.getElementById("subjectError")
const messageError = document.getElementById("messageError")

// Validation functions
function validateName() {
  const nameValue = nameInput.value.trim()
  if (nameValue === "") {
    showError(nameError, "Name is required")
    return false
  } else if (nameValue.length < 2) {
    showError(nameError, "Name must be at least 2 characters")
    return false
  } else {
    clearError(nameError)
    return true
  }
}

function validateEmail() {
  const emailValue = emailInput.value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (emailValue === "") {
    showError(emailError, "Email is required")
    return false
  } else if (!emailRegex.test(emailValue)) {
    showError(emailError, "Please enter a valid email")
    return false
  } else {
    clearError(emailError)
    return true
  }
}

function validateSubject() {
  const subjectValue = subjectInput.value.trim()
  if (subjectValue === "") {
    showError(subjectError, "Subject is required")
    return false
  } else if (subjectValue.length < 3) {
    showError(subjectError, "Subject must be at least 3 characters")
    return false
  } else {
    clearError(subjectError)
    return true
  }
}

function validateMessage() {
  const messageValue = messageInput.value.trim()
  if (messageValue === "") {
    showError(messageError, "Message is required")
    return false
  } else if (messageValue.length < 10) {
    showError(messageError, "Message must be at least 10 characters")
    return false
  } else {
    clearError(messageError)
    return true
  }
}

function showError(element, message) {
  element.textContent = message
  element.style.color = "#ff4444"
}

function clearError(element) {
  element.textContent = ""
}

// Real-time validation
nameInput.addEventListener("blur", validateName)
emailInput.addEventListener("blur", validateEmail)
subjectInput.addEventListener("blur", validateSubject)
messageInput.addEventListener("blur", validateMessage)

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Validate all fields
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isSubjectValid = validateSubject()
  const isMessageValid = validateMessage()

  // Check if all validations passed
  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    // Show success message
    successMessage.classList.add("show")

    // Reset form
    contactForm.reset()

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove("show")
    }, 5000)

    // In a real application, you would send the form data to a server here
    console.log("Form submitted successfully!")
    console.log({
      name: nameInput.value,
      email: emailInput.value,
      subject: subjectInput.value,
      message: messageInput.value,
    })
  }
})

// ====================================
// Smooth Scrolling for Navigation Links
// ====================================

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()

    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ====================================
// Initialize on Page Load
// ====================================

window.addEventListener("load", () => {
  // Trigger initial animations
  revealOnScroll()
  animateSkillBars()
  setActiveLink()

  // Add animation class to hero section
  const heroElements = document.querySelectorAll(".fade-in")
  heroElements.forEach((element) => {
    element.style.opacity = "0"
  })

  // Start hero animations
  setTimeout(() => {
    heroElements.forEach((element) => {
      element.style.opacity = "1"
    })
  }, 100)
})
