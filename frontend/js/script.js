// ===== PRELOADER =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio inicializando...');
  
  // Forzar carga del preloader
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
      }, 500);
    }
  }, 500);
});

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const heroRole = document.querySelector('.hero-role .highlight');
  if (!heroRole) return;
  
  const texts = ['Frontend', 'React', 'JavaScript', 'Web'];
  let currentIndex = 0;
  let currentText = '';
  let isDeleting = false;
  let speed = 100;
  
  function type() {
    const fullText = texts[currentIndex];
    
    if (isDeleting) {
      currentText = fullText.substring(0, currentText.length - 1);
    } else {
      currentText = fullText.substring(0, currentText.length + 1);
    }
    
    heroRole.textContent = currentText;
    
    let delta = speed;
    
    if (!isDeleting && currentText === fullText) {
      delta = 2000;
      isDeleting = true;
    } else if (isDeleting && currentText === '') {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % texts.length;
      delta = 500;
    } else if (isDeleting) {
      delta = speed / 2;
    }
    
    setTimeout(type, delta);
  }
  
  // Iniciar después de un delay
  setTimeout(type, 1500);
}

// ===== DARK MODE TOGGLE =====
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
    document.documentElement.classList.add('dark-mode');
  }
  
  themeToggle.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
    
    // Guardar preferencia
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Notificación
    showNotification(
      `Modo ${isDark ? 'oscuro' : 'claro'} activado`,
      'info'
    );
  });
}

// ===== DOM ELEMENTS =====
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  if (!menuToggle || !nav) return;
  
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  if (!backToTop) return;
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  const parallaxBg = document.querySelector('.parallax-bg');
  if (!parallaxBg) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const speed = parallaxBg.dataset.speed || 0.3;
    const yPos = -(scrolled * speed);
    parallaxBg.style.transform = `translateY(${yPos}px)`;
  });
}

// ===== SCROLL REVEAL MEJORADO =====
function initScrollReveal() {
  const elements = document.querySelectorAll(
    'section, .project-card, .skill-category, .contact-item, .stat-item'
  );
  
  if (elements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Animar elementos hijos con delays escalonados
        const childElements = entry.target.querySelectorAll(
          '.skill-tag, .contact-icon, .stat-number'
        );
        
        childElements.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('revealed');
          }, index * 100);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  elements.forEach(el => {
    observer.observe(el);
  });
}

// ===== ANIMATED COUNTERS =====
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        const match = text.match(/(\d+)(\+?)/);
        
        if (!match) {
          observer.unobserve(element);
          return;
        }
        
        const finalValue = parseInt(match[1]);
        const hasPlus = match[2] === '+';
        let currentValue = 0;
        const duration = 1500;
        const increment = finalValue / (duration / 16);
        
        function updateCounter() {
          currentValue += increment;
          if (currentValue < finalValue) {
            element.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = finalValue + (hasPlus ? '+' : '');
            observer.unobserve(element);
          }
        }
        
        requestAnimationFrame(updateCounter);
      }
    });
  }, { 
    threshold: 0.5,
    rootMargin: '50px' 
  });
  
  statNumbers.forEach(number => observer.observe(number));
}

// ===== FORM VALIDATION =====
function initFormValidation() {
  if (!contactForm) return;
  
  const inputs = contactForm.querySelectorAll('input, textarea');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  
  // Validación en tiempo real
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  // Validar campo individual
  function validateField(field) {
    const value = field.value.trim();
    const errorDiv = field.parentNode.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Validar campo requerido
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'Este campo es obligatorio';
    }
    // Validar email
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Por favor, ingresa un email válido';
      }
    }
    // Validar mensaje mínimo
    else if (field.name === 'message' && value.length < 10) {
      isValid = false;
      message = 'El mensaje debe tener al menos 10 caracteres';
    }
    // Validar nombre
    else if (field.name === 'name' && value.length < 2) {
      isValid = false;
      message = 'El nombre debe tener al menos 2 caracteres';
    }
    
    // Mostrar/ocultar error
    if (!isValid) {
      field.classList.add('error');
      errorDiv.textContent = message;
    } else {
      field.classList.remove('error');
      errorDiv.textContent = '';
    }
    
    return isValid;
  }
  
  // Validar todo el formulario
  function validateForm() {
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) isValid = false;
    });
    return isValid;
  }
  
  // Enviar formulario
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Por favor, corrige los errores en el formulario', 'error');
      return;
    }
    
    // Mostrar estado de carga
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Enviando...</span>
    `;
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simular envío (reemplazar con fetch real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular éxito
      showNotification('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
      contactForm.reset();
      
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
    } finally {
      // Restaurar botón
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
    }
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  // Crear contenedor si no existe
  let container = document.querySelector('.notification-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
  }
  
  // Crear notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  notification.innerHTML = `
    <p>${message}</p>
    <button class="notification-close">&times;</button>
  `;
  
  container.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 10);
  
  // Auto-remover después de 5 segundos
  const autoRemove = setTimeout(() => {
    removeNotification(notification);
  }, 5000);
  
  // Cerrar manualmente
  notification.querySelector('.notification-close').addEventListener('click', () => {
    clearTimeout(autoRemove);
    removeNotification(notification);
  });
  
  // Función para remover notificación
  function removeNotification(notif) {
    notif.style.transform = 'translateX(100%)';
    notif.style.opacity = '0';
    setTimeout(() => {
      if (notif.parentNode === container) {
        container.removeChild(notif);
      }
      // Remover contenedor si está vacío
      if (container.children.length === 0) {
        container.remove();
      }
    }, 300);
  }
}

// ===== PROJECT CARD INTERACTIONS =====
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Tilt effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 5;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateY(-10px)
        scale(1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
    
    // Click para modal (opcional)
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.project-link')) {
        // Aquí puedes agregar funcionalidad de modal si quieres
        console.log('Proyecto clickeado:', card.dataset.project);
      }
    });
  });
}

// ===== SKILLS HOVER EFFECT =====
function initSkillsHover() {
  const skills = document.querySelectorAll('.skill-tag');
  
  skills.forEach(skill => {
    skill.addEventListener('mouseenter', (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      skill.style.setProperty('--mouse-x', `${x}px`);
      skill.style.setProperty('--mouse-y', `${y}px`);
      skill.classList.add('hover');
    });
    
    skill.addEventListener('mouseleave', () => {
      skill.classList.remove('hover');
    });
  });
}

// ===== UPDATE COPYRIGHT YEAR =====
function updateCopyrightYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Cerrar menú móvil si está abierto
      if (nav && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// ===== MODAL FUNCTIONALITY =====
function initModal() {
  if (!modal || !modalClose) return;
  
  // Cerrar modal
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Cerrar modal al hacer clic fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===== INITIALIZE EVERYTHING =====
function initPortfolio() {
  console.log('🎯 Inicializando portfolio...');
  
  // Inicializar funciones
  initTypingEffect();
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initBackToTop();
  initParallax();
  initScrollReveal();
  initAnimatedCounters();
  initFormValidation();
  initProjectCards();
  initSkillsHover();
  updateCopyrightYear();
  initSmoothScroll();
  initModal();
  
  // Inicializar después de un pequeño delay
  setTimeout(() => {
    // Forzar scroll para activar efectos
    window.dispatchEvent(new Event('scroll'));
  }, 100);
  
  console.log('✅ Portfolio inicializado correctamente');
  
  // Mensaje de bienvenida en consola
  console.log('%c✨ Portfolio de Alejandro Mantilla ✨', 
    'color: #2563eb; font-size: 18px; font-weight: bold;'
  );
  console.log('%c🚀 ¡Bienvenido! ¿Interesado en colaborar? ¡Contáctame!',
    'color: #7c3aed; font-size: 14px;'
  );
}

// ===== INICIAR CUANDO EL DOM ESTÉ LISTO =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
  console.error('Error en el portfolio:', e.error);
  
  // Mostrar error amigable
  if (!window.location.hostname.includes('localhost')) {
    showNotification('Ocurrió un error inesperado. Por favor, recarga la página.', 'error');
  }
});

// ===== DETECCIÓN OFFLINE =====
window.addEventListener('online', () => {
  showNotification('¡Conexión restaurada!', 'success');
});

window.addEventListener('offline', () => {
  showNotification('Estás trabajando sin conexión', 'info');
});