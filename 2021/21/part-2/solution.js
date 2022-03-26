const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const existingStates = new Map();
  let player1Position;
  let player2Position;
  let player1Score = 0;
  let player2Score = 0;

  for (let index = 0; index < data.length; index++) {
    const line = data[index].replace(/\./g, "0").replace(/#/g, "1");

    if (/^Player 1 starting position: [0-9]+$/.test(line)) {
      player1Position = line.replace(/Player 1 starting position: /g, "");
    } else if (/^Player 2 starting position: [0-9]+$/.test(line)) {
      player2Position = line.replace(/Player 2 starting position: /g, "");
    }
  }

  const countWins = function (player1Position, player2Position, player1Score, player2Score) {
    const state = `${player1Position},${player2Position},${player1Score},${player2Score}`;

    if (player1Score >= 21) {
      return [1, 0];
    } else if (player2Score >= 21) {
      return [0, 1];
    } else if (existingStates.has(state)) {
      return existingStates.get(state);
    }

    let player1Wins = 0;
    let player2Wins = 0;

    for (let roll1 = 1; roll1 <= 3; roll1++) {
      for (let roll2 = 1; roll2 <= 3; roll2++) {
        for (let roll3 = 1; roll3 <= 3; roll3++) {
          const newPlayer1Position = ((player1Position - -(roll1 + roll2 + roll3 - 1)) % 10) + 1;
          const newPlayer1Score = player1Score + newPlayer1Position;

          const [newPlayer1Wins, newPlayer2Wins] = countWins(
            player2Position,
            newPlayer1Position,
            player2Score,
            newPlayer1Score
          );
          player1Wins += newPlayer2Wins;
          player2Wins += newPlayer1Wins;
        }
      }
    }

    existingStates.set(state, [player1Wins, player2Wins]);

    return existingStates.get(state);
  };

  return countWins(player1Position, player2Position, player1Score, player2Score);
}
