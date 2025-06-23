// dropdown language
document.addEventListener('click', e => {
  const sw = document.querySelector('.lang-switcher');
  if (e.target.closest('.lang-btn')) {
    sw.classList.toggle('open');
  } else {
    sw.classList.remove('open');
  }
});
