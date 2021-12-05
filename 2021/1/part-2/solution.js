const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let window = data.slice(0, 3);
  let previousMeasure = window.reduce((acc, a) => acc - -a, 0);
  let increaseCount = 0;

  for (let index = 3; index < data.length; index++) {
    window.push(data[index]);
    window.shift();

    let currentMeasure = window.reduce((acc, a) => acc - -a, 0);

    if (currentMeasure - previousMeasure > 0) {
      increaseCount++;
    }

    previousMeasure = currentMeasure;
  }

  return increaseCount;
}
