

document.addEventListener("DOMContentLoaded", () => {
  // Универсальная карусель, работающая на всех устройствах
  const initCarousel = () => {
    // Проверяем наличие карусели на странице
    const carousel = document.querySelector(".carousel")
    const slides = document.querySelectorAll(".carousel-slide")

    if (!carousel || slides.length === 0) return

    // Получаем элементы управления
    const prevBtn = document.querySelector(".carousel-control.prev")
    const nextBtn = document.querySelector(".carousel-control.next")
    const indicators = document.querySelectorAll(".indicator")

    let currentIndex = 0
    let autoSlideInterval

    // Функция для показа слайда
    const showSlide = (index) => {
      // Скрываем все слайды
      slides.forEach((slide) => {
        slide.classList.remove("active")
        slide.style.opacity = "0"
        slide.style.zIndex = "1"
      })

      // Убираем активный класс у всех индикаторов
      indicators.forEach((indicator) => {
        indicator.classList.remove("active")
      })

      // Показываем текущий слайд
      if (slides[index]) {
        slides[index].classList.add("active")
        slides[index].style.opacity = "1"
        slides[index].style.zIndex = "2"
      }

      // Активируем соответствующий индикатор
      if (indicators[index]) {
        indicators[index].classList.add("active")
      }

      // Обновляем текущий индекс
      currentIndex = index
    }

    // Функция для перехода к следующему слайду
    const nextSlide = () => {
      let nextIndex = currentIndex + 1
      if (nextIndex >= slides.length) {
        nextIndex = 0
      }
      showSlide(nextIndex)
    }

    // Функция для перехода к предыдущему слайду
    const prevSlide = () => {
      let prevIndex = currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = slides.length - 1
      }
      showSlide(prevIndex)
    }

    // Запуск автоматической смены слайдов
    const startAutoSlide = () => {
      stopAutoSlide() // Сначала останавливаем, если уже запущено
      autoSlideInterval = setInterval(nextSlide, 5000)
    }

    // Остановка автоматической смены слайдов
    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
      }
    }

    // Инициализация карусели
    const initCarouselEvents = () => {
      // Показываем первый слайд
      showSlide(0)

      // Добавляем обработчики для кнопок
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          prevSlide()
          stopAutoSlide()
          startAutoSlide()
        })
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          nextSlide()
          stopAutoSlide()
          startAutoSlide()
        })
      }

      // Добавляем обработчики для индикаторов
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          showSlide(index)
          stopAutoSlide()
          startAutoSlide()
        })
      })

      // Добавляем обработчики для свайпа на мобильных устройствах
      let touchStartX = 0
      let touchEndX = 0

      carousel.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX
        },
        { passive: true },
      )

      carousel.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX
          handleSwipe()
        },
        { passive: true },
      )

      const handleSwipe = () => {
        const swipeThreshold = 50 // Минимальное расстояние для свайпа

        // Свайп влево (следующий слайд)
        if (touchEndX < touchStartX - swipeThreshold) {
          nextSlide()
          stopAutoSlide()
          startAutoSlide()
        }

        // Свайп вправо (предыдущий слайд)
        if (touchEndX > touchStartX + swipeThreshold) {
          prevSlide()
          stopAutoSlide()
          startAutoSlide()
        }
      }

      // Пауза автоматической смены при наведении
      carousel.addEventListener("mouseenter", stopAutoSlide)
      carousel.addEventListener("mouseleave", startAutoSlide)

      // Запускаем автоматическую смену слайдов
      startAutoSlide()

      // Обработчик изменения размера окна
      window.addEventListener("resize", () => {
        // Перезапускаем карусель при изменении размера окна
        showSlide(currentIndex)
      })
    }

    // Запускаем инициализацию
    initCarouselEvents()
  }

  // Вызываем инициализацию карусели
  initCarousel()

  // Бургер-меню
  const burgerMenu = document.querySelector(".burger-menu")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (burgerMenu && mobileMenu) {
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active")
      mobileMenu.classList.toggle("active")
    })

    // Закрываем меню при клике на ссылку
    const mobileLinks = document.querySelectorAll(".mobile-nav a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burgerMenu.classList.remove("active")
        mobileMenu.classList.remove("active")
      })
    })
  }

  // Создаем бургер-меню, если его еще нет
  const createBurgerMenu = () => {
    // Проверяем, существует ли уже бургер-меню
    if (document.querySelector(".burger-menu")) {
      return
    }

    const header = document.querySelector(".main-header")
    const mainBarContent = document.querySelector(".main-bar-content")

    if (!header || !mainBarContent) return

    // Создаем элементы бургер-меню
    const burgerMenu = document.createElement("div")
    burgerMenu.className = "burger-menu"
    burgerMenu.innerHTML = `
      <div class="burger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `

    // Создаем мобильное меню
    const mobileMenu = document.createElement("div")
    mobileMenu.className = "mobile-menu"

    // Получаем ссылки из верхней навигации и сервисов
    const topNav = document.querySelector(".top-nav")
    const topServices = document.querySelector(".top-services")

    // Создаем контейнер для мобильного меню
    const mobileMenuContainer = document.createElement("div")
    mobileMenuContainer.className = "container"

    // Создаем навигацию для мобильного меню
    const mobileNav = document.createElement("nav")
    mobileNav.className = "mobile-nav"
    const mobileNavList = document.createElement("ul")

    // Добавляем ссылки из верхней навигации
    if (topNav) {
      const navLinks = topNav.querySelectorAll("a")
      navLinks.forEach((link) => {
        const li = document.createElement("li")
        const newLink = link.cloneNode(true)
        li.appendChild(newLink)
        mobileNavList.appendChild(li)
      })
    }

    // Добавляем ссылки из сервисов
    if (topServices) {
      const serviceLinks = topServices.querySelectorAll("a:not(.services-link)")
      serviceLinks.forEach((link) => {
        const li = document.createElement("li")
        const newLink = link.cloneNode(true)
        li.appendChild(newLink)
        mobileNavList.appendChild(li)
      })

      // Добавляем ссылки из выпадающего меню сервисов
      const servicesMenu = topServices.querySelector(".services-menu")
      if (servicesMenu) {
        const serviceMenuLinks = servicesMenu.querySelectorAll("a")
        serviceMenuLinks.forEach((link) => {
          const li = document.createElement("li")
          const newLink = link.cloneNode(true)
          li.appendChild(newLink)
          mobileNavList.appendChild(li)
        })
      }
    }

    mobileNav.appendChild(mobileNavList)

    // Добавляем кнопки авторизации
    const authButtons = document.querySelector(".auth-buttons")
    const mobileAuthButtons = document.createElement("div")
    mobileAuthButtons.className = "mobile-auth-buttons"

    if (authButtons) {
      const buttons = authButtons.querySelectorAll("a")
      buttons.forEach((button) => {
        const newButton = button.cloneNode(true)
        mobileAuthButtons.appendChild(newButton)
      })
    }

    // Собираем мобильное меню
    mobileMenuContainer.appendChild(mobileNav)
    mobileMenuContainer.appendChild(mobileAuthButtons)
    mobileMenu.appendChild(mobileMenuContainer)

    // Добавляем элементы на страницу
    mainBarContent.appendChild(burgerMenu)
    header.appendChild(mobileMenu)

    // Добавляем обработчики событий
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active")
      mobileMenu.classList.toggle("active")
    })

    // Закрываем меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burgerMenu.classList.remove("active")
        mobileMenu.classList.remove("active")
      })
    })

    // Закрываем меню при клике вне меню
    document.addEventListener("click", (e) => {
      if (!burgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        burgerMenu.classList.remove("active")
        mobileMenu.classList.remove("active")
      }
    })
  }

  // Вызываем функцию создания бургер-меню
  createBurgerMenu()

  // Обновляем бургер-меню при изменении размера окна
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      createBurgerMenu()
    }
  })

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
  }

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
      if (submitBtn) {
        submitBtn.textContent = "Отправка..."
        submitBtn.disabled = true

        setTimeout(() => {
          alert("Код подтверждения отправлен на указанный номер")
          // Redirect to verification page or show verification input
          // window.location.href = 'verification.html';
        }, 1500)
      }
    })
  }

  // Search Form
  const searchForm = document.querySelector(".search-form")
  const searchInput = document.querySelector(".search-input")

  if (searchForm && searchInput) {
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
})




























document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const body = document.body

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.add("dark")
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark")

      // Save theme preference
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  }

  // ======= УНИВЕРСАЛЬНОЕ БУРГЕР-МЕНЮ =======
  // Создаем бургер-меню, если его еще нет
  const createBurgerMenu = () => {
    // Проверяем, существует ли уже бургер-меню
    if (document.querySelector(".burger-menu")) {
      return
    }

    const header = document.querySelector(".main-header")
    const mainBarContent = document.querySelector(".main-bar-content")

    if (!header || !mainBarContent) return

    // Создаем элементы бургер-меню
    const burgerMenu = document.createElement("div")
    burgerMenu.className = "burger-menu"
    burgerMenu.innerHTML = `
      <div class="burger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `

    // Создаем мобильное меню
    const mobileMenu = document.createElement("div")
    mobileMenu.className = "mobile-menu"

    // Получаем ссылки из верхней навигации и сервисов
    const topNav = document.querySelector(".top-nav")
    const topServices = document.querySelector(".top-services")

    // Создаем контейнер для мобильного меню
    const mobileMenuContainer = document.createElement("div")
    mobileMenuContainer.className = "container"

    // Создаем навигацию для мобильного меню
    const mobileNav = document.createElement("nav")
    mobileNav.className = "mobile-nav"
    const mobileNavList = document.createElement("ul")

    // Добавляем ссылки из верхней навигации
    if (topNav) {
      const navLinks = topNav.querySelectorAll("a")
      navLinks.forEach((link) => {
        const li = document.createElement("li")
        const newLink = link.cloneNode(true)
        li.appendChild(newLink)
        mobileNavList.appendChild(li)
      })
    }

    // Добавляем ссылки из сервисов
    if (topServices) {
      const serviceLinks = topServices.querySelectorAll("a:not(.services-link)")
      serviceLinks.forEach((link) => {
        const li = document.createElement("li")
        const newLink = link.cloneNode(true)
        li.appendChild(newLink)
        mobileNavList.appendChild(li)
      })

      // Добавляем ссылки из выпадающего меню сервисов
      const servicesMenu = topServices.querySelector(".services-menu")
      if (servicesMenu) {
        const serviceMenuLinks = servicesMenu.querySelectorAll("a")
        serviceMenuLinks.forEach((link) => {
          const li = document.createElement("li")
          const newLink = link.cloneNode(true)
          li.appendChild(newLink)
          mobileNavList.appendChild(li)
        })
      }
    }

    mobileNav.appendChild(mobileNavList)

    // Добавляем кнопки авторизации
    const authButtons = document.querySelector(".auth-buttons")
    const mobileAuthButtons = document.createElement("div")
    mobileAuthButtons.className = "mobile-auth-buttons"

    if (authButtons) {
      const buttons = authButtons.querySelectorAll("a")
      buttons.forEach((button) => {
        const newButton = button.cloneNode(true)
        mobileAuthButtons.appendChild(newButton)
      })
    }

    // Собираем мобильное меню
    mobileMenuContainer.appendChild(mobileNav)
    mobileMenuContainer.appendChild(mobileAuthButtons)
    mobileMenu.appendChild(mobileMenuContainer)

    // Добавляем элементы на страницу
    mainBarContent.appendChild(burgerMenu)
    header.appendChild(mobileMenu)

    // Добавляем обработчики событий
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active")
      mobileMenu.classList.toggle("active")
    })

    // Закрываем меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burgerMenu.classList.remove("active")
        mobileMenu.classList.remove("active")
      })
    })

    // Закрываем меню при клике вне меню
    document.addEventListener("click", (e) => {
      if (!burgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        burgerMenu.classList.remove("active")
        mobileMenu.classList.remove("active")
      }
    })
  }

  // Добавляем стили для бургер-меню
  const addBurgerMenuStyles = () => {
    // Проверяем, существуют ли уже стили
    if (document.getElementById("burger-menu-styles")) {
      return
    }

    const style = document.createElement("style")
    style.id = "burger-menu-styles"
    style.textContent = `
      /* Бургер меню */
      .burger-menu {
        display: none;
        cursor: pointer;
        z-index: 1001;
      }

      .burger-icon {
        width: 30px;
        height: 20px;
        position: relative;
      }

      .burger-icon span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: var(--primary-color);
        border-radius: 3px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
      }

      .burger-icon span:nth-child(1) {
        top: 0px;
      }

      .burger-icon span:nth-child(2) {
        top: 8px;
      }

      .burger-icon span:nth-child(3) {
        top: 16px;
      }

      .burger-menu.active .burger-icon span:nth-child(1) {
        top: 8px;
        transform: rotate(135deg);
      }

      .burger-menu.active .burger-icon span:nth-child(2) {
        opacity: 0;
        left: -60px;
      }

      .burger-menu.active .burger-icon span:nth-child(3) {
        top: 8px;
        transform: rotate(-135deg);
      }

      /* Мобильное меню */
      .mobile-menu {
        display: none;
        background-color: var(--background-color);
        padding: 20px 0;
        border-top: 1px solid var(--border-color);
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 5px 15px var(--shadow-color);
        transition: all 0.3s ease-in-out;
      }

      .mobile-menu.active {
        display: block;
      }

      .mobile-nav ul {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .mobile-nav a {
        display: block;
        padding: 10px 0;
        color: var(--text-color);
        font-weight: 500;
        border-bottom: 1px solid var(--border-color);
      }

      .mobile-nav a.active {
        color: var(--primary-color);
      }

      .mobile-auth-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
      }

      /* Медиа-запросы для отображения бургер-меню на мобильных устройствах */
      @media (max-width: 768px) {
        .burger-menu {
          display: block;
        }
        
        .top-bar {
          display: none;
        }
        
        .auth-buttons {
          display: none;
        }
      }
    `

    document.head.appendChild(style)
  }

  // Инициализация бургер-меню
  const initBurgerMenu = () => {
    addBurgerMenuStyles()
    createBurgerMenu()
  }

  // Вызываем инициализацию бургер-меню
  initBurgerMenu()

  // Обновляем бургер-меню при изменении размера окна
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      createBurgerMenu()
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Универсальная карусель, работающая на всех устройствах
  const initCarousel = () => {
    // Проверяем наличие карусели на странице
    const carousel = document.querySelector(".carousel")
    const slides = document.querySelectorAll(".carousel-slide")

    if (!carousel || slides.length === 0) return

    // Получаем элементы управления
    const prevBtn = document.querySelector(".carousel-control.prev") || document.querySelector(".carousel-btn.prev")
    const nextBtn = document.querySelector(".carousel-control.next") || document.querySelector(".carousel-btn.next")
    const indicators =
      document.querySelectorAll(".carousel-indicators .indicator") || document.querySelectorAll(".indicator")

    let currentIndex = 0
    let autoSlideInterval

    // Функция для показа слайда
    const showSlide = (index) => {
      // Скрываем все слайды
      slides.forEach((slide) => {
        slide.classList.remove("active")
        slide.style.opacity = "0"
      })

      // Убираем активный класс у всех индикаторов
      indicators.forEach((indicator) => {
        indicator.classList.remove("active")
      })

      // Показываем текущий слайд
      if (slides[index]) {
        slides[index].classList.add("active")
        slides[index].style.opacity = "1"
      }

      // Активируем соответствующий индикатор
      if (indicators[index]) {
        indicators[index].classList.add("active")
      }

      // Обновляем текущий индекс
      currentIndex = index
    }

    // Функция для перехода к следующему слайду
    const nextSlide = () => {
      let nextIndex = currentIndex + 1
      if (nextIndex >= slides.length) {
        nextIndex = 0
      }
      showSlide(nextIndex)
    }

    // Функция для перехода к предыдущему слайду
    const prevSlide = () => {
      let prevIndex = currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = slides.length - 1
      }
      showSlide(prevIndex)
    }

    // Запуск автоматической смены слайдов
    const startAutoSlide = () => {
      stopAutoSlide() // Сначала останавливаем, если уже запущено
      autoSlideInterval = setInterval(nextSlide, 5000)
    }

    // Остановка автоматической смены слайдов
    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
      }
    }

    // Инициализация карусели
    const initCarouselEvents = () => {
      // Показываем первый слайд
      showSlide(0)

      // Добавляем обработчики для кнопок
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          prevSlide()
          stopAutoSlide()
          startAutoSlide()
        })
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          nextSlide()
          stopAutoSlide()
          startAutoSlide()
        })
      }

      // Добавляем обработчики для индикаторов
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          showSlide(index)
          stopAutoSlide()
          startAutoSlide()
        })
      })

      // Добавляем обработчики для свайпа на мобильных устройствах
      let touchStartX = 0
      let touchEndX = 0

      carousel.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX
        },
        { passive: true },
      )

      carousel.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX
          handleSwipe()
        },
        { passive: true },
      )

      const handleSwipe = () => {
        const swipeThreshold = 50 // Минимальное расстояние для свайпа

        // Свайп влево (следующий слайд)
        if (touchEndX < touchStartX - swipeThreshold) {
          nextSlide()
          stopAutoSlide()
          startAutoSlide()
        }

        // Свайп вправо (предыдущий слайд)
        if (touchEndX > touchStartX + swipeThreshold) {
          prevSlide()
          stopAutoSlide()
          startAutoSlide()
        }
      }

      // Пауза автоматической смены при наведении
      carousel.addEventListener("mouseenter", stopAutoSlide)
      carousel.addEventListener("mouseleave", startAutoSlide)

      // Запускаем автоматическую смену слайдов
      startAutoSlide()

      // Добавляем стили для плавного перехода
      slides.forEach((slide) => {
        slide.style.transition = "opacity 0.5s ease-in-out"
        slide.style.position = "absolute"
        slide.style.top = "0"
        slide.style.left = "0"
        slide.style.width = "100%"
        slide.style.height = "100%"
      })
    }

    // Запускаем инициализацию
    initCarouselEvents()
  }

  // Вызываем инициализацию карусели
  initCarousel()

  // Form submission
  const contactForm = document.querySelector(".contact-form form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      if (nameInput && emailInput && messageInput) {
        if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
          alert("Please fill in all required fields.")
          return
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        if (submitBtn) {
          submitBtn.textContent = "Sending..."
          submitBtn.disabled = true

          setTimeout(() => {
            alert("Thank you for your message! We will get back to you soon.")
            contactForm.reset()
            submitBtn.textContent = "Send Message"
            submitBtn.disabled = false
          }, 1500)
        }
      }
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
      if (submitBtn) {
        submitBtn.textContent = "Отправка..."
        submitBtn.disabled = true

        setTimeout(() => {
          alert("Код подтверждения отправлен на указанный номер")
          // Redirect to verification page or show verification input
          // window.location.href = 'verification.html';
        }, 1500)
      }
    })
  }

  // Search Form
  const searchForm = document.querySelector(".search-form")
  const searchInput = document.querySelector(".search-input")

  if (searchForm && searchInput) {
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

  // Share dropdown functionality
  const shareBtn = document.querySelector(".share-dropdown button")
  const shareOptions = document.querySelector(".share-options")

  if (shareBtn && shareOptions) {
    shareBtn.addEventListener("click", (e) => {
      e.preventDefault()
      shareOptions.style.display = shareOptions.style.display === "block" ? "none" : "block"
    })

    document.addEventListener("click", (e) => {
      if (!shareBtn.contains(e.target) && !shareOptions.contains(e.target)) {
        shareOptions.style.display = "none"
      }
    })
  }

  // Apply button functionality
  const applyBtns = document.querySelectorAll(".btn-primary")

  applyBtns.forEach((btn) => {
    if (btn.innerHTML.includes("Откликнуться")) {
      btn.addEventListener("click", () => {
        // Check if user is logged in
        const isLoggedIn = false // This would be determined by your authentication system

        if (isLoggedIn) {
          // Show application form or modal
          alert("Форма отклика на вакансию")
        } else {
          // Redirect to login page
          if (confirm("Для отклика на вакансию необходимо войти в систему. Перейти на страницу входа?")) {
            window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.href)
          }
        }
      })
    }
  })

  // Favorite button functionality
  const favBtns = document.querySelectorAll(".btn-outline:not(.btn-block):not(.share-dropdown button)")

  favBtns.forEach((btn) => {
    if (btn.innerHTML.includes("В избранное")) {
      btn.addEventListener("click", () => {
        const icon = btn.querySelector("i")

        if (icon && icon.classList.contains("far")) {
          icon.classList.remove("far")
          icon.classList.add("fas")
          btn.innerHTML = btn.innerHTML.replace("В избранное", "В избранном")
          alert("Вакансия добавлена в избранное")
        } else if (icon) {
          icon.classList.remove("fas")
          icon.classList.add("far")
          btn.innerHTML = btn.innerHTML.replace("В избранном", "В избранное")
          alert("Вакансия удалена из избранного")
        }
      })
    }
  })

  // Job alert form submission
  const alertForm = document.querySelector(".job-alert-form")

  if (alertForm) {
    alertForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const emailInput = alertForm.querySelector('input[type="email"]')

      if (!emailInput || !emailInput.value.trim()) {
        alert("Пожалуйста, введите email")
        return
      }

      // Simulate form submission
      const submitBtn = alertForm.querySelector('button[type="submit"]')
      if (submitBtn) {
        submitBtn.textContent = "Подписка..."
        submitBtn.disabled = true

        setTimeout(() => {
          alert("Вы успешно подписались на уведомления о новых вакансиях")
          emailInput.value = ""
          submitBtn.textContent = "Подписаться"
          submitBtn.disabled = false
        }, 1500)
      }
    })
  }

  // Notification Close Button
  const notificationCloseBtn = document.querySelector(".notification-header .fa-times")
  const appNotification = document.querySelector(".app-notification")

  if (notificationCloseBtn && appNotification) {
    notificationCloseBtn.addEventListener("click", () => {
      appNotification.style.display = "none"
    })
  }
})

