const game = document.getElementById("game");
const gameStyle = window.getComputedStyle(game);
const scoreSpan = document.getElementById("scoreSpan");
const co = document.getElementById("co");
const heightValues = [150, 300];
let val = 250;
let birdDirection = 1;
let gameStarted = false;
let blockIntervalId = null;
let moveBirdId = null;
let score = 0;

function flyUp(e) {
  e.preventDefault();
  if (!(e.key == " ")) {
    return;
  }
  if (gameStarted) {
    birdDirection = -2;
    setTimeout(() => {
      birdDirection = 1;
    }, 100);
    return;
  }
  gameStarted = true;
  co.style.display = "none";
  document.querySelectorAll(".block1").forEach((ele) => {
    ele.style.animation = "move 4s linear infinite";
  });
  document.querySelectorAll(".block2").forEach((ele) => {
    ele.style.animation = "move 4s linear 2s infinite";
  });
  blockIntervalId = setInterval(() => {
    score += 1;
    heightValues.push(Math.floor(Math.random() * 200) + 100);
    game.style.setProperty(
      "--main-upperBlock1-height",
      `${heightValues.pop()}px`
    );
    setTimeout(() => {
      heightValues.push(Math.floor(Math.random() * 200) + 100);
      score += 1;
      game.style.setProperty(
        "--main-upperBlock2-height",
        `${heightValues.pop()}px`
      );
    }, 2000);
  }, 4000);
  moveBirdId = setInterval(() => {
    val = val + birdDirection * 0.5;
    if (val > 450 || val < 0) {
      document.querySelectorAll(".block").forEach((ele) => {
        ele.style.animation = "none";
      });
      score = 0;
      clearInterval(blockIntervalId);
      clearInterval(moveBirdId);
      alert("game over");
      gameStarted = false;
      val = 250;
      co.style.display = "block";
    }
    let bird = document.getElementById("bird").getBoundingClientRect();
    document.querySelectorAll(".block").forEach((ele) => {
      if (birdCollide(ele.getBoundingClientRect(), bird)) {
        document.querySelectorAll(".block").forEach((ele) => {
          ele.style.animation = "none";
        });
        val = 250;
        score = 0;
        alert("game");
        clearInterval(blockIntervalId);
        clearInterval(moveBirdId);
        blockIntervalId = null;
        gameStarted = false;
        co.style.display = "block";
      }
    });
    scoreSpan.innerText = score;
    game.style.setProperty("--drop", `${val}px`);
  }, 1);
}
window.addEventListener("keydown", flyUp);

function birdCollide(block, bird) {
  let ox = block.left - bird.left > -20 && block.left - bird.left < 50;
  let oy =
    block.top > bird.top
      ? bird.top + bird.height > block.top
      : block.top + block.height > bird.top;

  return ox && oy;
}
