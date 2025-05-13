
document.addEventListener('DOMContentLoaded', function() {
  // Help Categories Accordion
  const categoryTitles = document.querySelectorAll('.help-category-title');

  categoryTitles.forEach(title => {
    title.addEventListener('click', () => {
      const category = title.parentElement;

      // Toggle active class
      category.classList.toggle('active');
    });
  });

  // Feedback Buttons
  const feedbackButtons = document.querySelectorAll('.feedback-button');

  feedbackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feedbackSection = document.querySelector('.help-feedback');

      // Show thank you message
      feedbackSection.innerHTML = '<h3>Спасибо за ваш отзыв!</h3><p>Мы используем ваши отзывы для улучшения нашего центра помощи.</p>';
    });
  });

  // Search Functionality
  const searchInput = document.querySelector('.help-search input');

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
          // Simulate search results
          alert(`Поиск по запросу: "${searchTerm}"`);
        }
      }
    });
  }

  // Help Article Read More functionality
  const helpArticleLinks = document.querySelectorAll('.help-article a');

  helpArticleLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const article = this.closest('.help-article');
      const articleContent = article.querySelector('p');
      const fullContent = this.getAttribute('data-full-content');

      if (this.textContent === 'Читать полностью') {
        // Store original text to restore later
        this.setAttribute('data-original-text', articleContent.innerHTML);
        // Show full content
        articleContent.innerHTML = fullContent;
        this.textContent = 'Свернуть';
      } else {
        // Restore original text
        articleContent.innerHTML = this.getAttribute('data-original-text');
        this.textContent = 'Читать полностью';
      }
    });
  });
});