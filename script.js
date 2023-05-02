"use strict";

const gridContainer = document.querySelector(".grid-container");
(function createGrid() {
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    div.dataset.id = `${i}`;
    gridContainer.appendChild(div);
  }
})();

const gridItemList = document.querySelectorAll(".grid-item");
const btnRestart = document.querySelector(".btn-restart");
const playerTurn = document.querySelector(".player-turn");

gridItemList.forEach((item) => {
  item.onclick = renderChoice;
});
btnRestart.onclick = restart;

const state = (function states() {
  const stateArray = new Array(9).fill(null);
  let currentMove = 0;
  return { stateArray, currentMove };
})();

function renderChoice(event) {
  if (event.target.textContent !== "" || calculateWinner(state.stateArray))
    return;

  let update;
  if (state.currentMove % 2 === 0) {
    update = "X";
  } else {
    update = "O";
  }
  event.target.textContent = update;
  state.stateArray[event.target.dataset.id] = update;
  state.currentMove++;
  calculateWinner(state.stateArray);
  console.log(state.stateArray);
}

function calculateWinner(array) {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const item of winCondition) {
    if (
      array[item[0]] &&
      array[item[0]] === array[item[1]] &&
      array[item[1]] === array[item[2]]
    ) {
      playerTurn.textContent = `Winner: ${array[item[0]]}`;
      return true;
    }
  }
  if (+state.currentMove === 9) {
    playerTurn.textContent = "Draw";
    return;
  }
  playerTurn.textContent = `Turn ${state.currentMove + 1}: ${
    state.currentMove % 2 === 0 ? "X" : "O"
  }`;
}

function restart() {
  gridItemList.forEach((item) => (item.textContent = ""));
  state.stateArray = new Array(9).fill(null);
  state.currentMove = 0;
  playerTurn.textContent = "Turn 1: X";
}
