const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let player, gravityDirection, obstacles;

function startGame() {
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block";

    player = { x: canvas.width / 2, y: canvas.height - 50, width: 30, height: 30, speed: 5 };
    gravityDirection = 1; // Gravity starts downward
    obstacles = [{ x: 200, y: 300, width: 100, height: 20 }]; // Example obstacle

    gameLoop();
}

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));
}

function update() {
    player.y += 3 * gravityDirection; // Gravity effect

    if (player.y > canvas.height - player.height || player.y < 0) {
        gravityDirection *= -1; // Flip gravity!
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") player.x -= player.speed;
    if (event.key === "ArrowRight") player.x += player.speed;
});
