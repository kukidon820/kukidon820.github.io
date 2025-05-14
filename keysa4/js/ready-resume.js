document.addEventListener('DOMContentLoaded', function() {
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Testimonial Slider
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');

  // Simulate slider functionality
  let currentSlide = 0;
  const totalSlides = dots.length;

  function showSlide(index) {
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // In a real implementation, you would also update the visible slide
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Template Details functionality
  const templateCards = document.querySelectorAll('.template-card');

  templateCards.forEach(card => {
    const previewButton = card.querySelector('.btn-primary');


    previewButton.addEventListener('click', function(e) {
      e.preventDefault();

      const templateId = this.getAttribute('data-template-id');
      const templateDetails = document.getElementById(`template-details-${templateId}`);

      if (templateDetails) {
        if (templateDetails.style.display === 'none' || !templateDetails.style.display) {
          templateDetails.style.display = 'block';
          this.textContent = 'Скрыть детали';
        } else {
          templateDetails.style.display = 'none';
          this.textContent = 'Выбрать шаблон';
        }
      }
    });
  });
});