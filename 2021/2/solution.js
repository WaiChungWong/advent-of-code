const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

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
        horizontalPosition += unit - 0;
        break;
      case "up":
        depth -= unit - 0;
        break;
      case "down":
        depth += unit - 0;
        break;
      default:
        break;
    }
  }

  return horizontalPosition * depth;
}
