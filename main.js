// let game = JSON.parse(localStorage.getItem("game"));
let game = ["", "", "", "", "", "", "", "", ""];
let turn = "x";
let scoreX = 0,
  scoreO = 0;

let winnersCells = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

function playGame(id) {
  if (game[id] !== "") return;
  game[id] = turn;
  render(id);
  turn = turn === "x" ? "o" : "x";

  if (calculateWinner() === true) {
    let winner = turn === "x" ? "o" : "x";
    renderResults(winner);
  } else if (calculateWinner() === "draw") {
    let winner = "Draw";
    renderResults(winner);
  }
}
function again() {
  turn = turn;
  for (let i = 0; i < 9; i++) {
    let div = document.querySelector(`#c${i}`);
    div.innerHTML = "";
    div.classList.remove("X");
    div.classList.remove("O");
    game[i] = "";
  }
  let result = document.querySelector(`#result`);
  result.style.display = "none";
}
function render(id = "") {
  if (id !== "") {
    let currentCard = document.querySelector(`#c${id}`);
    currentCard.innerHTML = `${turn}`;
    currentCard.classList.add(`${turn.toUpperCase()}`);
  }
}
function renderResults(winner) {
  let result = document.querySelector("#result");
  result.style.cssText = "display: flex;";
  if (winner === "Draw") {
    result.innerHTML = "Draw";
  } else {
    if (winner === "x") {
      scoreX++;
    } else {
      scoreO++;
    }
    result.innerHTML = `${winner.toUpperCase()} Won`;
  }
  updateInfo();
  result.innerHTML += `<button id="btn" class="btn" onclick='again()'>Restart</button>`;
}
function updateInfo() {
  document.querySelector(".xRes").innerHTML = `X: ${scoreX}`;
  document.querySelector(".oRes").innerHTML = `O: ${scoreO}`;
  document.querySelector(".turn").innerHTML = `Turn: ${turn.toUpperCase()}`;
}

function calculateWinner() {
  let c = 0;
  for (let i = 0; i < winnersCells.length; i++) {
    if (
      game[winnersCells[i][0]] !== "" &&
      game[winnersCells[i][0]] === game[winnersCells[i][1]] &&
      game[winnersCells[i][1]] === game[winnersCells[i][2]]
    ) {
      return true;
    }
  }
  if (game.includes("")) {
    return false;
  }
  return "draw";
}
