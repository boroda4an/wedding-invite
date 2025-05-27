// Preloader
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('preloader').style.opacity = 0;
    setTimeout(() => document.getElementById('preloader').remove(), 700);
  }, 900);
});

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
    `До свадьбы осталось: ${d} дн. ${h} ч. ${m} мин. ${s} сек.`;
}
setInterval(updateTimer, 1000);
updateTimer();

// Fade-in on scroll (for fallback and mobile)
function fadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Locomotive-scroll for smooth + parallax
let scroll;
if(window.innerWidth > 650) {
  scroll = new LocomotiveScroll({
    el: document.body,
    smooth: true,
    lerp: 0.09,
    getSpeed: true
  });
  scroll.on('scroll', fadeInOnScroll);
}

// GLightbox for gallery
const lightbox = GLightbox({selector: '.glightbox', touchNavigation: true});

// Smooth scroll for anchor links (with offset for sticky nav, if any)
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    let id = this.getAttribute('href').replace('#', '');
    let target = document.getElementById(id);
    if(target) {
      let y = target.getBoundingClientRect().top + window.pageYOffset - 30;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  });
});

// RSVP form (example: just show thank you)
document.getElementById('rsvpForm').onsubmit = function(e) {
  e.preventDefault();
  document.querySelector('.thanks').classList.remove('hidden');
  setTimeout(() => document.querySelector('.thanks').classList.add('hidden'), 5000);
  this.reset();
};
