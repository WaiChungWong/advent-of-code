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
  let bitCount = data[0].split("");

  for (let index = 1; index < data.length; index++) {
    let newBitCount = data[index].split("");

    for (let i = 0; i < bitCount.length; i++) {
      bitCount[i] -= -newBitCount[i];
    }
  }

  let gammaBinary = bitCount.map(count => Math.round(count / data.length));
  let epsilonBinary = gammaBinary.map(value => 1 - value);
  let gamma = parseInt(gammaBinary.join(""), 2);
  let epsilon = parseInt(epsilonBinary.join(""), 2);

  return gamma * epsilon;
}
