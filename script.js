const game = document.getElementById("game");
const gameStyle = window.getComputedStyle(game);
const heightValues = [150, 300];
let val = 250;
let birdDirection = 1;

const moveBird = setInterval(() => {
  val = val + birdDirection * 0.5;
  if (val > 450 || val < 0) {
    clearInterval(moveBird);
    clearInterval(moveBlocks1);
    alert("game over");
    val = 250;
  }
  let bird = document.getElementById("bird").getBoundingClientRect();
  document.querySelectorAll(".block").forEach((ele) => {
    if (birdColide(ele.getBoundingClientRect(), bird)) {
      alert("game");
      clearInterval(moveBird);
      clearInterval(moveBlocks1);
    }
  });
  game.style.setProperty("--drop", `${val}px`);
}, 1);

window.addEventListener("keydown", (e) => {
  if (e.key !== " ") {
    return;
  }
  birdDirection = -2;
  setTimeout(() => {
    birdDirection = 1;
  }, 100);
});

function birdColide(d1, d2) {
  let ox = d1.left - d2.left > -20 && d1.left - d2.left < 50;
  let oy =
    d1.top > d2.top ? d2.top + d2.height > d1.top : d1.top + d1.height > d2.top;

  return ox && oy;
}

const moveBlocks1 = setInterval(() => {
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
