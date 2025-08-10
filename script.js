const game = document.getElementById("game");
const gameStyle = window.getComputedStyle(game);
const heightValues = [150, 300];
let val = 250;
let birdDirection = 1;
let gameStarted = false;

let blockIntervalId = null;

function startGame() {}

const moveBird = setInterval(() => {
  if (!gameStarted) {
    return;
  }
  val = val + birdDirection * 0.5;
  if (val > 450 || val < 0) {
    alert("game over");
    document.querySelectorAll(".block").forEach((ele) => {
      ele.style.animation = "none";
    });
    clearInterval(blockIntervalId);
    gameStarted = false;
    val = 250;
  }
  let bird = document.getElementById("bird").getBoundingClientRect();
  document.querySelectorAll(".block").forEach((ele) => {
    if (birdCollide(ele.getBoundingClientRect(), bird)) {
      alert("game");
      document.querySelectorAll(".block").forEach((ele) => {
        ele.style.animation = "none";
      });
      val = 250;
      clearInterval(blockIntervalId);
      blockIntervalId = null;
      gameStarted = false;
    }
  });
  game.style.setProperty("--drop", `${val}px`);
}, 1);

window.addEventListener("keydown", (e) => {
  if (e.key !== " ") {
    return;
  }
  if (!gameStarted) {
    gameStarted = true;
    document.querySelectorAll(".block1").forEach((ele) => {
      ele.style.animation = "move 4s linear infinite";
    });
    document.querySelectorAll(".block2").forEach((ele) => {
      ele.style.animation = "move 4s linear 2s infinite";
    });
    blockIntervalId = setInterval(() => {
      heightValues.push(Math.floor(Math.random() * 200) + 100);
      game.style.setProperty(
        "--main-upperBlock1-height",
        `${heightValues.pop()}px`
      );
      setTimeout(() => {
        heightValues.push(Math.floor(Math.random() * 200) + 100);
        game.style.setProperty(
          "--main-upperBlock2-height",
          `${heightValues.pop()}px`
        );
      }, 2000);
    }, 4000);
    return;
  }
  birdDirection = -2;
  setTimeout(() => {
    birdDirection = 1;
  }, 100);
});

function birdCollide(block, bird) {
  let ox = block.left - bird.left > -20 && block.left - bird.left < 50;
  let oy =
    block.top > bird.top
      ? bird.top + bird.height > block.top
      : block.top + block.height > bird.top;

  return ox && oy;
}
