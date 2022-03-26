const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const [_xRange, yRange] = data[0].replace(/target area: |x=|y=/g, "").split(", ");
  const [minY, _maxY] = yRange.split("..");

  const n = -minY - 1;

  return (n * (n + 1)) / 2;
}
