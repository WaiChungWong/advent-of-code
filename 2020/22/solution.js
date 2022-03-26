const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const player1 = [];
  const player2 = [];

  for (let index = 0, currentPlayer = []; index < data.length; index++) {
    const line = data[index];

    if (/^Player 1:$/.test(line)) {
      currentPlayer = player1;
    } else if (/^Player 2:$/.test(line)) {
      currentPlayer = player2;
    } else if (line.length > 0) {
      currentPlayer.push(line - 0);
    }
  }

  while (player1.length > 0 && player2.length > 0) {
    const player1Card = player1.shift();
    const player2Card = player2.shift();

    if (player1Card > player2Card) {
      player1.push(player1Card, player2Card);
    } else {
      player2.push(player2Card, player1Card);
    }
  }

  const winner = player1.length > 0 ? player1 : player2;

  return winner.reduce((acc, v, i) => acc + v * (winner.length - i), 0);
}
