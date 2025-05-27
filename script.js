// Countdown Timer
function updateTimer() {
  // Исправлено: начало свадьбы теперь в 14:00 по Москве (UTC+3)
  const weddingDate = new Date('2025-07-19T14:00:00+03:00');
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
    `До свадьбы: ${d} дн. ${h} ч. ${m} мин. ${s} сек.`;
}
setInterval(updateTimer, 1000);
updateTimer();

// Плавное появление секций при скролле
function fadeInOnScroll() {
  document.querySelectorAll('.fadein, .glass').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50) el.classList.add('visible');
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// ==== RSVP: отправка формы (Google Таблица через Apps Script) ====
const rsvpForm = document.getElementById('rsvpForm');
const thanksBlock = document.getElementById('thanks-message');

// Модальное окно календаря
const calendarModal = document.getElementById('calendar-modal');
const calendarYes = document.getElementById('calendar-yes');
const calendarNo = document.getElementById('calendar-no');

// Функция для генерации и скачивания .ics-файла
function downloadICS() {
  // Исправлено: начало в 14:00 MSK (11:00 UTC)
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//wedding-invite//boroda4an//RU',
    'BEGIN:VEVENT',
    'DTSTART:20250719T110000Z', // 14:00 MSK = 11:00 UTC
    'DTEND:20250719T190000Z',   // 22:00 MSK = 19:00 UTC
    'SUMMARY:Свадьба Романа и Виктории',
    'DESCRIPTION:Торжество: КолиZей Холл, Москва, Проспект Мира, 109А\\nПодробности на сайте!',
    'LOCATION:КолиZей Холл, Москва, Проспект Мира, 109А',
    'URL:https://boroda4an.github.io/wedding-invite/',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([icsContent], {type: 'text/calendar'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Wedding_Roman_Viktoria.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

if (rsvpForm && thanksBlock) {
  rsvpForm.onsubmit = function(e) {
    e.preventDefault();
    const data = {
      firstname: rsvpForm.firstname.value.trim(),
      lastname: rsvpForm.lastname.value.trim(),
      message: rsvpForm.message.value.trim(),
      email: rsvpForm.email.value.trim(),
      telegram: rsvpForm.telegram.value.trim(),
      whatsapp: rsvpForm.whatsapp.value.trim()
    };
    fetch("https://script.google.com/macros/s/AKfycbzSZ2gojbYhLa_OfrfgqdL7InKyrCu1ssGu5KC_Xyd4RmlzbsSCqUnF7_aQsBV6MguT/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    // Анимация появления блока "Спасибо"
    thanksBlock.classList.add('visible');
    setTimeout(() => {
      thanksBlock.classList.remove('visible');
      // После исчезновения "Спасибо" показываем календарное окно
      if (calendarModal) calendarModal.classList.add('visible');
    }, 4000);
    rsvpForm.reset();
  };
}

// Обработка модального окна календаря
if (calendarYes && calendarNo && calendarModal) {
  calendarYes.onclick = function() {
    downloadICS();
    calendarModal.classList.remove('visible');
  };
  calendarNo.onclick = function() {
    calendarModal.classList.remove('visible');
  };
}
