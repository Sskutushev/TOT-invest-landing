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
// === Scroll-reveal: анимация при каждом скролле ===
const revealElems = document.querySelectorAll('.scroll-reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.15
  });

  revealElems.forEach(el => observer.observe(el));
} else {
  // для старых браузеров сразу показать всё
  revealElems.forEach(el => el.classList.add('is-visible'));
}
  }
  // Header logo (href="#") scrolls to top
  smoothScroll('header .logo, footer .logo');
  // Header nav links
  smoothScroll('.main-nav a, .footer-nav a');

// Language switcher dropdown
  const langSwitcher = document.querySelector('.lang-switcher');
  const langMenu     = document.createElement('ul');
  langMenu.className = 'lang-dropdown';
  langSwitcher.appendChild(langMenu);

  // Список языков с путями к иконкам
  const languages = [
    { short: 'Рус', full: 'Русский', flag: 'img/Ellipse 2.svg' },
    { short: 'Eng', full: 'English',  flag: 'img/eng.svg'     }
  ];

  // Инициализируем текущее состояние — русский по умолчанию
  let current = languages[0];
  langSwitcher.innerHTML = `
    <img src="${current.flag}" alt="${current.full} Flag">
    <span>${current.short}</span>
    <img src="img/Vector 2 (Stroke).svg" alt="Dropdown Icon">
  `;
  langSwitcher.appendChild(langMenu);

  // Наполняем выпадающий список
  languages.forEach(lang => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${lang.flag}" alt="${lang.full} Flag"><span>${lang.full}</span>`;
    li.addEventListener('click', () => {
      // смена иконки и текста в кнопке
      current = lang;
      langSwitcher.querySelector('img:first-child').src   = lang.flag;
      langSwitcher.querySelector('img:first-child').alt   = `${lang.full} Flag`;
      langSwitcher.querySelector('span').textContent      = lang.short;
      langMenu.style.display = 'none';

      // здесь ваша логика переключения языка...
      console.log('Language switched to', lang.full);
    });
    langMenu.appendChild(li);
  });

  // Показываем/скрываем меню по клику на переключатель
  langSwitcher.addEventListener('click', () => {
    langMenu.style.display = (langMenu.style.display === 'block') ? 'none' : 'block';
  });

  // Закрываем меню по клику вне его
  document.addEventListener('click', e => {
    if (!langSwitcher.contains(e.target)) {
      langMenu.style.display = 'none';
    }
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