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
  let appearances = 0;

  for (let i = 0; i < data.length; i++) {
    const [patterns, outputs] = data[i].split(" | ");
    const outputList = outputs.split(" ");

    appearances += outputList.filter(
      output => output.length === 2 || output.length === 3 || output.length === 4 || output.length === 7
    ).length;
  }

  return appearances;
}
