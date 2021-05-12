const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// Positon initiale de la balle
let x = canvas.width / 2;
let y = canvas.height - 30;

// Mouvement de la balle
let dx = 0.5;
let dy = -0.5;

//La taille de la balle
let ballRadius = 10;

//La raquette
const paddleHeight = 20;
const paddleWidth = 400;
let paddleX = (canvas.width - paddleWidth) / 2;

//Les Inputs
let rightPressed = false;
let leftPressed = false;

//les briques
const brickRowCount = 1;
const brickColumnCount = 1;
const brickWidth = 840;
const brickHeight = 200;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

//score
let score = 0;

//compteur de vies
let lives = 99;

// creation lignes et colonnes briques
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("Bravo ! La suite s'annonce plus difficile..");
            document.location.href = "index.html";
          }
        }
      }
    }
  }
}

function drawScore() {
  context.font = "20px Arial";
  context.fillStyle = "rgb(66, 151, 160)";
  context.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  context.font = "20px Arial";
  context.fillStyle = "rgb(66, 151, 160)";
  context.fillText("Lives: " + lives, canvas.width - 80, 20);
}

function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#f4eae6";
  context.fill();
  context.closePath();
}

function drawPaddle() {
  context.beginPath();
  context.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  context.fillStyle = "#4297a0";
  context.fill();
  context.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = "#e57f84";
        context.fill();
        context.closePath();
      }
    }
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        // alert("Game Over ?");
        // document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 5;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 5;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();

onload(alert("Bon courage pour ce niveau.."));
