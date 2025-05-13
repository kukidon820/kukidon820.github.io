document.addEventListener("DOMContentLoaded", () => {
  // Form Steps Navigation
  const progressSteps = document.querySelectorAll(".progress-step")
  const formSteps = document.querySelectorAll(".form-step")
  const progressFill = document.querySelector(".progress-fill")
  const nextButtons = document.querySelectorAll(".next-step")
  const prevButtons = document.querySelectorAll(".prev-step")

  // Set current step
  let currentStep = 0

  // Update progress bar
  const updateProgress = () => {
    const progress = ((currentStep + 1) / progressSteps.length) * 100
    progressFill.style.width = `${progress}%`

    // Update step status
    progressSteps.forEach((step, index) => {
      if (index < currentStep) {
        step.classList.add("completed")
        step.classList.remove("active")
      } else if (index === currentStep) {
        step.classList.add("active")
        step.classList.remove("completed")
      } else {
        step.classList.remove("active", "completed")
      }
    })
  }

  // Show current step
  const showStep = (stepIndex) => {
    formSteps.forEach((step, index) => {
      step.classList.toggle("active", index === stepIndex)
    })

    currentStep = stepIndex
    updateProgress()

    // Scroll to top of form
    document.querySelector(".resume-form-container").scrollIntoView({ behavior: "smooth" })
  }

  // Next step button click
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Validate current step
      if (validateStep(currentStep)) {
        showStep(currentStep + 1)
      }
    })
  })

  // Previous step button click
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showStep(currentStep - 1)
    })
  })

  // Step click navigation
  progressSteps.forEach((step, index) => {
    step.addEventListener("click", () => {
      // Only allow navigation to completed steps or next step
      if (index <= currentStep + 1) {
        showStep(index)
      }
    })
  })

  // Validate step
  const validateStep = (stepIndex) => {
    const currentFormStep = formSteps[stepIndex]
    const requiredFields = currentFormStep.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.classList.add("invalid")

        // Add error message if not exists
        let errorMessage = field.nextElementSibling
        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
          errorMessage = document.createElement("div")
          errorMessage.className = "error-message"
          errorMessage.textContent = "Это поле обязательно для заполнения"
          field.parentNode.insertBefore(errorMessage, field.nextSibling)
        }
      } else {
        field.classList.remove("invalid")

        // Remove error message if exists
        const errorMessage = field.nextElementSibling
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.remove()
        }
      }
    })

    return isValid
  }

  // Add CSS for validation
  const style = document.createElement("style")
  style.textContent = `
    .invalid {
      border-color: var(--error-color) !important;
    }
    
    .error-message {
      color: var(--error-color);
      font-size: 0.8rem;
      margin-top: 5px;
    }
  `
  document.head.appendChild(style)

  // Photo Upload
  const photoUpload = document.getElementById("photo-upload")
  const photoPreview = document.querySelector(".photo-preview")

  if (photoUpload && photoPreview) {
    photoUpload.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          // Clear preview
          photoPreview.innerHTML = ""

          // Create image element
          const img = document.createElement("img")
          img.src = e.target.result
          photoPreview.appendChild(img)
        }

        reader.readAsDataURL(this.files[0])
      }
    })
  }

  // Add/Remove Experience
  const addExperienceBtn = document.querySelector(".add-experience")
  const experienceItems = document.querySelector(".experience-items")

  if (addExperienceBtn && experienceItems) {
    addExperienceBtn.addEventListener("click", () => {
      const newItem = experienceItems.querySelector(".experience-item").cloneNode(true)

      // Clear input values
      newItem.querySelectorAll("input, textarea").forEach((input) => {
        input.value = ""
      })

      // Reset checkbox
      const checkbox = newItem.querySelector('input[type="checkbox"]')
      if (checkbox) checkbox.checked = false

      // Add remove event listener
      const removeBtn = newItem.querySelector(".remove-item")
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          if (experienceItems.querySelectorAll(".experience-item").length > 1) {
            newItem.remove()
          } else {
            alert("Необходимо указать хотя бы один опыт работы")
          }
        })
      }

      experienceItems.appendChild(newItem)
    })

    // Add event listener to existing remove buttons
    document.querySelectorAll(".experience-item .remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (experienceItems.querySelectorAll(".experience-item").length > 1) {
          this.closest(".experience-item").remove()
        } else {
          alert("Необходимо указать хотя бы один опыт работы")
        }
      })
    })
  }

  // Add/Remove Education
  const addEducationBtn = document.querySelector(".add-education")
  const educationItems = document.querySelector(".education-items")

  if (addEducationBtn && educationItems) {
    addEducationBtn.addEventListener("click", () => {
      const newItem = educationItems.querySelector(".education-item").cloneNode(true)

      // Clear input values
      newItem.querySelectorAll("input").forEach((input) => {
        input.value = ""
      })

      // Reset checkbox
      const checkbox = newItem.querySelector('input[type="checkbox"]')
      if (checkbox) checkbox.checked = false

      // Add remove event listener
      const removeBtn = newItem.querySelector(".remove-item")
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          if (educationItems.querySelectorAll(".education-item").length > 1) {
            newItem.remove()
          } else {
            alert("Необходимо указать хотя бы одно образование")
          }
        })
      }

      educationItems.appendChild(newItem)
    })

    // Add event listener to existing remove buttons
    document.querySelectorAll(".education-item .remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (educationItems.querySelectorAll(".education-item").length > 1) {
          this.closest(".education-item").remove()
        } else {
          alert("Необходимо указать хотя бы одно образование")
        }
      })
    })
  }

  // Skills Input
  const skillInput = document.getElementById("skill-input")
  const skillsContainer = document.querySelector(".skills-tags")
  const skillsHiddenInput = document.getElementById("skills")
  let skills = []

  if (skillInput && skillsContainer && skillsHiddenInput) {
    // Add skill on Enter key
    skillInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault()

        const skill = this.value.trim()
        if (skill && !skills.includes(skill)) {
          addSkill(skill)
          this.value = ""
        }
      }
    })

    // Function to add skill
    const addSkill = (skill) => {
      skills.push(skill)

      const skillTag = document.createElement("div")
      skillTag.className = "skill-tag"
      skillTag.innerHTML = `
        ${skill}
        <span class="remove-skill">&times;</span>
      `

      const removeBtn = skillTag.querySelector(".remove-skill")
      removeBtn.addEventListener("click", () => {
        skills = skills.filter((s) => s !== skill)
        skillTag.remove()
        updateSkillsInput()
      })

      skillsContainer.appendChild(skillTag)
      updateSkillsInput()
    }

    // Update hidden input
    const updateSkillsInput = () => {
      skillsHiddenInput.value = JSON.stringify(skills)
    }
  }

  // Add/Remove Language
  const addLanguageBtn = document.querySelector(".add-language")
  const languagesItems = document.querySelector(".languages-items")

  if (addLanguageBtn && languagesItems) {
    addLanguageBtn.addEventListener("click", () => {
      const newItem = languagesItems.querySelector(".language-item").cloneNode(true)

      // Clear input values
      newItem.querySelectorAll("input, select").forEach((input) => {
        input.value = ""
      })

      // Add remove event listener
      const removeBtn = newItem.querySelector(".remove-language")
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          newItem.remove()
        })
      }

      languagesItems.appendChild(newItem)
    })

    // Add event listener to existing remove buttons
    document.querySelectorAll(".language-item .remove-language").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (languagesItems.querySelectorAll(".language-item").length > 1) {
          this.closest(".language-item").remove()
        } else {
          // Clear values instead of removing
          const item = this.closest(".language-item")
          item.querySelectorAll("input, select").forEach((input) => {
            input.value = ""
          })
        }
      })
    })
  }

  // Add/Remove Course
  const addCourseBtn = document.querySelector(".add-course")
  const coursesItems = document.querySelector(".courses-items")

  if (addCourseBtn && coursesItems) {
    addCourseBtn.addEventListener("click", () => {
      const newItem = coursesItems.querySelector(".course-item").cloneNode(true)

      // Clear input values
      newItem.querySelectorAll("input").forEach((input) => {
        input.value = ""
      })

      // Add remove event listener
      const removeBtn = newItem.querySelector(".remove-course")
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          newItem.remove()
        })
      }

      coursesItems.appendChild(newItem)
    })

    // Add event listener to existing remove buttons
    document.querySelectorAll(".course-item .remove-course").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (coursesItems.querySelectorAll(".course-item").length > 1) {
          this.closest(".course-item").remove()
        } else {
          // Clear values instead of removing
          const item = this.closest(".course-item")
          item.querySelectorAll("input").forEach((input) => {
            input.value = ""
          })
        }
      })
    })
  }

  // Form Submission
  const resumeForm = document.getElementById("resume-form")

  if (resumeForm) {
    resumeForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Validate all steps
      let isValid = true
      for (let i = 0; i < formSteps.length; i++) {
        if (!validateStep(i)) {
          isValid = false
          showStep(i)
          break
        }
      }

      if (isValid) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]')
        submitBtn.textContent = "Сохранение..."
        submitBtn.disabled = true

        setTimeout(() => {
          alert("Резюме успешно сохранено!")
          window.location.href = "my-resume.html"
        }, 2000)
      }
    })
  }
})

