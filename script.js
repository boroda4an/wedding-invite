// Countdown Timer
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

// RSVP: отправка формы (Google Таблица через Apps Script)
const rsvpForm = document.getElementById('rsvpForm');
const thanksBlock = document.getElementById('thanks-message');
if (rsvpForm && thanksBlock) {
  rsvpForm.onsubmit = function(e) {
    e.preventDefault();
    const data = {
      firstname: rsvpForm.firstname.value.trim(),
      lastname: rsvpForm.lastname.value.trim(),
      message: rsvpForm.elements.message.value.trim(),
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
    setTimeout(() => thanksBlock.classList.remove('visible'), 4000);
    rsvpForm.reset();
  };
} 
