document.addEventListener("DOMContentLoaded", () => {
  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })

  // Pricing Card Hover Effect
  const pricingCards = document.querySelectorAll(".pricing-card")

  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("popular")) {
        pricingCards.forEach((otherCard) => {
          if (otherCard.classList.contains("popular")) {
            otherCard.style.transform = "scale(1)"
          }
        })
      }
    })

    card.addEventListener("mouseleave", () => {
      pricingCards.forEach((otherCard) => {
        if (otherCard.classList.contains("popular")) {
          otherCard.style.transform = "scale(1.05)"
        }
      })
    })
  })

  // Testimonial Carousel (if needed)
  const createTestimonialCarousel = () => {
    const testimonialsGrid = document.querySelector(".testimonials-grid")

    if (testimonialsGrid && window.innerWidth < 992) {
      // Convert grid to carousel for mobile
      const testimonialCards = testimonialsGrid.querySelectorAll(".testimonial-card")

      // Create carousel container
      const carouselContainer = document.createElement("div")
      carouselContainer.className = "testimonial-carousel"

      // Create carousel track
      const carouselTrack = document.createElement("div")
      carouselTrack.className = "carousel-track"

      // Create carousel controls
      const carouselControls = document.createElement("div")
      carouselControls.className = "carousel-controls"
      carouselControls.innerHTML = `
        <button class="carousel-prev"><i class="fas fa-chevron-left"></i></button>
        <div class="carousel-dots"></div>
        <button class="carousel-next"><i class="fas fa-chevron-right"></i></button>
      `

      // Add cards to track
      testimonialCards.forEach((card, index) => {
        const slide = document.createElement("div")
        slide.className = "carousel-slide"
        slide.appendChild(card.cloneNode(true))
        carouselTrack.appendChild(slide)

        // Add dot
        const dot = document.createElement("span")
        dot.className = "carousel-dot" + (index === 0 ? " active" : "")
        dot.dataset.index = index
        carouselControls.querySelector(".carousel-dots").appendChild(dot)
      })

      // Add track and controls to container
      carouselContainer.appendChild(carouselTrack)
      carouselContainer.appendChild(carouselControls)

      // Replace grid with carousel
      testimonialsGrid.parentNode.replaceChild(carouselContainer, testimonialsGrid)

      // Initialize carousel
      let currentIndex = 0
      const slides = carouselContainer.querySelectorAll(".carousel-slide")
      const dots = carouselContainer.querySelectorAll(".carousel-dot")
      const prevBtn = carouselContainer.querySelector(".carousel-prev")
      const nextBtn = carouselContainer.querySelector(".carousel-next")

      const updateCarousel = () => {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`

        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex)
        })
      }

      // Event listeners
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length
        updateCarousel()
      })

      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length
        updateCarousel()
      })

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          currentIndex = Number.parseInt(dot.dataset.index)
          updateCarousel()
        })
      })

      // Add CSS for carousel
      const style = document.createElement("style")
      style.textContent = `
        .testimonial-carousel {
          position: relative;
          overflow: hidden;
          margin-top: 40px;
        }
        
        .carousel-track {
          display: flex;
          transition: transform 0.3s ease;
        }
        
        .carousel-slide {
          min-width: 100%;
          padding: 0 10px;
        }
        
        .carousel-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
        
        .carousel-prev,
        .carousel-next {
          background-color: var(--background-color);
          border: 1px solid var(--border-color);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all var(--transition-speed);
        }
        
        .carousel-prev:hover,
        .carousel-next:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        .carousel-dots {
          display: flex;
          gap: 10px;
          margin: 0 20px;
        }
        
        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--border-color);
          cursor: pointer;
          transition: background-color var(--transition-speed);
        }
        
        .carousel-dot.active {
          background-color: var(--primary-color);
        }
      `
      document.head.appendChild(style)

      // Initial update
      updateCarousel()
    }
  }

  // Call on load and resize
  createTestimonialCarousel()

  window.addEventListener("resize", () => {
    // Refresh carousel on window resize
    const existingCarousel = document.querySelector(".testimonial-carousel")
    if (existingCarousel) {
      existingCarousel.parentNode.innerHTML = ""

      // Recreate original grid
      const newGrid = document.createElement("div")
      newGrid.className = "testimonials-grid"

      // Add original testimonial cards
      for (let i = 0; i < 3; i++) {
        const card = document.createElement("div")
        card.className = "testimonial-card"
        card.innerHTML = `
          <div class="testimonial-logo">
            <img src="/placeholder.svg?height=80&width=80" alt="Логотип компании" class="company-logo">
          </div>
          <div class="testimonial-content">
            <p class="testimonial-text">"JobHub помог нам найти высококвалифицированных специалистов в кратчайшие сроки. Удобный интерфейс и отличная поддержка!"</p>
            <div class="testimonial-author">
              <p class="author-name">Анна Смирнова</p>
              <p class="author-position">HR-директор, ООО "ТехСтарт"</p>
            </div>
          </div>
        `
        newGrid.appendChild(card)
      }

      existingCarousel.parentNode.appendChild(newGrid)
      createTestimonialCarousel()
    }
  })
})

