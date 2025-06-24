// dropdown language
document.addEventListener('click', e => {
  const sw = document.querySelector('.lang-switcher');
  if (e.target.closest('.lang-btn')) {
    sw.classList.toggle('open');
  } else {
    sw.classList.remove('open');
  }
});

;(function(){
  const slides    = Array.from(document.querySelectorAll('.carousel-slide'));
  const prevBtn   = document.querySelector('.carousel-prev');
  const nextBtn   = document.querySelector('.carousel-next');
  const popup     = document.getElementById('carouselPopup');
  const popupImg  = popup.querySelector('.popup-image');
  const popupPrev = popup.querySelector('.popup-prev');
  const popupNext = popup.querySelector('.popup-next');
  const popupClose= popup.querySelector('.popup-close');

  let current  = 0;
  let autoplay = setInterval(goNext, 3000);

  function update() {
    slides.forEach((s,i) => {
      s.classList.remove('prev','active','next');
      if (i === current)                                    s.classList.add('active');
      else if (i === (current-1 + slides.length) % slides.length) s.classList.add('prev');
      else if (i === (current+1) % slides.length)                   s.classList.add('next');
    });
  }

  function goNext() {
    current = (current + 1) % slides.length;
    update();
  }
  function goPrev() {
    current = (current - 1 + slides.length) % slides.length;
    update();
  }

  // «Вперёд»
  nextBtn.addEventListener('click', () => {
    clearInterval(autoplay);
    goNext();
    autoplay = setInterval(goNext, 3000);
  });

  // ← «Назад»
  prevBtn.addEventListener('click', ()=>{
    clearInterval(autoplay);
    goPrev();
    autoplay = setInterval(goNext, 3000);
  });

  // Попап
  slides.forEach((slide,i)=>{
    slide.addEventListener('click', ()=>{
      popupImg.src = slide.querySelector('img').src;
      popup.classList.add('show');
      popupIndex = i;
    });
  });
  let popupIndex = 0;

  popupClose.addEventListener('click', ()=> popup.classList.remove('show'));
  popup.addEventListener('click', e=>{
    if (e.target === popup) popup.classList.remove('show');
  });
  popupPrev.addEventListener('click', ()=>{
    popupIndex = (popupIndex-1+slides.length)%slides.length;
    popupImg.src = slides[popupIndex].querySelector('img').src;
  });
  popupNext.addEventListener('click', ()=>{
    popupIndex = (popupIndex+1)%slides.length;
    popupImg.src = slides[popupIndex].querySelector('img').src;
  });

  // init
  update();
})();
document.querySelector('.js-phone').addEventListener('click', e => {
  const tel = e.currentTarget.getAttribute('href');
  if (!navigator.share && !navigator.userAgent.match(/Mobile/)) {
    e.preventDefault();
    navigator.clipboard.writeText(tel.replace('tel:', ''))
      .then(() => alert('Номер скопирован в буфер обмена'))
      .catch(() => {});
  }
});