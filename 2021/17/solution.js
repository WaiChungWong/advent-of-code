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
  const [_, yRange] = data[0].replace(/target area: |x=|y=/g, "").split(", ");
  const [minY, _] = yRange.split("..");

  const n = -minY - 1;

  return (n * (n + 1)) / 2;
}
