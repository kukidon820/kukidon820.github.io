document.addEventListener('DOMContentLoaded', function() {
  const salaryForm = document.getElementById('salary-form');
  const salaryResult = document.getElementById('salary-result');

  if (salaryForm) {
    salaryForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate form
      const position = document.getElementById('position').value;
      const city = document.getElementById('city').value;
      const experience = document.getElementById('experience').value;

      if (!position || !city || !experience) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
      }

      // Simulate loading
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Расчет...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show results
        salaryResult.classList.add('active');

        // Scroll to results
        salaryResult.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
});