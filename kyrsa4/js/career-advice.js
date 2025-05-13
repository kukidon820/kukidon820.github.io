document.addEventListener('DOMContentLoaded', function() {
  // Category buttons
  const categoryButtons = document.querySelectorAll('.category-button');

  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Here you would typically filter articles based on category
      // For demo purposes, we'll just show a loading effect

      const articlesGrid = document.querySelector('.articles-grid');
      articlesGrid.style.opacity = '0.5';

      setTimeout(() => {
        articlesGrid.style.opacity = '1';
      }, 500);
    });
  });

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button[type="submit"]');

      if (!emailInput.value.trim()) {
        alert('Пожалуйста, введите email');
        return;
      }

      // Simulate form submission
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Спасибо за подписку! Мы отправили письмо с подтверждением на ваш email.');
        emailInput.value = '';
        submitBtn.textContent = 'Подписаться';
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Article Read More functionality
  const readMoreLinks = document.querySelectorAll('.read-more');

  readMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const articleCard = this.closest('.article-card') || this.closest('.featured-article-content');
      const articleDescription = articleCard.querySelector('p');
      const fullContent = this.getAttribute('data-full-content');

      if (this.textContent === 'Читать далее') {
        // Store original text to restore later
        this.setAttribute('data-original-text', articleDescription.innerHTML);
        // Show full content
        articleDescription.innerHTML = fullContent;
        this.textContent = 'Свернуть';
      } else {
        // Restore original text
        articleDescription.innerHTML = this.getAttribute('data-original-text');
        this.textContent = 'Читать далее';
      }
    });
  });
});