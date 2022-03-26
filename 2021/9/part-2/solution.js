const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let basins = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const point = data[i][j];
      const pointTop = i - 1 >= 0 ? data[i - 1][j] : 9;
      const pointLeft = j - 1 >= 0 ? data[i][j - 1] : 9;
      const pointBottom = i + 1 < data.length ? data[i + 1][j] : 9;
      const pointRight = j + 1 < data[i].length ? data[i][j + 1] : 9;

      if (point - pointTop < 0 && point - pointLeft < 0 && point - pointBottom < 0 && point - pointRight < 0) {
        const basinPoints = [{ x: i, y: j }];
        const markedBasinPoints = [];

        while (basinPoints.length > 0) {
          const { x, y } = basinPoints.shift();
          markedBasinPoints.push({ x, y });
          if (
            x - 1 >= 0 &&
            data[x - 1][y] < 9 &&
            !markedBasinPoints.find(({ x: mx, y: my }) => mx - x + 1 === 0 && my - y === 0) &&
            !basinPoints.find(({ x: mx, y: my }) => mx - x + 1 === 0 && my - y === 0)
          ) {
            basinPoints.push({ x: x - 1, y });
          }
          if (
            y - 1 >= 0 &&
            data[x][y - 1] < 9 &&
            !markedBasinPoints.find(({ x: mx, y: my }) => mx - x === 0 && my - y + 1 === 0) &&
            !basinPoints.find(({ x: mx, y: my }) => mx - x === 0 && my - y + 1 === 0)
          ) {
            basinPoints.push({ x, y: y - 1 });
          }
          if (
            x + 1 < data.length &&
            data[x + 1][y] < 9 &&
            !markedBasinPoints.find(({ x: mx, y: my }) => mx - x - 1 === 0 && my - y === 0) &&
            !basinPoints.find(({ x: mx, y: my }) => mx - x - 1 === 0 && my - y === 0)
          ) {
            basinPoints.push({ x: x + 1, y });
          }
          if (
            y + 1 < data[x].length &&
            data[x][y + 1] < 9 &&
            !markedBasinPoints.find(({ x: mx, y: my }) => mx - x === 0 && my - y - 1 === 0) &&
            !basinPoints.find(({ x: mx, y: my }) => mx - x === 0 && my - y - 1 === 0)
          ) {
            basinPoints.push({ x, y: y + 1 });
          }
        }

        basins.push(markedBasinPoints.length);
      }
    }
  }

  return basins
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, v) => acc * v, 1);
}
