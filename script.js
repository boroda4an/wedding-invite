// Анимация появления секций при прокрутке
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.22 });
document.querySelectorAll('.fade-in, .fade-up').forEach(el => observer.observe(el));

// Таймер до даты свадьбы
function updateTimer() {
  const weddingDate = new Date('2025-07-19T16:00:00+03:00');
  const now = new Date();
  const diff = weddingDate - now;
  if (diff <= 0) {
    document.getElementById('timer').textContent = 'Свадьба уже началась!';
    return;
  }
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor(diff / (1000*60*60)) % 24;
  const m = Math.floor(diff / (1000*60)) % 60;
  const s = Math.floor(diff / 1000) % 60;
  document.getElementById('timer').textContent =
    `До свадьбы осталось: ${d}д ${h}ч ${m}м ${s}с`;
}
setInterval(updateTimer, 1000);
updateTimer();

// Карта Яндекс
window.onload = function() {
  if (window.ymaps) {
    ymaps.ready(function () {
      var map = new ymaps.Map("map", {
        center: [55.751244, 37.618423], // Пример: центр Москвы
        zoom: 14,
        controls: ['zoomControl']
      });
      var placemark = new ymaps.Placemark([55.751244, 37.618423], {
        balloonContent: 'Ресторан "Летний сад"'
      }, {
        preset: 'islands#icon',
        iconColor: '#7fc8a9'
      });
      map.geoObjects.add(placemark);
    });
  }
};

// Плавный скролл по якорям и смещение для header/padding
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if(target) {
      const yOffset = -20;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  });
});

// Свайпер (галерея)
if (window.Swiper) {
  new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: { delay: 3800, disableOnInteraction: false }
  });
}

// Форма RSVP (оставь как есть или добавь отправку в Telegram)
document.getElementById('rsvpForm').onsubmit = function(e) {
  e.preventDefault();
  document.querySelector('.thanks').classList.remove('hidden');
  setTimeout(() => document.querySelector('.thanks').classList.add('hidden'), 5000);
  this.reset();
};
