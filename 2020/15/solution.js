const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const previousTurns = new Map();

  const numbers = data[0].split(",").map(v => v - 0);

  let number;
  let previousNumber;

  for (let turn = 1; turn <= 2020; turn++) {
    const previousTurn = turn - 1;

    if (previousTurn < numbers.length) {
      number = numbers[previousTurn];
    } else if (previousTurns.get(previousNumber)) {
      number = previousTurn - previousTurns.get(previousNumber);
    } else {
      number = 0;
    }

    if (previousNumber !== undefined) {
      previousTurns.set(previousNumber, previousTurn);
    }

    previousNumber = number;
  }

  return number;
}
