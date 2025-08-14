
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const backToTopBtn = document.getElementById('backToTop');
const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.body;

// Função para validar email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Animação do nome
const nomeSpan = document.getElementById('animated-name');
const nomeCompleto = 'Nicolas Paiva';
let index = 0;
let apagar = false;

function animarNome() {
  if (!apagar) {
    nomeSpan.textContent = nomeCompleto.substring(0, index + 1);
    index++;
    if (index === nomeCompleto.length) {
      apagar = true;
      setTimeout(animarNome, 1500);
      return;
    }
  } else {
    nomeSpan.textContent = nomeCompleto.substring(0, index - 1);
    index--;
    if (index === 0) {
      apagar = false;
    }
  }
  setTimeout(animarNome, apagar ? 100 : 200);
}

window.addEventListener('DOMContentLoaded', animarNome);

// Scroll e botão voltar ao topo
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.opacity = '1';
  } else {
    backToTopBtn.style.transform = 'translateY(50px)';
    backToTopBtn.style.opacity = '0';
    setTimeout(() => backToTopBtn.style.display = 'none', 300);
  }
});

backToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => document.body.focus(), 600);
});

// Toggle tema claro/escuro
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  toggleThemeBtn.textContent = '🌙';
  toggleThemeBtn.setAttribute('aria-pressed', 'true');
} else {
  toggleThemeBtn.textContent = '🌞';
  toggleThemeBtn.setAttribute('aria-pressed', 'false');
}

toggleThemeBtn.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-mode');
  toggleThemeBtn.textContent = isLight ? '🌙' : '🌞';
  toggleThemeBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Navegação com scroll suave
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, `#${targetId}`);
    }
  });
});

// Loader fade-out
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if(loader) {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => loader.remove(), 600);
  }
});

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('nav[aria-label="Menu Principal"]');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== menuToggle) {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Card flip
const card = document.getElementById('fotoVideoCard');
card.addEventListener('click', () => {
  card.classList.toggle('flip');
});

// Formulário sem PHP — abre cliente de e-mail
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  // Validação simples
  let valid = true;
  if (name.length < 2) {
    document.getElementById('nameError').textContent = 'Por favor, insira seu nome completo.';
    valid = false;
  }
  if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = 'Por favor, insira um e-mail válido.';
    valid = false;
  }
  if (message.length < 10) {
    document.getElementById('messageError').textContent = 'Sua mensagem deve conter ao menos 10 caracteres.';
    valid = false;
  }
  if (!valid) return;

  // Abre o cliente de e-mail
 window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=nic08pm@gmail.com&su=Contato%20do%20site&body=Nome:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMensagem:%20${encodeURIComponent(message)}`, '_blank');

});

// === Animação de elementos ao descer a página ===
function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150; // quando começar a animar
    
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active'); // opcional: animação volta ao sair da tela
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // garante que elementos já visíveis apareçam

// ScrollReveal animações
ScrollReveal().reveal('.section-title', {
  duration: 1000,
  distance: '50px',
  origin: 'bottom',
  easing: 'ease-out',
  reset: false
});

ScrollReveal().reveal('.sobre-texto p, .services .card, .skills .card, .project-card, .conquistas-list li, #contactForm', {
  duration: 800,
  distance: '30px',
  origin: 'bottom',
  interval: 150,
  easing: 'ease-out',
  reset: false
});
