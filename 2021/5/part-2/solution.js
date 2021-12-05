const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let pointsDrawn = {};

  for (let index = 0; index < data.length; index++) {
    let [from, to] = data[index].split(" -> ");
    let [y1, x1] = from.split(",");
    let [y2, x2] = to.split(",");

    let yIterator = y1 - y2 > 0 ? -1 : y1 - y2 < 0 ? 1 : 0;
    let xIterator = x1 - x2 > 0 ? -1 : x1 - x2 < 0 ? 1 : 0;

    for (
      let yIndex = y1, xIndex = x1;
      yIndex != y2 - -yIterator || xIndex != x2 - -xIterator;
      yIndex -= -yIterator, xIndex -= -xIterator
    ) {
      pointsDrawn[xIndex] = pointsDrawn[xIndex] || {};
      pointsDrawn[xIndex][yIndex] = (pointsDrawn[xIndex][yIndex] || 0) + 1;
    }
  }

  return Object.values(pointsDrawn).reduce(
    (acc, row) => acc + Object.values(row).filter((point) => point > 1).length,
    0
  );
}
