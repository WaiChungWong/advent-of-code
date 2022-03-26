const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let treeCount = 0;

  for (let y = 1, x = 3; y < data.length; y++, x = (x + 3) % data[0].length) {
    if (data[y].charAt(x) === "#") {
      treeCount++;
    }
  }

  return treeCount;
}
