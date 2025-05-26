
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-07-19T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdown.textContent = `${days} дн ${hours} ч ${minutes} мин ${seconds} сек`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
