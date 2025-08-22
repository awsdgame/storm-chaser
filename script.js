const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;

let player, debris, lightning, score, gameOver;

function init() {
  player = { x: 220, y: 500, w: 40, h: 40, speed: 5 };
  debris = [];
  lightning = [];
  score = 0;
  gameOver = false;
  document.getElementById("gameOver").style.display = "none";
  requestAnimationFrame(update);
}

function spawnDebris() {
  debris.push({ x: Math.random() * 460, y: -20, w: 20, h: 20, speed: 3 + Math.random() * 3 });
}

function spawnLightning() {
  lightning.push({ x: Math.random() * 480, y: -60, w: 10, h: 60, speed: 6 });
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Debris
  debris.forEach((d, i) => {
    d.y += d.speed;
    ctx.fillStyle = "gray";
    ctx.fillRect(d.x, d.y, d.w, d.h);
    if (checkCollision(player, d)) endGame();
    if (d.y > canvas.height) debris.splice(i, 1);
  });

  // Lightning
  lightning.forEach((l, i) => {
    l.y += l.speed;
    ctx.fillStyle = "yellow";
    ctx.fillRect(l.x, l.y, l.w, l.h);
    if (checkCollision(player, l)) endGame();
    if (l.y > canvas.height) lightning.splice(i, 1);
  });

  // Score
  score++;
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 20, 30);

  if (Math.random() < 0.02) spawnDebris();
  if (Math.random() < 0.01) spawnLightning();

  requestAnimationFrame(update);
}

function checkCollision(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function endGame() {
  gameOver = true;
  document.getElementById("gameOver").style.display = "block";
}

function restartGame() {
  init();
}

window.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
  if (e.key === "ArrowRight" && player.x + player.w < canvas.width) player.x += player.speed;
  if (e.key === "ArrowUp" && player.y > 0) player.y -= player.speed;
  if (e.key === "ArrowDown" && player.y + player.h < canvas.height) player.y += player.speed;
});

init();
