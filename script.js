const countdown = () => {
  const eventDate = new Date("2025-07-19T00:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    `${days}д ${hours}ч ${minutes}м ${seconds}с`;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "Свадьба уже состоялась!";
  }
};

setInterval(countdown, 1000);