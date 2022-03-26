const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const adapters = data.sort((a, b) => a - b).map(v => v - 0);
  const jolts = [0, ...adapters, adapters[adapters.length - 1] + 3];
  const differences = new Map();

  for (let index = 1; index < jolts.length; index++) {
    const difference = jolts[index] - jolts[index - 1];
    differences.set(difference, (differences.get(difference) || 0) + 1);
  }

  return Array.from(differences.values()).reduce((acc, v) => acc * v, 1);
}
