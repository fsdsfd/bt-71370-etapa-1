import './SASS/main.scss'
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const retryButton = document.getElementById('retryButton');

const cube = {
    x: 50,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    dy: 0,
    gravity: 1.5,
    jumpStrength: -20,
    isJumping: false,
    rotation: 0
};

const obstacles = [];
const obstacleWidth = 40;
const obstacleHeight = 50;
let frameCount = 0;
let score = 0;
let gameOver = false;
let gameStarted = false;
let startTime;
let obstacleSpeed = 5;
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !cube.isJumping && gameStarted) {
        cube.dy = cube.jumpStrength;
        cube.isJumping = true;
    }
});
canvas.addEventListener('click', function() {
    if (!gameStarted) {
        gameStarted = true;
        startTime = new Date().getTime();
        requestAnimationFrame(updateGame);
    } else {
        jumpCube();
    }
});

function jumpCube() {
    if (!cube.isJumping && gameStarted) {
        cube.dy = cube.jumpStrength;
        cube.isJumping = true;
    }
}

canvas.addEventListener('click', function() {
    if (!gameStarted) {
        gameStarted = true;
        startTime = new Date().getTime();
        requestAnimationFrame(updateGame);
    }
});

retryButton.addEventListener('click', function() {
    score = 0;
    frameCount = 0;
    cube.y = canvas.height - 60;
    cube.dy = 0;
    cube.isJumping = false;
    cube.rotation = 0;
    obstacles.length = 0;
    gameOver = false;
    gameStarted = false;
    retryButton.classList.add('juego__container__boton');
    startTime = new Date().getMilliseconds();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Haz clic para empezar', canvas.width / 2 - 150, canvas.height / 2);
});

function drawCube() {
    ctx.save();
    ctx.translate(cube.x + cube.width / 2, cube.y + cube.height / 2);
    ctx.rotate(cube.rotation * Math.PI / 180);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-cube.width / 2, -cube.height / 2, cube.width, cube.height);
    ctx.restore();
}

function drawTriangle(x, y, width, height) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height);
    ctx.closePath();
    ctx.fill();
}

function detectCollision(cube, obstacle) {
    const cubePoints = [
        { x: cube.x, y: cube.y + cube.height },
        { x: cube.x + cube.width, y: cube.y + cube.height },
        { x: cube.x + cube.width / 2, y: cube.y }
    ];
    const obstaclePoints = [
        { x: obstacle.x, y: obstacle.y + obstacle.height },
        { x: obstacle.x + obstacleWidth / 2, y: obstacle.y },
        { x: obstacle.x + obstacleWidth, y: obstacle.y + obstacle.height }
    ];
    for (let cubePoint of cubePoints) {
        let inside = false;
        for (let i = 0, j = 2; i < 3; j = i++) {
            const xi = obstaclePoints[i].x, yi = obstaclePoints[i].y;
            const xj = obstaclePoints[j].x, yj = obstaclePoints[j].y;

            const intersect = ((yi > cubePoint.y) !== (yj > cubePoint.y)) &&
                (cubePoint.x < (xj - xi) * (cubePoint.y - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;
        }
        if (inside) return true;
    }

    return false;
}

function updateGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frameCount++;
    if (frameCount % 30 === 0) {
        const obstacleX = canvas.width;
        const obstacleY = canvas.height - obstacleHeight;
        obstacles.push({ x: obstacleX, y: obstacleY });
       

    }
    
    cube.dy += cube.gravity;
    cube.y += cube.dy;
    if (cube.y > canvas.height - cube.height) {
        cube.y = canvas.height - cube.height;
        cube.dy = 0;
        cube.isJumping = false;
        cube.rotation = 0;
    } else if (cube.isJumping) {
        cube.rotation += 10;
    }

    drawCube();
    obstacleSpeed += .03;
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= obstacleSpeed;
        drawTriangle(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
        if (obstacle.x + obstacleWidth < 0) {
            obstacles.splice(index, 1);
        }
        if (
            cube.x < obstacle.x + obstacleWidth &&
            cube.x + cube.width > obstacle.x &&
            cube.y < obstacle.y + obstacleHeight &&
            cube.y + cube.height > obstacle.y
        ) {
            gameOver = true;
            ctx.fillText('Perdiste, toca el botón para reintentarlo', canvas.width / 2 - 150, canvas.height / 2);
            retryButton.classList.remove('juego__container__boton');
        }
    });
    const currentTime = new Date().getTime();
    score = Math.floor((currentTime - startTime) / 1000);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Puntos: ' + score, 40, 20);

    if (!gameOver) {
        requestAnimationFrame(updateGame);
    }
}
window.addEventListener("keydown", function(e) {
    if(e.key === " " || e.key === "Spacebar") {
        e.preventDefault();        
        if (!cube.isJumping && gameStarted) {
            cube.dy = cube.jumpStrength;
            cube.isJumping = true;
        }
    }
});
if(score == 1){
    ctx.fillStyle = 'white';
    ctx.fillText('¡Ganaste!');
    obstacleSpeed = 0
}

ctx.fillStyle = 'blue';
ctx.font = '30px Arial';
ctx.fillText('Haz clic para empezar', canvas.width / 2 - 150, canvas.height / 2);

