const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player, gravityDirection, obstacles, boss, bossLives, infinitySymbol, bombs;

function startGame() {
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block";

    player = { x: canvas.width / 2, y: canvas.height - 50, width: 30, height: 30, speed: 5 };
    gravityDirection = 1;
    obstacles = [{ x: 200, y: 300, width: 100, height: 20 }];
    boss = { x: canvas.width / 2 - 50, y: 100, width: 80, height: 80 };
    bossLives = 10;
    infinitySymbol = { x: canvas.width - 80, y: canvas.height - 80, width: 50, height: 50 };
    bombs = [];

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

function drawBoss() {
    if (bossLives > 0) {
        ctx.fillStyle = "black";
        ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText("ENTITY 303", boss.x + 10, boss.y - 10);
    }
}

function drawBombs() {
    ctx.fillStyle = "orange";
    bombs.forEach(bomb => ctx.fillRect(bomb.x, bomb.y, 15, 15));
}

function drawInfinitySymbol() {
    if (bossLives <= 0) {
        ctx.fillStyle = "gold";
        ctx.fillRect(infinitySymbol.x, infinitySymbol.y, infinitySymbol.width, infinitySymbol.height);
    }
}

function update() {
    player.y += 3 * gravityDirection;

    if (player.y > canvas.height - player.height || player.y < 0) {
        gravityDirection *= -1;
    }

    bombs.forEach(bomb => {
        bomb.y -= 5;
        if (bomb.y < boss.y + boss.height && bomb.y > boss.y && bomb.x > boss.x && bomb.x < boss.x + boss.width) {
            bossLives--;
            bomb.hit = true;
        }
    });

    bombs = bombs.filter(bomb => !bomb.hit);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    drawBoss();
    drawBombs();
    drawInfinitySymbol();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") player.x -= player.speed;
    if (event.key === "ArrowRight") player.x += player.speed;
    if (event.key === "Space") bombs.push({ x: player.x + 10, y: player.y, hit: false });
});

canvas.addEventListener("click", (event) => {
    if (bossLives <= 0 && event.clientX > infinitySymbol.x && event.clientX < infinitySymbol.x + infinitySymbol.width &&
        event.clientY > infinitySymbol.y && event.clientY < infinitySymbol.y + infinitySymbol.height) {
        alert("YOU WIN! Gravity is restored!");
        location.reload();
    }
});

