document.addEventListener('DOMContentLoaded', function() {
  // Reset filters
  const resetButtons = document.querySelectorAll('.btn-reset-filters');

  resetButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Reset checkboxes and radio buttons
      document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        if (input.name === 'date' && input.value === 'day') {
          input.checked = true;
        } else if (input.type === 'checkbox') {
          input.checked = false;
        } else if (input.type === 'radio' && input.name !== 'date') {
          input.checked = false;
        }
      });

      // Reset inputs
      document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
        input.value = '';
      });
    });
  });

  // Apply filters
  const applyButton = document.querySelector('.btn-apply-filters');

  if (applyButton) {
    applyButton.addEventListener('click', () => {
      // Simulate loading
      const searchResults = document.querySelector('.search-results');

      if (searchResults) {
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';

        searchResults.appendChild(loadingOverlay);

        // Add CSS for loading
        const style = document.createElement('style');
        style.textContent = `
          .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
          }

          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--border-color);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);

        // Remove loading after 1 second
        setTimeout(() => {
          loadingOverlay.remove();

          // Update results count (simulated)
          const resultsNumber = document.getElementById('results-number');
          if (resultsNumber) {
            resultsNumber.textContent = '856';
          }

          // Close filters on mobile
          if (window.innerWidth <= 992) {
            const searchFilters = document.querySelector('.search-filters');
            const toggleButton = document.querySelector('.filter-toggle');

            if (searchFilters && toggleButton) {
              searchFilters.classList.add('filters-hidden');
              toggleButton.classList.remove('active');
              toggleButton.innerHTML = '<i class="fas fa-filter"></i> Фильтры';
            }
          }
        }, 1000);
      }
    });
  }

  // Invite buttons
  const inviteButtons = document.querySelectorAll('.resume-actions .btn-primary');

  inviteButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Check if user is logged in and has subscription
      const isLoggedIn = false; // This would be determined by your authentication system
      const hasSubscription = false; // This would be determined by your subscription system

      if (!isLoggedIn) {
        if (confirm('Для приглашения кандидата необходимо войти в систему. Перейти на страницу входа?')) {
          window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        }
      } else if (!hasSubscription) {
        if (confirm('Для приглашения кандидата необходимо оформить подписку. Перейти к тарифам?')) {
          window.location.href = 'employer-services.html';
        }
      } else {
        // Show invitation form or modal
        alert('Форма приглашения кандидата');
      }
    });
  });

  // Save buttons
  const saveButtons = document.querySelectorAll('.resume-actions .btn-outline');

  saveButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Check if user is logged in
      const isLoggedIn = false; // This would be determined by your authentication system

      if (!isLoggedIn) {
        if (confirm('Для сохранения резюме необходимо войти в систему. Перейти на страницу входа?')) {
          window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        }
      } else {
        // Toggle saved state
        if (button.classList.contains('saved')) {
          button.classList.remove('saved');
          button.innerHTML = 'Сохранить';
          alert('Резюме удалено из сохраненных');
        } else {
          button.classList.add('saved');
          button.innerHTML = '<i class="fas fa-check"></i> Сохранено';
          alert('Резюме добавлено в сохраненные');
        }
      }
    });
  });
});