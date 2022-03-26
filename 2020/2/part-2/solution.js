const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").filter(v => v);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let validCount = 0;

  for (let index = 0; index < data.length; index++) {
    const [policy, password] = data[index].split(": ");
    const [range, character] = policy.split(" ");
    const [position1, position2] = range.split("-");

    if (((password.charAt(position1 - 1) === character) ^ (password.charAt(position2 - 1) === character)) === 1) {
      validCount++;
    }
  }

  return validCount;
}
