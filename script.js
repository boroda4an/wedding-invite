
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-07-19T16:00:00");

function updateTimer() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdown.innerText = "Свадьба уже началась!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerText = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
}

setInterval(updateTimer, 1000);
updateTimer();
