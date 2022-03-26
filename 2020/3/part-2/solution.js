const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").filter(v => v);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  let totalProduct = 1;

  for (let index = 0; index < slopes.length; index++) {
    const { right, down } = slopes[index];

    let treeCount = 0;

    for (let y = down, x = right; y < data.length; y += down, x = (x + right) % data[0].length) {
      if (data[y].charAt(x) === "#") {
        treeCount++;
      }
    }

    totalProduct *= treeCount;
  }

  return totalProduct;
}
