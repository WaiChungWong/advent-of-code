const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let positions = data[0].split(",").sort((a, b) => a - b);

  let position = positions[0];

  let minFuel = 0;

  for (let i = 1; i < positions.length; i++) {
    let step = positions[i] - position;
    minFuel += (step * (step + 1)) / 2;
  }

  for (let i = positions[0]; i < positions[positions.length - 1]; i++) {
    let fuel = 0;

    for (let j = 0; j < positions.length; j++) {
      let step = i > positions[j] ? i - positions[j] : positions[j] - i;
      fuel += (step * (step + 1)) / 2;
    }

    minFuel = minFuel > fuel ? fuel : minFuel;
  }

  return minFuel;
}
