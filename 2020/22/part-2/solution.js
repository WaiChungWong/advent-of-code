const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

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
      currentPlayer.push(line);
    }
  }

  const existingStates = new Map();

  const playGame = function (player1String, player2String) {
    const state = `${player1String}-${player2String}`;
    const invertedState = `${player2String}-${player1String}`;

    if (existingStates.has(state)) {
      return existingStates.get(state);
    }

    let player1 = player1String.split(",");
    let player2 = player2String.split(",");

    const existingGameStates = new Map();

    while (player1.length > 0 && player2.length > 0) {
      const gameState = `${player1.join(",")}-${player2.join(",")}`;
      if (existingGameStates.has(gameState)) {
        player2 = [];
        break;
      }

      existingGameStates.set(gameState, true);

      const player1Card = player1.shift() - 0;
      const player2Card = player2.shift() - 0;

      let player1Wins = player1Card > player2Card;

      if (player1.length >= player1Card && player2.length >= player2Card) {
        const [subPlayer1] = playGame(player1.slice(0, player1Card).join(","), player2.slice(0, player2Card).join(","));

        player1Wins = subPlayer1.length > 0;
      }

      if (player1Wins) {
        player1.push(player1Card, player2Card);
      } else {
        player2.push(player2Card, player1Card);
      }
    }

    existingStates.set(state, [player1.join(","), player2.join(",")]);
    existingStates.set(invertedState, [player2.join(","), player1.join(",")]);

    return existingStates.get(state);
  };

  const [player1String, player2String] = playGame(player1.join(","), player2.join(","));

  const winner = player1String.length > 0 ? player1String.split(",") : player2String.split(",");

  return winner.reduce((acc, v, i) => acc + (v - 0) * (winner.length - i), 0);
}
