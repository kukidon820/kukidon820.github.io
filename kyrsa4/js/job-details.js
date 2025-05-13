document.addEventListener("DOMContentLoaded", () => {
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
  })

  // Favorite button functionality
  const favBtns = document.querySelectorAll(".btn-outline:not(.btn-block):not(.share-dropdown button)")

  favBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i")

      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        btn.innerHTML = btn.innerHTML.replace("В избранное", "В избранном")
        alert("Вакансия добавлена в избранное")
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        btn.innerHTML = btn.innerHTML.replace("В избранном", "В избранное")
        alert("Вакансия удалена из избранного")
      }
    })
  })

  // Job alert form submission
  const alertForm = document.querySelector(".job-alert-form")

  if (alertForm) {
    alertForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const emailInput = alertForm.querySelector('input[type="email"]')

      if (!emailInput.value.trim()) {
        alert("Пожалуйста, введите email")
        return
      }

      // Simulate form submission
      const submitBtn = alertForm.querySelector('button[type="submit"]')
      submitBtn.textContent = "Подписка..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Вы успешно подписались на уведомления о новых вакансиях")
        emailInput.value = ""
        submitBtn.textContent = "Подписаться"
        submitBtn.disabled = false
      }, 1500)
    })
  }
})

