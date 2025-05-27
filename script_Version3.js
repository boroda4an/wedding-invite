// Анимация появления секций при прокрутке
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.25 });
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

// Форма RSVP
document.getElementById('rsvpForm').onsubmit = function(e) {
  e.preventDefault();
  document.querySelector('.thanks').classList.remove('hidden');
  // Здесь можно добавить отправку на почту/Google Forms/Airtable/Telegram-бота
  setTimeout(() => document.querySelector('.thanks').classList.add('hidden'), 5000);
};