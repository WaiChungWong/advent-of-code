const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let player1Position, player2Position;
  let player1Score = 0;
  let player2Score = 0;
  let dieRoll = 6;
  let rollCount = 0;
  let player1Turn = true;

  for (let index = 0; index < data.length; index++) {
    const line = data[index].replace(/\./g, "0").replace(/#/g, "1");

    if (/^Player 1 starting position: [0-9]+$/.test(line)) {
      player1Position = line.replace(/Player 1 starting position: /g, "");
    } else if (/^Player 2 starting position: [0-9]+$/.test(line)) {
      player2Position = line.replace(/Player 2 starting position: /g, "");
    }
  }

  while (player1Score < 1000 && player2Score < 1000) {
    if (player1Turn) {
      player1Position = ((player1Position - -(dieRoll - 1)) % 10) + 1;
      player1Score += player1Position;
    } else {
      player2Position = ((player2Position - -(dieRoll - 1)) % 10) + 1;
      player2Score += player2Position;
    }

    dieRoll += 9;
    rollCount += 3;
    player1Turn = !player1Turn;
  }

  return Math.min(player1Score, player2Score) * rollCount;
}
