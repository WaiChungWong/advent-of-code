const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let accValue = 0;
  const visitedIndices = [];
  let index = 0;

  while (!visitedIndices[index]) {
    const [operation, argument] = data[index].split(" ");
    visitedIndices[index] = 1;

    if (operation === "acc") {
      accValue += argument - 0;
      index++;
    } else if (operation === "jmp") {
      index += argument - 0;
    } else if (operation === "nop") {
      index++;
    }
  }

  return accValue;
}
