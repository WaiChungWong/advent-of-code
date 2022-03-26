const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const [_, busIdString] = data;
  const busIds = busIdString.split(",");

  let earliestTime = 0;
  let stepSize = 1;

  for (let index = 0; index < busIds.length; index++) {
    const busId = busIds[index];

    if (busId !== "x") {
      while ((earliestTime + index) % busId !== 0) {
        earliestTime += stepSize;
      }

      stepSize = stepSize * (busId - 0);
    }
  }

  return earliestTime;
}
