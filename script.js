// ====================================
// Navigation & Menu Toggle
// ====================================

const navbar = document.getElementById("navbar")
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50)
})

// ====================================
// Active Navigation Link on Scroll
// ====================================

const sections = document.querySelectorAll("section")

function setActiveLink() {
  let current = ""
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id
    }
  })

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    )
  })
}

window.addEventListener("scroll", setActiveLink)

// ====================================
// Typing Animation
// ====================================

const typingText = document.getElementById("typingText")
const words = ["Data Scientist", "AI & ML Engineer", "Problem Solver", "Tech Enthusiast"]
let wordIndex = 0
let charIndex = 0
let deleting = false

function typeEffect() {
  const word = words[wordIndex]

  if (deleting) {
    typingText.textContent = word.substring(0, charIndex--)
  } else {
    typingText.textContent = word.substring(0, charIndex++)
  }

  if (!deleting && charIndex === word.length) {
    deleting = true
    setTimeout(typeEffect, 1500)
    return
  }

  if (deleting && charIndex === 0) {
    deleting = false
    wordIndex = (wordIndex + 1) % words.length
  }

  setTimeout(typeEffect, deleting ? 50 : 120)
}

window.addEventListener("load", typeEffect)

// ====================================
// Scroll Reveal
// ====================================

function revealOnScroll() {
  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 150) {
      el.classList.add("active")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)
window.addEventListener("load", revealOnScroll)

// ====================================
// Skill Bar Animation
// ====================================

function animateSkillBars() {
  document.querySelectorAll(".skill-progress").forEach((bar) => {
    if (
      bar.getBoundingClientRect().top < window.innerHeight - 100 &&
      !bar.classList.contains("animated")
    ) {
      bar.style.width = bar.dataset.progress + "%"
      bar.classList.add("animated")
    }
  })
}

window.addEventListener("scroll", animateSkillBars)
window.addEventListener("load", animateSkillBars)

// ====================================
// Contact Form Validation + AJAX Submit
// ====================================

const contactForm = document.getElementById("contactForm")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const subjectInput = document.getElementById("subject")
const messageInput = document.getElementById("message")
const successMessage = document.getElementById("successMessage")

const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const subjectError = document.getElementById("subjectError")
const messageError = document.getElementById("messageError")

function showError(el, msg) {
  el.textContent = msg
  el.style.color = "#ff4444"
}

function clearError(el) {
  el.textContent = ""
}

function validateName() {
  if (nameInput.value.trim().length < 2) {
    showError(nameError, "Name must be at least 2 characters")
    return false
  }
  clearError(nameError)
  return true
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(emailInput.value.trim())) {
    showError(emailError, "Enter a valid email")
    return false
  }
  clearError(emailError)
  return true
}

function validateSubject() {
  if (subjectInput.value.trim().length < 3) {
    showError(subjectError, "Subject must be at least 3 characters")
    return false
  }
  clearError(subjectError)
  return true
}

function validateMessage() {
  if (messageInput.value.trim().length < 10) {
    showError(messageError, "Message must be at least 10 characters")
    return false
  }
  clearError(messageError)
  return true
}

// Real-time validation
nameInput.addEventListener("blur", validateName)
emailInput.addEventListener("blur", validateEmail)
subjectInput.addEventListener("blur", validateSubject)
messageInput.addEventListener("blur", validateMessage)

// ✅ AJAX Submit (FIXED)
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (
    !validateName() ||
    !validateEmail() ||
    !validateSubject() ||
    !validateMessage()
  ) return

  const formData = new FormData(contactForm)

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.success) {
      successMessage.classList.add("show")
      contactForm.reset()

      setTimeout(() => {
        successMessage.classList.remove("show")
      }, 5000)
    } else {
      alert("Form submission failed.")
    }
  } catch (err) {
    alert("Network error. Try again later.")
  }
})

// ====================================
// Smooth Scrolling
// ====================================

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const target = document.querySelector(link.getAttribute("href"))
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      })
    }
  })
})
