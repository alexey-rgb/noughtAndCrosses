const message = document.querySelector(".message"),
  ceils = document.querySelectorAll(".ceil"),
  reset = document.querySelector(".button"),
  movesX = [],
  movesO = [],
  winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [4, 5, 6],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [7, 8, 9],
  ];

let player = "X",
  winner,
  count = 0;

let getWinner = (moveNumber, i, curCeil) => {
  if (
    winCombinations[i].includes(moveNumber) &&
    (movesX.length == 3 || movesO.length == 3)
  ) {
    for (
      let j = 0, curWinComb = winCombinations[i];
      j < curWinComb.length;
      j++
    ) {
      if (!curWinComb.includes(movesX[j])) {
        count = 0;
        break;
      } else {
        count++;
      }
    }
    if (count == 3) winner = "X";
  }
  if (winCombinations[i].includes(moveNumber) && movesO.length == 3) {
    for (
      let j = 0, curWinComb = winCombinations[i];
      j < curWinComb.length;
      j++
    ) {
      if (!curWinComb.includes(movesO[j])) {
        count = 0;
        break;
      } else {
        count++;
      }
    }
    if (count == 3) winner = "O";
  }

  if (count == 3) {
    message.textContent = `Победил игрок ${winner}`;
  }
};

const compareArs = (moveNumber, curCeil) => {
  moveNumber = moveNumber + 1;
  for (let i = 0; i < winCombinations.length; i++) {
    getWinner(moveNumber, i, curCeil);
  }
};

function wrapperFunction(curCeil, numCeil) {
  return function fillCeil() {
    if (curCeil.textContent) return;
    curCeil.textContent = player;
    if (player === "X") {
      player = "0";
      movesX.push(numCeil + 1);
    } else {
      player = "X";
      movesO.push(numCeil + 1);
    }
    message.textContent = `Ходит игрок ${player}`;
    compareArs(numCeil, curCeil);
  };
}

ceils.forEach((ceil, i) => {
  ceil.addEventListener("click", wrapperFunction(ceil, i));
  ceil.setAttribute("ceil-number", i + 1);
});

reset.addEventListener("click", function () {
  ceils.forEach((ceil) => (ceil.textContent = ""));
  message.textContent = `Ходит игрок ${player}`;
});
