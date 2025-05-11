document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const body = document.body

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.add("dark")
  }

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark")

    // Save theme preference
    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  })

  // Mobile Menu Toggle
  const burgerMenu = document.querySelector(".burger-menu")
  const mainNav = document.querySelector(".main-nav")

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active")
    mainNav.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burgerMenu.classList.remove("active")
      mainNav.classList.remove("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Carousel functionality
  const carouselTrack = document.querySelector(".carousel-track")
  const slides = document.querySelectorAll(".carousel-slide")
  const prevBtn = document.querySelector(".carousel-btn.prev")
  const nextBtn = document.querySelector(".carousel-btn.next")
  const indicators = document.querySelectorAll(".carousel-indicators .indicator")

  if (carouselTrack && slides.length > 0) {
    let currentIndex = 0
    const slideWidth = 100 // 100%

    // Set initial position
    updateCarouselSlides()

    // Previous button click
    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1
      updateCarouselSlides()
    })

    // Next button click
    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0
      updateCarouselSlides()
    })

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index
        updateCarouselSlides()
      })
    })

    // Auto slide every 5 seconds
    let autoSlide = setInterval(() => {
      currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0
      updateCarouselSlides()
    }, 5000)

    // Pause auto slide on hover
    carouselTrack.addEventListener("mouseenter", () => {
      clearInterval(autoSlide)
    })

    carouselTrack.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0
        updateCarouselSlides()
      }, 5000)
    })

    // Update carousel position and indicators
    function updateCarouselSlides() {
      carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active")
        } else {
          indicator.classList.remove("active")
        }
      })
    }

    // Add fade animation to slides
    slides.forEach((slide) => {
      slide.style.opacity = "0"
      slide.style.transition = "opacity 0.5s ease-in-out"
    })

    // Show first slide
    slides[0].style.opacity = "1"

    // Custom animation for slide transition
    function animateSlides() {
      // Hide all slides
      slides.forEach((slide) => {
        slide.style.opacity = "0"
      })

      // Show current slide
      setTimeout(() => {
        slides[currentIndex].style.opacity = "1"
      }, 500)
    }

    // Override default update function
    function updateCarousel() {
      carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`
      animateSlides()

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active")
        } else {
          indicator.classList.remove("active")
        }
      })
    }
  }

  // Form submission
  const contactForm = document.querySelector(".contact-form form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
        alert("Please fill in all required fields.")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
        submitBtn.textContent = "Send Message"
        submitBtn.disabled = false
      }, 1500)
    })
  }

  // Services dropdown functionality
  const servicesLink = document.querySelector(".services-link")
  const servicesMenu = document.querySelector(".services-menu")

  if (servicesLink && servicesMenu) {
    // Toggle menu on click
    servicesLink.addEventListener("click", (e) => {
      e.preventDefault()
      servicesMenu.style.display = servicesMenu.style.display === "block" ? "none" : "block"
      servicesLink.classList.toggle("active")
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!servicesLink.contains(e.target) && !servicesMenu.contains(e.target)) {
        servicesMenu.style.display = "none"
        servicesLink.classList.remove("active")
      }
    })

    // Add hover functionality for desktop
    const servicesDropdown = document.querySelector(".services-dropdown")
    if (servicesDropdown) {
      servicesDropdown.addEventListener("mouseenter", () => {
        if (window.innerWidth > 768) {
          servicesMenu.style.display = "block"
          servicesLink.classList.add("active")
        }
      })

      servicesDropdown.addEventListener("mouseleave", () => {
        if (window.innerWidth > 768) {
          servicesMenu.style.display = "none"
          servicesLink.classList.remove("active")
        }
      })
    }
  }

  // Add active state for current page
  const currentPath = window.location.pathname
  const navLinks2 = document.querySelectorAll(".top-nav a, .top-services a")

  navLinks2.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active")
    }
  })
})

// Region Selector
const regionLink = document.querySelector(".region-link")
const regionDropdown = document.querySelector(".region-dropdown")

if (regionLink && regionDropdown) {
  regionLink.addEventListener("click", (e) => {
    e.preventDefault()
    regionDropdown.style.display = regionDropdown.style.display === "block" ? "none" : "block"
  })

  document.addEventListener("click", (e) => {
    if (!regionLink.contains(e.target) && !regionDropdown.contains(e.target)) {
      regionDropdown.style.display = "none"
    }
  })
}

// Services Dropdown
// const servicesLink = document.querySelector(".services-link")
// const servicesMenu = document.querySelector(".services-menu")

// if (servicesLink && servicesMenu) {
//   servicesLink.addEventListener("click", (e) => {
//     e.preventDefault()
//     servicesMenu.style.display = servicesMenu.style.display === "block" ? "none" : "block"
//   })

//   document.addEventListener("click", (e) => {
//     if (!servicesLink.contains(e.target) && !servicesMenu.contains(e.target)) {
//       servicesMenu.style.display = "none"
//     }
//   })
// }

// Phone Verification Form
const phoneForm = document.querySelector(".verification-form")
const phoneInput = document.querySelector(".phone-input")

if (phoneForm && phoneInput) {
  phoneForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!phoneInput.value.trim()) {
      alert("Пожалуйста, введите номер телефона")
      return
    }

    // Simulate form submission
    const submitBtn = phoneForm.querySelector(".btn-primary")
    submitBtn.textContent = "Отправка..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Код подтверждения отправлен на указанный номер")
      // Redirect to verification page or show verification input
      // window.location.href = 'verification.html';
    }, 1500)
  })
}

// Search Form
const searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search-input")

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!searchInput.value.trim()) {
      alert("Пожалуйста, введите поисковый запрос")
      return
    }

    // Redirect to search results page
    window.location.href = `search-results.html?q=${encodeURIComponent(searchInput.value.trim())}`
  })
}

// Mobile Menu Toggle (for smaller screens)
const createMobileMenu = () => {
  const header = document.querySelector(".main-header")
  const topNav = document.querySelector(".top-nav")
  const topServices = document.querySelector(".top-services")

  if (header && topNav && topServices) {
    // Create mobile menu button
    const mobileMenuBtn = document.createElement("button")
    mobileMenuBtn.className = "mobile-menu-btn"
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'

    // Create mobile menu container
    const mobileMenu = document.createElement("div")
    mobileMenu.className = "mobile-menu"

    // Clone navigation and services
    const navClone = topNav.cloneNode(true)
    const servicesClone = topServices.cloneNode(true)

    // Append to mobile menu
    mobileMenu.appendChild(navClone)
    mobileMenu.appendChild(servicesClone)

    // Add to DOM
    const mainBarContent = document.querySelector(".main-bar-content")
    if (mainBarContent) {
      mainBarContent.appendChild(mobileMenuBtn)
      header.appendChild(mobileMenu)

      // Toggle mobile menu
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        mobileMenuBtn.classList.toggle("active")

        if (mobileMenuBtn.classList.contains("active")) {
          mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'
        } else {
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
        }
      })
    }
  }
}

// Call mobile menu function for smaller screens
if (window.innerWidth <= 768) {
  createMobileMenu()
}

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    if (!document.querySelector(".mobile-menu-btn")) {
      createMobileMenu()
    }
  }
})

// Add CSS for mobile menu
const addMobileMenuStyles = () => {
  const style = document.createElement("style")
  style.textContent = `
      .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-color);
        cursor: pointer;
      }
      
      .mobile-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: var(--background-color);
        padding: 20px;
        box-shadow: 0 5px 15px var(--shadow-color);
        z-index: 1000;
      }
      
      .mobile-menu.active {
        display: block;
      }
      
      @media (max-width: 768px) {
        .mobile-menu-btn {
          display: block;
        }
        
        .top-nav, .top-services {
          display: none;
        }
      }
    `
  document.head.appendChild(style)
}

addMobileMenuStyles()

// Notification Close Button
const notificationCloseBtn = document.querySelector(".notification-header .fa-times")
const appNotification = document.querySelector(".app-notification")

if (notificationCloseBtn && appNotification) {
  notificationCloseBtn.addEventListener("click", () => {
    appNotification.style.display = "none"
  })
}

// Theme Toggle (Light/Dark Mode)
const createThemeToggle = () => {
  const footer = document.querySelector(".main-footer")

  if (footer) {
    // Create theme toggle button
    const themeToggle = document.createElement("button")
    themeToggle.className = "theme-toggle-btn"
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    themeToggle.setAttribute("aria-label", "Переключить тему")

    // Add to DOM
    footer.appendChild(themeToggle)

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }

    // Toggle theme
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      } else {
        localStorage.setItem("theme", "light")
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      }
    })

    // Add CSS for theme toggle
    const style = document.createElement("style")
    style.textContent = `
        .theme-toggle-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 2px 10px var(--shadow-color);
          transition: all var(--transition-speed);
          z-index: 100;
        }
        
        .theme-toggle-btn:hover {
          transform: rotate(30deg);
        }
      `
    document.head.appendChild(style)
  }
}

createThemeToggle()

