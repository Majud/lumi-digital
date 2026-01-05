(() => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (header && navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (header.classList.contains('nav-open')) {
          header.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('.form-status');
    const requiredFields = Array.from(form.querySelectorAll('[data-required]'));
    const emailField = form.querySelector('input[type=email]');
    const nameField = form.querySelector('[name=name]');
    const phoneField = form.querySelector('[name=phone]');
    const messageField = form.querySelector('[name=message]');

    const setStatus = (message, isError) => {
      if (!status) {
        return;
      }
      status.textContent = message;
      status.classList.toggle('is-error', isError);
      status.classList.toggle('is-success', !isError);
      status.hidden = false;
    };

    const markField = (field, isInvalid) => {
      field.classList.toggle('is-invalid', isInvalid);
      field.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
    };

    const isEmailValid = (value) => {
      const at = value.indexOf('@');
      const dot = value.lastIndexOf('.');
      return at > 0 && dot > at + 1 && dot < value.length - 1;
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let hasError = false;

      requiredFields.forEach((field) => {
        const valid = field.type === 'checkbox' ? field.checked : field.value.trim().length > 0;
        markField(field, !valid);
        if (!valid) {
          hasError = true;
        }
      });

      if (emailField && emailField.value.trim()) {
        const emailValid = isEmailValid(emailField.value.trim());
        markField(emailField, !emailValid);
        if (!emailValid) {
          hasError = true;
        }
      }

      if (hasError) {
        setStatus('Bitte prüfen Sie die markierten Felder.', true);
        return;
      }

      const newline = String.fromCharCode(10);
      const name = nameField ? nameField.value.trim() : '';
      const phone = phoneField ? phoneField.value.trim() : '';
      const email = emailField ? emailField.value.trim() : '';
      const message = messageField ? messageField.value.trim() : '';
      const subject = encodeURIComponent('Anfrage über die Website');
      const body = encodeURIComponent([
        'Name: ' + name,
        'Telefon: ' + phone,
        'E-Mail: ' + email,
        '',
        'Nachricht:',
        message
      ].join(newline));

      const mailto = 'mailto:info@musterhandwerk.de?subject=' + subject + '&body=' + body;

      setStatus('Danke! Wir melden uns kurzfristig. Ihr E-Mail-Programm öffnet sich jetzt.', false);
      window.location.href = mailto;
      form.reset();
    });
  }
})();
