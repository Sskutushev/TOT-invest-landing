// dropdown language
document.addEventListener('click', e => {
  const sw = document.querySelector('.lang-switcher');
  if (e.target.closest('.lang-btn')) {
    sw.classList.toggle('open');
  } else {
    sw.classList.remove('open');
  }
});
/* ===== burger menu ===== */
const burger   = document.querySelector('.burger-btn');
const mNav     = document.querySelector('.mobile-nav');
const mOverlay = document.querySelector('.mobile-overlay');

if (burger){
  burger.addEventListener('click', ()=>{
    burger.classList.toggle('open');
    mNav.classList.toggle('open');
    mOverlay.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  });
  mOverlay.addEventListener('click', ()=> burger.click());
  mNav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> burger.click()));
}

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