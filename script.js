document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for header and footer nav links
  function smoothScroll(selector) {
    const links = document.querySelectorAll(selector);
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === '') {
          // scroll to top for logo
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }
  // Header logo (href="#") scrolls to top
  smoothScroll('header .logo, footer .logo');
  // Header nav links
  smoothScroll('.main-nav a, .footer-nav a');

  // Language switcher dropdown
  const langSwitcher = document.querySelector('.lang-switcher');
  const langMenu = document.createElement('ul');
  langMenu.className = 'lang-dropdown';
  langMenu.style.position = 'absolute';
  langMenu.style.top = '100%';
  langMenu.style.left = '0';
  langMenu.style.background = '#fff';
  langMenu.style.listStyle = 'none';
  langMenu.style.padding = '10px 0';
  langMenu.style.margin = '5px 0 0';
  langMenu.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  langMenu.style.display = 'none';
  ['Русский','English'].forEach(label => {
    const li = document.createElement('li');
    li.textContent = label;
    li.style.padding = '8px 20px';
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      // TODO: switch language logic here
      console.log('Language switched to', label);
      langMenu.style.display = 'none';
    });
    li.addEventListener('mouseover', () => li.style.background = '#f0f0f0');
    li.addEventListener('mouseout', () => li.style.background = '');
    langMenu.appendChild(li);
  });
  langSwitcher.style.position = 'relative';
  langSwitcher.appendChild(langMenu);
  langSwitcher.addEventListener('click', () => {
    langMenu.style.display = langMenu.style.display === 'none' ? 'block' : 'none';
  });

  // Presentation and form buttons
  document.querySelectorAll('.btn-primary[href="#contact"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('Питч_русс.pdf', '_blank');
    });
  });
  document.querySelectorAll('.btn-outline, .btn-primary.leave-request').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSepxg-kvVxeZqhKA_bnhKKQf-z73vcy0xZMofaEwBlPdazt5Q/viewform', '_blank');
    });
  });

  // Contact cards
  const telegramCard = document.querySelector('.contact-card a[href="#"]:first-child');
  if (telegramCard) {
    telegramCard.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://t.me/val_world', '_blank');
    });
  }
  const emailCard = Array.from(document.querySelectorAll('.contact-card')).find(card => card.querySelector('strong').textContent.includes('@'));
  if (emailCard) {
    emailCard.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'mailto:founders@tot.ai';
    });
  }
// === Карусель скриншотов ===
  //
  const wrapper = document.querySelector('.carousel-wrapper');
  if (!wrapper) return;  // секция не найдена — выходим

  const track     = wrapper.querySelector('.carousel-track');
  const slides    = Array.from(track.children);
  const prevBtn   = wrapper.querySelector('.carousel-prev');
  const nextBtn   = wrapper.querySelector('.carousel-next');
  const popup     = document.getElementById('carouselPopup');
  const popupImg  = popup.querySelector('.popup-image');
  const popupClose= popup.querySelector('.popup-close');
  const popupPrev = popup.querySelector('.popup-prev');
  const popupNext = popup.querySelector('.popup-next');

  let currentIndex = 0;
  let popupIndex   = 0;
  let timer        = setInterval(nextSlide, 10000);

  function update() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('center', i === currentIndex);
      slide.classList.toggle('side',    i !== currentIndex);
    });
    // Центрируем текущий слайд в окне wrapper
    const cw = wrapper.clientWidth;
    const cs = slides[currentIndex];
    const offset = cs.offsetLeft - (cw - cs.clientWidth) / 2;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; update(); }
  function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; update(); }

  nextBtn.addEventListener('click', () => {
    clearInterval(timer);
    nextSlide();
    timer = setInterval(nextSlide, 10000);
  });
  prevBtn.addEventListener('click', () => {
    clearInterval(timer);
    prevSlide();
    timer = setInterval(nextSlide, 10000);
  });

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      popupIndex = i;
      popupImg.src = slide.querySelector('img').src;
      popup.classList.add('show');
    });
  });

  popupClose.addEventListener('click', () => popup.classList.remove('show'));
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('show');
  });

  popupPrev.addEventListener('click', () => {
    popupIndex = (popupIndex - 1 + slides.length) % slides.length;
    popupImg.src = slides[popupIndex].querySelector('img').src;
  });
  popupNext.addEventListener('click', () => {
    popupIndex = (popupIndex + 1) % slides.length;
    popupImg.src = slides[popupIndex].querySelector('img').src;
  });

  // Запускаем
  update();
});