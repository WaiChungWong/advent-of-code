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
  let positions = data[0].split(",").sort((a, b) => a - b);

  let fuel = 0;
  let position = positions[0];

  for (let i = 1; i < positions.length; i++) {
    fuel += positions[i] - position;
  }

  let minFuel = fuel;

  for (let i = 1; i < positions.length; i++) {
    let step = positions[i] - position;
    fuel -= step * (positions.length - i);
    fuel += step * i;

    minFuel = minFuel > fuel ? fuel : minFuel;

    position = positions[i];
  }

  return minFuel;
}
