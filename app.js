win = {
  winX: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0],
  ],
  win0: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0],
  ],
};

let move = 0;

let winner = "";

let line;

field = document.querySelector(".field");
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    field.innerHTML += `<div class="no_busy cell" id="cell_${i}_${j}"></div>`;
  }
}

go = document.querySelector("#go");

const listener = (event) => {
  if (event.target.classList[0] === "no_busy") {
    if (move % 2 === 0) {
      event.target.innerHTML = '<i class="fas fa-times"></i>';
      move++;
      event.target.classList.remove("no_busy");
      let [_, x, y] = event.target.id.split("_");
      addToWin(+x, +y, "winX");
      go.innerHTML = 'Go: <i class="far fa-circle"></i>';
    } else {
      event.target.innerHTML = '<i class="far fa-circle"></i> ';
      move++;
      event.target.classList.remove("no_busy");
      let [_, x, y] = event.target.id.split("_");
      addToWin(+x, +y, "win0");
      go.innerHTML = 'Go: <i class="fas fa-times"></i>';
    }
  }
};

field.addEventListener("click", listener);

const addToWin = (x, y, who) => {
  win[who][0][x]++;
  win[who][1][y]++;
  if (x === y) {
    win[who][2][0]++;
  }
  if ((x === 1 && y === 1) || Math.abs(x - y) === 2) {
    win[who][2][1]++;
  }
  checkWin(who);
};

const checkWin = (who) => {
  let index = -1;
  win[who].forEach((arr, idx) => {
    index = arr.findIndex((elem) => elem === 3);
    if (index !== -1) {
      winner = who === "winX" ? "Выиграли крестики" : "Выиграли нолики";
      field.removeEventListener("click", listener);
      linelWin(idx, index);
      newGame();
    }
  });
  if (move === 8) {
    winner = "Ничья";
    newGame();
  }
};

const linelWin = (x, y) => {
  span = document.querySelector("span");
  let marg = 50;
  if (x === 0) {
    span.classList.add("winH");
    marg += 100 * y;
    span.style.top = `${marg}px`;
  } else if (x === 1) {
    span.classList.add("winV");
    marg += 100 * y;
    span.style.left = `${marg}px`;
  } else if (x === 2 && y === 0) {
    span.classList.add("winDM");
  } else {
    span.classList.add("winDS");
  }
};

const newGame = () => {
  div = document.querySelector(".result");
  div.classList.remove("hidden");
  h2 = document.querySelector(".winner");
  h2.innerHTML = winner;
};

document.querySelector('#btn').addEventListener('click',event=>{
    event.preventDefault()
    location.reload()
})