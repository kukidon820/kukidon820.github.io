// Объект с переводами для всех страниц сайта
const translations = {
  // Общие элементы интерфейса
  "nav-home": {
    en: "Home",
    ru: "Главная",
  },
  "nav-jobs": {
    en: "Find Jobs",
    ru: "Найти работу",
  },
  "nav-employers": {
    en: "For Employers",
    ru: "Работодателям",
  },
  "nav-resumes": {
    en: "Ready Resume",
    ru: "Готовое резюме",
  },
  "nav-consultation": {
    en: "Career Consultation",
    ru: "Карьерная консультация",
  },
  "nav-about": {
    en: "About Us",
    ru: "О нас",
  },
  "nav-contact": {
    en: "Contact",
    ru: "Контакты",
  },
  "nav-login": {
    en: "Log In",
    ru: "Войти",
  },
  "nav-register": {
    en: "Register",
    ru: "Регистрация",
  },
  "nav-post-job": {
    en: "Post a Job",
    ru: "Разместить вакансию",
  },
  "nav-create-resume": {
    en: "Create Resume",
    ru: "Создать резюме",
  },

  // Главная страница
  "hero-title": {
    en: "Find Your Dream Job Today",
    ru: "Найдите работу мечты сегодня",
  },
  "hero-subtitle": {
    en: "Search through thousands of job listings",
    ru: "Поиск среди тысяч вакансий",
  },
  "search-placeholder": {
    en: "Job title, keywords, or company",
    ru: "Должность, ключевые слова или компания",
  },
  "location-placeholder": {
    en: "City or region",
    ru: "Город или регион",
  },
  "search-button": {
    en: "Search",
    ru: "Поиск",
  },
  "popular-categories": {
    en: "Popular Categories",
    ru: "Популярные категории",
  },
  "featured-jobs": {
    en: "Featured Jobs",
    ru: "Рекомендуемые вакансии",
  },
  "view-all-jobs": {
    en: "View All Jobs",
    ru: "Посмотреть все вакансии",
  },
  "top-employers": {
    en: "Top Employers",
    ru: "Ведущие работодатели",
  },
  "job-count": {
    en: "jobs available",
    ru: "доступных вакансий",
  },

  // Страница поиска работы
  "filter-title": {
    en: "Filter Jobs",
    ru: "Фильтр вакансий",
  },
  "filter-category": {
    en: "Category",
    ru: "Категория",
  },
  "filter-location": {
    en: "Location",
    ru: "Местоположение",
  },
  "filter-salary": {
    en: "Salary Range",
    ru: "Диапазон зарплаты",
  },
  "filter-type": {
    en: "Job Type",
    ru: "Тип работы",
  },
  "filter-experience": {
    en: "Experience Level",
    ru: "Уровень опыта",
  },
  "filter-apply": {
    en: "Apply Filters",
    ru: "Применить фильтры",
  },
  "filter-reset": {
    en: "Reset Filters",
    ru: "Сбросить фильтры",
  },
  "sort-by": {
    en: "Sort by:",
    ru: "Сортировать по:",
  },
  "sort-relevance": {
    en: "Relevance",
    ru: "Релевантности",
  },
  "sort-date": {
    en: "Date",
    ru: "Дате",
  },
  "sort-salary": {
    en: "Salary",
    ru: "Зарплате",
  },

  // Страница работодателей
  "employer-hero-title": {
    en: "Find the Best Talent for Your Company",
    ru: "Найдите лучшие таланты для вашей компании",
  },
  "employer-hero-subtitle": {
    en: "Post jobs, search resumes, and build your employer brand",
    ru: "Размещайте вакансии, ищите резюме и развивайте HR-бренд",
  },
  "post-job-button": {
    en: "Post a Job",
    ru: "Разместить вакансию",
  },
  "employer-benefits": {
    en: "Employer Benefits",
    ru: "Преимущества для работодателей",
  },
  "pricing-plans": {
    en: "Pricing Plans",
    ru: "Тарифные планы",
  },
  "plan-basic": {
    en: "Basic",
    ru: "Базовый",
  },
  "plan-standard": {
    en: "Standard",
    ru: "Стандартный",
  },
  "plan-premium": {
    en: "Premium",
    ru: "Премиум",
  },
  "per-month": {
    en: "per month",
    ru: "в месяц",
  },
  "get-started": {
    en: "Get Started",
    ru: "Начать",
  },

  // Страница создания резюме
  "create-resume-title": {
    en: "Create Your Resume",
    ru: "Создайте ваше резюме",
  },
  "personal-info": {
    en: "Personal Information",
    ru: "Личная информация",
  },
  education: {
    en: "Education",
    ru: "Образование",
  },
  experience: {
    en: "Work Experience",
    ru: "Опыт работы",
  },
  skills: {
    en: "Skills",
    ru: "Навыки",
  },
  languages: {
    en: "Languages",
    ru: "Языки",
  },
  "add-education": {
    en: "Add Education",
    ru: "Добавить образование",
  },
  "add-experience": {
    en: "Add Experience",
    ru: "Добавить опыт",
  },
  "add-skill": {
    en: "Add Skill",
    ru: "Добавить навык",
  },
  "save-resume": {
    en: "Save Resume",
    ru: "Сохранить резюме",
  },

  // Страница деталей вакансии
  "job-details": {
    en: "Job Details",
    ru: "Детали вакансии",
  },
  "company-info": {
    en: "Company Information",
    ru: "Информация о компании",
  },
  "apply-now": {
    en: "Apply Now",
    ru: "Откликнуться",
  },
  "save-job": {
    en: "Save Job",
    ru: "Сохранить вакансию",
  },
  "job-description": {
    en: "Job Description",
    ru: "Описание вакансии",
  },
  responsibilities: {
    en: "Responsibilities",
    ru: "Обязанности",
  },
  requirements: {
    en: "Requirements",
    ru: "Требования",
  },
  benefits: {
    en: "Benefits",
    ru: "Преимущества",
  },
  "similar-jobs": {
    en: "Similar Jobs",
    ru: "Похожие вакансии",
  },

  // Футер
  "footer-about": {
    en: "About Us",
    ru: "О нас",
  },
  "footer-contact": {
    en: "Contact Us",
    ru: "Связаться с нами",
  },
  "footer-privacy": {
    en: "Privacy Policy",
    ru: "Политика конфиденциальности",
  },
  "footer-terms": {
    en: "Terms of Service",
    ru: "Условия использования",
  },
  "footer-copyright": {
    en: "All rights reserved",
    ru: "Все права защищены",
  },

  // Кнопки и действия
  "btn-more": {
    en: "Learn More",
    ru: "Подробнее",
  },
  "btn-submit": {
    en: "Submit",
    ru: "Отправить",
  },
  "btn-cancel": {
    en: "Cancel",
    ru: "Отмена",
  },
  "btn-save": {
    en: "Save",
    ru: "Сохранить",
  },
  "btn-next": {
    en: "Next",
    ru: "Далее",
  },
  "btn-prev": {
    en: "Previous",
    ru: "Назад",
  },

  // Языковой переключатель
  "language-selector": {
    en: "Language",
    ru: "Язык",
  },
  "lang-en": {
    en: "English",
    ru: "Английский",
  },
  "lang-ru": {
    en: "Russian",
    ru: "Русский",
  },
}
