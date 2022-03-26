const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const adapters = data.sort((a, b) => a - b).map(v => v - 0);
  const jolts = [0, ...adapters, adapters[adapters.length - 1] + 3];
  const existingStates = new Map();

  const findArrangementCount = function (currentIndex = 0) {
    if (existingStates.has(currentIndex)) {
      return existingStates.get(currentIndex);
    } else if (currentIndex === jolts.length - 1) {
      return 1;
    }

    let totalCount = 0;

    for (let index = currentIndex + 1; jolts[index] - jolts[currentIndex] <= 3; index++) {
      totalCount += findArrangementCount(index);
    }

    existingStates.set(currentIndex, totalCount);

    return totalCount;
  };

  return findArrangementCount();
}
