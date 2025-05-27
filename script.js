// Таймер обратного отсчета
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

// Отправка формы через Google Apps Script Web App
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('rsvpForm');
  const thanks = document.getElementById('thanks-message');
  if(form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        message: form.message.value,
        email: form.email.value,
        telegram: form.telegram.value,
        whatsapp: form.whatsapp.value
      };
      fetch('https://script.google.com/macros/s/AKfycbx6cyTjIjoryhvVq-8fGpiGItTbvXQol8oAFYO4ObpTXyeLJFqFFnkfN3dF9GykfIKq/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        form.style.display = "none";
        thanks.style.display = "block";
        setTimeout(()=>thanks.scrollIntoView({behavior:'smooth', block:'center'}),500);
      }).catch(function(){
        alert("Ошибка при отправке. Попробуйте позже.");
      });
    });
  }
});
