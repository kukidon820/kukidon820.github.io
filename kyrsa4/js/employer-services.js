
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

  // Pricing Card Hover Effect
  const pricingCards = document.querySelectorAll('.pricing-card');

  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('popular')) {
        pricingCards.forEach(otherCard => {
          if (otherCard.classList.contains('popular')) {
            otherCard.style.transform = 'scale(1)';
          }
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      pricingCards.forEach(otherCard => {
        if (otherCard.classList.contains('popular')) {
          otherCard.style.transform = 'scale(1.05)';
        }
      });
    });
  });
});