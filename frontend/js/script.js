// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
});

// Efecto typing en el hero
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
      delta = 2000; // Pausa al completar
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
  
  setTimeout(type, 1000);
}

// Llamar la función
initTypingEffect();

// Dark Mode Toggle
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
    document.documentElement.classList.add('dark-mode');
  }
  
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    
    // Guardar preferencia
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

initThemeToggle();

// ===== DOM ELEMENTS =====
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.querySelector('.contact-form');

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ===== MOBILE MENU =====
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
  
  // Cerrar menú al hacer clic en un enlace
  if (nav.classList.contains('active')) {
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== FORM SUBMISSION =====
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora, solo mostraremos un mensaje de éxito
    alert('¡Gracias por tu mensaje! Te responderé pronto.');
    contactForm.reset();
    
    // En un caso real, aquí iría:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   alert('Mensaje enviado correctamente');
    //   contactForm.reset();
    // })
    // .catch(error => {
    //   alert('Error al enviar el mensaje');
    // });
  });
}

// ===== ANIMACIONES AL SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

// ===== CONTADOR ANIMADO =====
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const finalValue = parseInt(element.textContent);
        const suffix = element.textContent.replace(finalValue, '');
        let currentValue = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            element.textContent = finalValue + suffix;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(currentValue) + suffix;
          }
        }, 20);
        observerStats.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(number => observerStats.observe(number));
}

// ===== PRELOADER (OPCIONAL) =====
window.addEventListener('load', () => {
  // Puedes agregar un preloader si lo deseas
  // document.body.classList.add('loaded');
});

// ===== COPYRIGHT YEAR =====
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== SKILLS HOVER EFFECT =====
document.querySelectorAll('.skill-tag').forEach(skill => {
  skill.addEventListener('mouseenter', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
  });
});

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 25;
    const rotateX = (centerY - y) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    setTimeout(() => {
      card.style.transform = 'translateY(-10px)';
    }, 300);
  });
});

console.log('Portfolio cargado correctamente 🚀');