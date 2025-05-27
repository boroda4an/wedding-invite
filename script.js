function updateTimer() {
  const eventDate = new Date("2025-07-19T14:00:00+03:00");
  const now = new Date();
  const diff = eventDate - now;
  let html;
  if (diff <= 0) {
    html = "<div class='count-el'><span class='count-num'>0</span><span class='count-label'>дней</span></div>";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    html = `
      <div class="count-el"><span class="count-num">${days}</span><span class="count-label">дней</span></div>
      <div class="count-el"><span class="count-num">${hours.toString().padStart(2, '0')}</span><span class="count-label">ч</span></div>
      <div class="count-el"><span class="count-num">${minutes.toString().padStart(2, '0')}</span><span class="count-label">м</span></div>
      <div class="count-el"><span class="count-num">${seconds.toString().padStart(2, '0')}</span><span class="count-label">с</span></div>
    `;
  }
  document.getElementById('timer').innerHTML = html;
}
setInterval(updateTimer, 1000);
updateTimer();

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('rsvpForm');
  const thanks = document.getElementById('thanks-message');
  if(form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      form.style.display = "none";
      thanks.classList.add('visible');
      setTimeout(()=>thanks.scrollIntoView({behavior:'smooth', block:'center'}),500);
    });
  }

  // Календарь-попап (пример)
  const calendarModal = document.getElementById('calendar-modal');
  const calendarYes = document.getElementById('calendar-yes');
  const calendarNo = document.getElementById('calendar-no');
  if(calendarYes && calendarNo){
    calendarYes.onclick = function(){
      window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Свадьба+Романа+и+Виктории&dates=20250719T140000/20250719T230000&details=Ждём+вас+на+свадьбе!&location=Москва,+Проспект+Мира,+109А', '_blank');
      calendarModal.classList.add('hidden');
    };
    calendarNo.onclick = function(){calendarModal.classList.add('hidden');};
  }
});
