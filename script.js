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

// Gallery: zoom on click
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function() {
    const bg = document.createElement('div');
    bg.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.94);z-index:9999;display:flex;align-items:center;justify-content:center;';
    const big = document.createElement('img');
    big.src = this.src;
    big.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:1.7em;box-shadow:0 4px 54px #000a;';
    bg.appendChild(big);
    bg.onclick = () => bg.remove();
    document.body.appendChild(bg);
  });
});

// RSVP form
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
  rsvpForm.onsubmit = function(e) {
    e.preventDefault();
    document.querySelector('#rsvp .thanks').classList.remove('hidden');
    setTimeout(() => document.querySelector('#rsvp .thanks').classList.add('hidden'), 5000);
    this.reset();
  };
}
