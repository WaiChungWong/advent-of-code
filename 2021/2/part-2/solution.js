const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let horizontalPosition = 0;
  let aim = 0;
  let depth = 0;

  for (let index = 0; index < data.length; index++) {
    let [command, unit] = data[index].split(" ");

    switch (command) {
      case "forward":
        horizontalPosition += unit;
        depth -= aim * -unit;
        break;
      case "up":
        aim += -unit;
        break;
      case "down":
        aim -= -unit;
        break;
      default:
        break;
    }
  }

  return horizontalPosition * depth;
}
