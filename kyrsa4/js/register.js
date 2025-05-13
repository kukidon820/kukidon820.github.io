
    // Переключение между типами пользователей (соискатель/работодатель)
    const userTypeTabs = document.querySelectorAll('.user-type-tab');
    const jobSeekerForm = document.querySelector('.job-seeker-form');
    const employerForm = document.querySelector('.employer-form');
    const jobSeekerBenefits = document.querySelector('.job-seeker-benefits');
    const employerBenefits = document.querySelector('.employer-benefits');

    userTypeTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Удаляем активный класс у всех вкладок
        userTypeTabs.forEach(t => t.classList.remove('active'));
        // Добавляем активный класс текущей вкладке
        this.classList.add('active');

        const userType = this.getAttribute('data-type');

        if (userType === 'job-seeker') {
          jobSeekerForm.style.display = 'block';
          employerForm.style.display = 'none';
          jobSeekerBenefits.style.display = 'block';
          employerBenefits.style.display = 'none';
        } else {
          jobSeekerForm.style.display = 'none';
          employerForm.style.display = 'block';
          jobSeekerBenefits.style.display = 'none';
          employerBenefits.style.display = 'block';
        }
      });
    });

    // Показать/скрыть пароль
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        const icon = this.querySelector('i');

        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          passwordInput.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });

    // Проверка надежности пароля
    const passwordInputs = document.querySelectorAll('input[type="password"][id$="password"]:not([id*="confirm"])');

    passwordInputs.forEach(input => {
      input.addEventListener('input', function() {
        const password = this.value;
        const strengthBar = this.parentElement.nextElementSibling.querySelector('.strength-level');
        const strengthText = this.parentElement.nextElementSibling.querySelector('.strength-text');

        // Простая проверка надежности пароля
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;

        strengthBar.style.width = strength + '%';

        if (strength <= 25) {
          strengthBar.style.backgroundColor = '#ff4d4d';
          strengthText.textContent = 'Слабый пароль';
        } else if (strength <= 50) {
          strengthBar.style.backgroundColor = '#ffa64d';
          strengthText.textContent = 'Средний пароль';
        } else if (strength <= 75) {
          strengthBar.style.backgroundColor = '#ffff4d';
          strengthText.textContent = 'Хороший пароль';
        } else {
          strengthBar.style.backgroundColor = '#4dff4d';
          strengthText.textContent = 'Надежный пароль';
        }
      });
    });