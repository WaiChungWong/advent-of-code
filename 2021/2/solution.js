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
  let horizontalPosition = 0;
  let depth = 0;

  for (let index = 0; index < data.length; index++) {
    let [command, unit] = data[index].split(" ");

    switch (command) {
      case "forward":
        horizontalPosition += unit;
        break;
      case "up":
        depth += -unit;
        break;
      case "down":
        depth -= -unit;
        break;
      default:
        break;
    }
  }

  return horizontalPosition * depth;
}
