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

// RSVP: динамика показа полей
const contactTypeRadios = document.querySelectorAll('input[name="contactType"]');
function toggleContactFields() {
  document.querySelector('.email-field').style.display = 'none';
  document.querySelector('.tg-field').style.display = 'none';
  document.querySelector('.wa-field').style.display = 'none';
  const val = document.querySelector('input[name="contactType"]:checked').value;
  if(val==='email') document.querySelector('.email-field').style.display = '';
  if(val==='telegram') document.querySelector('.tg-field').style.display = '';
  if(val==='whatsapp') document.querySelector('.wa-field').style.display = '';
}
contactTypeRadios.forEach(r => r.addEventListener('change', toggleContactFields));
toggleContactFields();

// RSVP: отправка формы (пример интеграции с Google Таблиц через Apps Script Web App)
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
  rsvpForm.onsubmit = function(e) {
    e.preventDefault();
    // Собираем данные
    const data = {
      firstname: rsvpForm.firstname.value.trim(),
      lastname: rsvpForm.lastname.value.trim(),
      contactType: rsvpForm.contactType.value,
      email: rsvpForm.email.value.trim(),
      telegram: rsvpForm.telegram.value.trim(),
      whatsapp: rsvpForm.whatsapp.value.trim()
    };
    // Пример отправки в Google Apps Script Web App
    fetch("https://script.google.com/macros/s/AKfycby1Q04EL41Ew4bWDqtG_ajJ2hc4shlri-vQThV33vcb8LLWrWTox0lhxzTEGmkrzZAs/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    document.querySelector('#rsvp .thanks').classList.remove('hidden');
    setTimeout(() => document.querySelector('#rsvp .thanks').classList.add('hidden'), 5000);
    rsvpForm.reset();
    toggleContactFields();
  };
}
