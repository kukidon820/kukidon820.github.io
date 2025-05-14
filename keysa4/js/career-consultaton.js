
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      item.classList.toggle('active');
    });
  });

  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');

  let currentSlide = 0;
  const totalSlides = dots.length;

  function showSlide(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

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

  const consultationForm = document.getElementById('consultation-form');

  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const serviceType = document.getElementById('service-type').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      if (!name || !email || !phone || !serviceType || !date || !time) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Спасибо за запись на консультацию! Мы свяжемся с вами в ближайшее время для подтверждения.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Consultant Details functionality
  const consultantCards = document.querySelectorAll('.consultant-card');

  consultantCards.forEach(card => {
    const consultantName = card.querySelector('h3').textContent;
    const moreDetailsLink = document.createElement('a');
    moreDetailsLink.href = '#';
    moreDetailsLink.className = 'btn btn-outline btn-sm';
    moreDetailsLink.textContent = 'Подробнее';
    moreDetailsLink.style.marginTop = '15px';
    moreDetailsLink.setAttribute('data-consultant-id', consultantName.replace(/\s+/g, '-').toLowerCase());

    const metaDiv = card.querySelector('.consultant-meta');
    metaDiv.parentNode.insertBefore(moreDetailsLink, metaDiv.nextSibling);

    // Create hidden details div
    const detailsDiv = document.createElement('div');
    detailsDiv.id = `consultant-details-${moreDetailsLink.getAttribute('data-consultant-id')}`;
    detailsDiv.style.display = 'none';
    detailsDiv.style.marginTop = '15px';
    detailsDiv.style.paddingTop = '15px';
    detailsDiv.style.borderTop = '1px solid var(--border-color)';

    // Add content based on consultant
    if (consultantName === 'Елена Смирнова') {
      detailsDiv.innerHTML = `
        <h4>Специализация:</h4>
        <ul style="list-style: disc; padding-left: 20px; margin-bottom: 15px;">
          <li>IT и технологические компании</li>
          <li>Финансовый сектор</li>
          <li>Карьерные переходы между индустриями</li>
          <li>Развитие лидерских качеств</li>
        </ul>
        <h4>Образование и сертификаты:</h4>
        <ul style="list-style: disc; padding-left: 20px; margin-bottom: 15px;">
          <li>MBA, Высшая школа экономики</li>
          <li>Сертифицированный карьерный коуч (ICF)</li>
          <li>Сертификат MBTI практика</li>
        </ul>
        <p>Елена помогла более 500 специалистам найти работу мечты и построить успешную карьеру. Ее клиенты работают в ведущих компаниях, включая Яндекс, Сбербанк, Google и Microsoft.</p>
      `;
    } else if (consultantName === 'Александр Петров') {
      detailsDiv.innerHTML = `
        <h4>Специализация:</h4>
        <ul style="list-style: disc; padding-left: 20px; margin-bottom: 15px;">
          <li>Развитие лидерских качеств</li>
          <li>Карьерный рост в крупных корпорациях</li>
          <li>Переговоры о зарплате и условиях работы</li>
          <li>Подготовка к собеседованиям на руководящие позиции</li>
        </ul>
        <h4>Образование и сертификаты:</h4>
        <ul style="list-style: disc; padding-left: 20px; margin-bottom: 15px;">
          <li>Executive MBA, INSEAD</li>
          <li>Сертифицированный коуч (ICF PCC)</li>
          <li>Сертификат по организационной психологии</li>
        </ul>
        <p>Александр имеет 15-летний опыт работы в международных компаниях на руководящих позициях. Он помогает клиентам развивать лидерские навыки и строить успешную карьеру в корпоративном мире.</p>
      `;
    } else if (consultantName === 'Мария Иванова') {
      detailsDiv.innerHTML = `
        <h4>Специализация:</h4>
        <ul style="list-style: disc; padding-left: 20px; margin-bottom: 15px;">
          <li>Маркетинг и PR</li>
          <li>Продажи и работа с клиентами</li>
          <li>Административные позиции</li>
          <li>Составление резюме и подготовка к собеседованиям</li>
        </ul>
        <h4>Образование и сертификаты:</h4>
        <ul style="list-style: disc; padding-left: 20px; margin-bottom: 15px;">
          <li>Высшее образование в области HR-менеджмента</li>
          <li>Сертификат SHRM-CP</li>
          <li>Курс "Современные методы подбора персонала"</li>
        </ul>
        <p>Мария специализируется на помощи специалистам в области маркетинга, продаж и административных позиций. Она помогает клиентам создать эффективное резюме, подготовиться к собеседованию и найти работу, соответствующую их навыкам и ожиданиям.</p>
      `;
    }

    moreDetailsLink.parentNode.insertBefore(detailsDiv, moreDetailsLink.nextSibling);

    // Add click event
    moreDetailsLink.addEventListener('click', function(e) {
      e.preventDefault();

      const detailsId = this.getAttribute('data-consultant-id');
      const detailsElement = document.getElementById(`consultant-details-${detailsId}`);

      if (detailsElement) {
        if (detailsElement.style.display === 'none') {
          detailsElement.style.display = 'block';
          this.textContent = 'Скрыть детали';
        } else {
          detailsElement.style.display = 'none';
          this.textContent = 'Подробнее';
        }
      }
    });
  });
});