const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const [earliestDepartTime, busIdString] = data;
  const busIds = busIdString.split(",");

  let minWaitTime = Infinity;
  let minBusId = Infinity;

  for (let index = 0; index < busIds.length; index++) {
    const busId = busIds[index];

    if (busId !== "x") {
      const waitTime = earliestDepartTime % busId === 0 ? 0 : busId - (earliestDepartTime % busId);
      if (minWaitTime > waitTime) {
        minWaitTime = waitTime;
        minBusId = busId;
      }
    }
  }

  return minBusId * minWaitTime;
}
