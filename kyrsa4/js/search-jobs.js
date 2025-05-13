document.addEventListener("DOMContentLoaded", () => {
  // Filter toggle for mobile
  const createMobileFilterToggle = () => {
    if (window.innerWidth <= 992) {
      const searchFilters = document.querySelector(".search-filters")
      const searchResults = document.querySelector(".search-results")

      if (searchFilters && searchResults) {
        // Create toggle button
        const toggleButton = document.createElement("button")
        toggleButton.className = "btn btn-outline filter-toggle"
        toggleButton.innerHTML = '<i class="fas fa-filter"></i> Фильтры'

        // Insert before search results
        searchResults.parentNode.insertBefore(toggleButton, searchResults)

        // Hide filters by default on mobile
        searchFilters.classList.add("filters-hidden")

        // Toggle filters visibility
        toggleButton.addEventListener("click", () => {
          searchFilters.classList.toggle("filters-hidden")
          toggleButton.classList.toggle("active")

          if (toggleButton.classList.contains("active")) {
            toggleButton.innerHTML = '<i class="fas fa-times"></i> Закрыть'
          } else {
            toggleButton.innerHTML = '<i class="fas fa-filter"></i> Фильтры'
          }
        })

        // Add CSS for mobile filters
        const style = document.createElement("style")
        style.textContent = `
          .filter-toggle {
            display: block;
            margin-bottom: 20px;
            width: 100%;
          }
          
          .filters-hidden {
            display: none;
          }
          
          @media (min-width: 993px) {
            .filter-toggle {
              display: none;
            }
            
            .filters-hidden {
              display: block;
            }
          }
        `
        document.head.appendChild(style)
      }
    }
  }

  // Call on load
  createMobileFilterToggle()

  // Call on resize
  window.addEventListener("resize", () => {
    // Remove existing toggle button
    const existingToggle = document.querySelector(".filter-toggle")
    if (existingToggle) {
      existingToggle.remove()
    }

    // Reset filters visibility
    const searchFilters = document.querySelector(".search-filters")
    if (searchFilters) {
      if (window.innerWidth > 992) {
        searchFilters.classList.remove("filters-hidden")
      } else {
        searchFilters.classList.add("filters-hidden")
      }
    }

    // Recreate toggle if needed
    createMobileFilterToggle()
  })

  // Reset filters
  const resetButtons = document.querySelectorAll(".btn-reset-filters")

  resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Reset checkboxes and radio buttons
      document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((input) => {
        if (input.name === "date" && input.value === "all") {
          input.checked = true
        } else if (input.name === "salary-period" && input.value === "month") {
          input.checked = true
        } else if (input.type === "checkbox") {
          input.checked = false
        } else if (input.type === "radio" && input.name !== "date" && input.name !== "salary-period") {
          input.checked = false
        }
      })

      // Reset selects
      document.querySelectorAll("select").forEach((select) => {
        select.selectedIndex = 0
      })

      // Reset inputs
      document.querySelectorAll('input[type="text"], input[type="number"]').forEach((input) => {
        input.value = ""
      })
    })
  })

  // Apply filters
  const applyButton = document.querySelector(".btn-apply-filters")

  if (applyButton) {
    applyButton.addEventListener("click", () => {
      // Simulate loading
      const searchResults = document.querySelector(".search-results")

      if (searchResults) {
        // Create loading overlay
        const loadingOverlay = document.createElement("div")
        loadingOverlay.className = "loading-overlay"
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'

        searchResults.appendChild(loadingOverlay)

        // Add CSS for loading
        const style = document.createElement("style")
        style.textContent = `
          .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--border-color);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
        document.head.appendChild(style)

        // Remove loading after 1 second
        setTimeout(() => {
          loadingOverlay.remove()

          // Update results count (simulated)
          const resultsNumber = document.getElementById("results-number")
          if (resultsNumber) {
            resultsNumber.textContent = "856"
          }

          // Close filters on mobile
          if (window.innerWidth <= 992) {
            const searchFilters = document.querySelector(".search-filters")
            const toggleButton = document.querySelector(".filter-toggle")

            if (searchFilters && toggleButton) {
              searchFilters.classList.add("filters-hidden")
              toggleButton.classList.remove("active")
              toggleButton.innerHTML = '<i class="fas fa-filter"></i> Фильтры'
            }
          }
        }, 1000)
      }
    })
  }

  // Favorite button functionality
  const favoriteButtons = document.querySelectorAll(".btn-favorite")

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i")

      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        button.setAttribute("title", "Удалить из избранного")
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        button.setAttribute("title", "Добавить в избранное")
      }
    })
  })

  // Apply button functionality
  const applyJobButtons = document.querySelectorAll(".job-actions .btn-primary")

  applyJobButtons.forEach((button) => {
    button.addEventListener("click", () => {
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
  })

  // Sort functionality
  const sortSelect = document.getElementById("sort-by")

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      // Simulate loading
      const searchResults = document.querySelector(".search-results")

      if (searchResults) {
        // Create loading overlay
        const loadingOverlay = document.createElement("div")
        loadingOverlay.className = "loading-overlay"
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'

        searchResults.appendChild(loadingOverlay)

        // Remove loading after 1 second
        setTimeout(() => {
          loadingOverlay.remove()

          // Reorder job cards (simulated)
          const jobList = document.querySelector(".job-list")
          const jobCards = Array.from(document.querySelectorAll(".job-card"))

          if (jobList && jobCards.length > 0) {
            // Shuffle the job cards for demonstration
            for (let i = jobCards.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1))
              ;[jobCards[i], jobCards[j]] = [jobCards[j], jobCards[i]]
            }

            // Clear job list
            jobList.innerHTML = ""

            // Append shuffled cards
            jobCards.forEach((card) => {
              jobList.appendChild(card)
            })
          }
        }, 1000)
      }
    })
  }

  // Pagination functionality
  const paginationItems = document.querySelectorAll(".pagination-item, .pagination-prev, .pagination-next")

  paginationItems.forEach((item) => {
    if (!item.classList.contains("disabled")) {
      item.addEventListener("click", (e) => {
        e.preventDefault()

        // Update active state
        document.querySelectorAll(".pagination-item").forEach((pItem) => {
          pItem.classList.remove("active")
        })

        if (item.classList.contains("pagination-item")) {
          item.classList.add("active")
        }

        // Scroll to top of results
        document.querySelector(".search-results").scrollIntoView({ behavior: "smooth" })

        // Simulate loading new page
        const searchResults = document.querySelector(".search-results")

        if (searchResults) {
          // Create loading overlay
          const loadingOverlay = document.createElement("div")
          loadingOverlay.className = "loading-overlay"
          loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'

          searchResults.appendChild(loadingOverlay)

          // Remove loading after 1 second
          setTimeout(() => {
            loadingOverlay.remove()
          }, 1000)
        }
      })
    }
  })
})

