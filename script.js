// Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Typing effect
  const roles = ["Web Developer", "UI / UX Enthusiast", "Frontend Engineer", "Problem Solver"];
  const typedEl = document.getElementById('typedText');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = roles[roleIndex];
    if(!deleting){
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if(charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1200);
        return;
      }
    } else {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if(charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }
  typeLoop();

  // Fade-in on scroll + skill bar animation
  const faders = document.querySelectorAll('.fade-up');
  const skillBars = document.querySelectorAll('.bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  faders.forEach(el => observer.observe(el));

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width') + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // Contact form validation (front-end only demo)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(name === '' || email === '' || message === ''){
      formMsg.textContent = 'Please fill in all fields.';
      formMsg.className = 'form-msg error';
      return;
    }
    if(!emailPattern.test(email)){
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.className = 'form-msg error';
      return;
    }
    formMsg.textContent = 'Message sent successfully! I will get back to you soon.';
    formMsg.className = 'form-msg success';
    form.reset();
  });

  // Active nav link highlight on scroll
  const sections = document.querySelectorAll('section');
  const navA = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = window.scrollY;
      if(top >= sec.offsetTop - 150){
        current = sec.getAttribute('id');
      }
    });
    navA.forEach(a => {
      a.style.color = 'var(--white)';
      if(a.getAttribute('href') === '#' + current){
        a.style.color = 'var(--blue-light)';
      }
    });
  });