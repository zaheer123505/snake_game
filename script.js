// Game constants & variables
let inputDir = { x: 0, y: 0 };

let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Game Functions..//
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If we eat our self
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // Bumping the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  // part-1 updating the snake array
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    alert("Game Over");
    snakeArr = [{ x: 13, y: 15 }];

    score = 0;
  }
  // Generating random food ..//
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
 
    score += 1;
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
      highscorebox.innerHTML = "highscore : " + highscoreval;
    }
    scorebox.innerHTML = "Score : " + score;
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }; // Generating random food./
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    // added a body part when the snake had it's food.. //
  }
  // Movind the Snake..//
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    // const element = snakeArr[i];
    snakeArr[i + 1] = { ...snakeArr[i] }; // we have created an object which only contains snakearr[i].. //
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part-2 : display the snake and food
  // Displaying the Snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    // here e ==  element.//
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Displaying the Food.. //
  snakeArr.forEach((e, index) => {
    // here e ==  element.//
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  });
}

// main logic starts from here

let highscore = localStorage.getItem("high_score");
if (highscore === null) {
  highscoreval = 0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  highscorebox.innerHTML = "highscore : " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start of the game..//
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
