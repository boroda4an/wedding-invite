
// Анимация лепестков (упрощённая)
document.addEventListener('DOMContentLoaded', () => {
  const petals = [];
  for (let i = 0; i < 30; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = 5 + Math.random() * 5 + 's';
    document.body.appendChild(petal);
    petals.push(petal);
  }
});
