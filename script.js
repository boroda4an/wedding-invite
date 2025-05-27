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
if (rsvpForm) {
  rsvpForm.onsubmit = function(e) {
    e.preventDefault();
    const data = {
      firstname: rsvpForm.firstname.value.trim(),
      lastname: rsvpForm.lastname.value.trim(),
      email: rsvpForm.email.value.trim(),
      telegram: rsvpForm.telegram.value.trim(),
      whatsapp: rsvpForm.whatsapp.value.trim()
    };
    fetch("https://script.google.com/macros/s/AKfycby1Q04EL41Ew4bWDqtG_ajJ2hc4shlri-vQThV33vcb8LLWrWTox0lhxzTEGmkrzZAs/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    document.querySelector('#rsvp .thanks').classList.remove('hidden');
    setTimeout(() => document.querySelector('#rsvp .thanks').classList.add('hidden'), 5000);
    rsvpForm.reset();
  };
}

// Gallery: zoom on click
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function() {
    const bg = document.createElement('div');
    bg.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeInBg .3s;';
    const big = document.createElement('img');
    big.src = this.src;
    big.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:1.7em;box-shadow:0 4px 54px #f76597bb;animation:zoomInImg .35s;';
    bg.appendChild(big);
    bg.onclick = () => bg.remove();
    document.body.appendChild(bg);
  });
});
