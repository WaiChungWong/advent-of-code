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
  let riskSum = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const point = data[i][j];
      const pointTop = i - 1 >= 0 ? data[i - 1][j] : 9;
      const pointLeft = j - 1 >= 0 ? data[i][j - 1] : 9;
      const pointBottom = i + 1 < data.length ? data[i + 1][j] : 9;
      const pointRight = j + 1 < data[i].length ? data[i][j + 1] : 9;

      if (point - pointTop < 0 && point - pointLeft < 0 && point - pointBottom < 0 && point - pointRight < 0) {
        riskSum -= -point - 1;
      }
    }
  }

  return riskSum;
}
