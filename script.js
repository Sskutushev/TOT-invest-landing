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

  // Language switcher buttons
  const langSwitcher = document.querySelector('.lang-switcher');
  const langBtns = document.querySelectorAll('.lang-btn');  // Переключатели флагов

  // Список языков с путями к иконкам
  const languages = [
    { short: 'Рус', full: 'Русский', flag: 'img/Ellipse 2.svg', code: 'ru' },
    { short: 'Eng', full: 'English', flag: 'img/eng.svg', code: 'en' }
  ];

  // Устанавливаем текущий язык (по умолчанию русский)
  let current = languages[0];
  langSwitcher.innerHTML = `
    <img src="${current.flag}" alt="${current.full} Flag" class="lang-flag">
    <span>${current.short}</span>
  `;

  // Смена языка по клику на флаг
  langBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      current = languages[index];  // выбираем язык по индексу кнопки
      langSwitcher.querySelector('img').src = current.flag;
      langSwitcher.querySelector('img').alt = `${current.full} Flag`;
      langSwitcher.querySelector('span').textContent = current.short;

      // После выбора языка меняем текст на странице
      switchLanguage(current.code);
    });
  });

  // Функция для переключения языка
  function switchLanguage(language) {
    const elements = document.querySelectorAll('[data-en], [data-ru]');
    elements.forEach(el => {
      el.textContent = el.getAttribute(`data-${language}`);
    });
  }

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
  const wrapper = document.querySelector('#screenshots .carousel-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector('.carousel-track');
  const slides = Array.from(wrapper.querySelectorAll('.carousel-slide'));
  const prevBtn = wrapper.querySelector('.carousel-prev');
  const nextBtn = wrapper.querySelector('.carousel-next');

  // Pop-up элементы
  const popup = document.getElementById('carouselPopup');
  const popupImg = popup.querySelector('.popup-image');
  const closeBtn = popup.querySelector('.popup-close');
  const popupPrev = popup.querySelector('.popup-prev');
  const popupNext = popup.querySelector('.popup-next');

  let currentIndex = 0;
  let timer = setInterval(nextSlide, 10000);

  function update() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('main-slide', i === currentIndex);
      slide.classList.toggle('side', i !== currentIndex);
    });
    // Центрируем текущий слайд
    const cw = wrapper.getBoundingClientRect().width;
    const cs = slides[currentIndex];
    const sw = cs.getBoundingClientRect().width;
    const offset = cs.offsetLeft - (cw - sw) / 2;
    track.style.transform = `translateX(-${Math.max(0, offset)}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    update();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    update();
  }

  // Навигация карусели
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

  // Открытие поп-апа
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      currentIndex = i;
      popupImg.src = slide.querySelector('img').src;
      popup.classList.add('active');
      clearInterval(timer);
    });
  });

  // Закрытие поп-апа
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
    timer = setInterval(nextSlide, 10000);
  });
  popup.addEventListener('click', e => {
    if (e.target === popup) {
      popup.classList.remove('active');
      timer = setInterval(nextSlide, 10000);
    }
  });

  // Листание внутри поп-апа
  popupPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    popupImg.src = slides[currentIndex].querySelector('img').src;
  });
  popupNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    popupImg.src = slides[currentIndex].querySelector('img').src;
  });

  // Инициализация
  update();

  // Бургер-меню
  const burger = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (burger && nav) {
    burger.addEventListener('click', e => {
      e.stopPropagation();
      nav.classList.toggle('is-open');
      burger.classList.toggle('is-open');
    });

    // Закрываем при клике вне меню
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
      }
    });
  }
});
