document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Отправка...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});