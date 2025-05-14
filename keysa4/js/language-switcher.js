// Определяем переменную translations (предполагается, что она определена в другом файле)
const translations = {}

// Функция для изменения языка на сайте
function changeLanguage(lang) {
  // Сохраняем выбранный язык в localStorage
  localStorage.setItem("preferredLanguage", lang)

  // Применяем переводы ко всем элементам с атрибутом data-lang-key
  document.querySelectorAll("[data-lang-key]").forEach((element) => {
    const key = element.getAttribute("data-lang-key")

    if (translations[key] && translations[key][lang]) {
      // Если элемент - input с placeholder
      if (element.tagName === "INPUT" && element.hasAttribute("placeholder")) {
        element.placeholder = translations[key][lang]
      }
      // Если элемент - кнопка с value
      else if (element.tagName === "BUTTON" && element.hasAttribute("value")) {
        element.value = translations[key][lang]
      }
      // Для остальных элементов меняем текстовое содержимое
      else {
        element.textContent = translations[key][lang]
      }
    }
  })

  // Обновляем активный класс для переключателей языка
  document.querySelectorAll(".language-option").forEach((option) => {
    if (option.getAttribute("data-lang") === lang) {
      option.classList.add("active")
    } else {
      option.classList.remove("active")
    }
  })

  // Обновляем текст на кнопке выбора языка
  const languageButton = document.querySelector(".language-button")
  if (languageButton) {
    languageButton.textContent = lang === "en" ? "EN" : "RU"
  }

  // Вызываем событие изменения языка
  const event = new CustomEvent("languageChanged", { detail: { language: lang } })
  document.dispatchEvent(event)
}

// Функция для инициализации языкового переключателя
function initLanguageSwitcher() {
  // Получаем сохраненный язык из localStorage или используем язык браузера
  const savedLanguage = localStorage.getItem("preferredLanguage")
  const browserLanguage = navigator.language.split("-")[0]
  const defaultLanguage = savedLanguage || (browserLanguage === "ru" ? "ru" : "en")

  // Применяем язык при загрузке страницы
  changeLanguage(defaultLanguage)

  // Добавляем обработчики событий для переключателей языка
  document.querySelectorAll(".language-option").forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang")
      changeLanguage(lang)
    })
  })
}

// Инициализируем языковой переключатель при загрузке страницы
document.addEventListener("DOMContentLoaded", initLanguageSwitcher)
