const { readFileSync } = require("fs");

try {
  const data = readFileSync("input", "utf8")
    .split(/\r?\n/g)
    .filter(v => v);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let previousMeasure = data[0];
  let increaseCount = 0;

  for (let index = 1; index < data.length; index++) {
    let currentMeasure = data[index];

    if (currentMeasure - previousMeasure > 0) {
      increaseCount++;
    }

    previousMeasure = currentMeasure;
  }

  return increaseCount;
}
