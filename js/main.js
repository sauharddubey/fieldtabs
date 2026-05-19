document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navigation Header on Scroll
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page starts scrolled

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });
  }

  // Smooth scroll offsets for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form Validation and Submission Simulation
  const contactForm = document.getElementById('contact-form');
  const statusDiv = document.querySelector('.form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      let isValid = true;
      const errors = [];

      // Clear previous error styles
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) input.classList.remove('is-invalid');
      });

      if (!nameInput || !nameInput.value.trim()) {
        isValid = false;
        if (nameInput) nameInput.classList.add('is-invalid');
        errors.push('Please enter your name.');
      }

      if (!emailInput || !emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        isValid = false;
        if (emailInput) emailInput.classList.add('is-invalid');
        errors.push('Please enter a valid email address.');
      }

      if (!messageInput || !messageInput.value.trim()) {
        isValid = false;
        if (messageInput) messageInput.classList.add('is-invalid');
        errors.push('Please enter your message.');
      }

      if (!isValid) {
        showStatus(errors.join('<br>'), 'error');
        return;
      }

      // Redirect email submission to tarun@fieldtabs.in
      showStatus('Opening your email client...', 'info');
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      setTimeout(() => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim() || 'Field Tabs Inquiry';
        const msg = messageInput.value.trim();
        
        const mailtoLink = `mailto:tarun@fieldtabs.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`
        )}`;
        
        window.location.href = mailtoLink;

        showStatus('Inquiry compiled. If your email client did not launch, please email tarun@fieldtabs.in directly.', 'success');
        contactForm.reset();
        if (submitButton) submitButton.disabled = false;
      }, 800);
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showStatus(message, type) {
    if (!statusDiv) return;
    statusDiv.innerHTML = message;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        statusDiv.style.opacity = '0';
        setTimeout(() => {
          statusDiv.style.display = 'none';
          statusDiv.style.opacity = '1';
        }, 500);
      }, 5000);
    }
  }
});
