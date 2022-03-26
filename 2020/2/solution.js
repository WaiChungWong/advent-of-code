const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").filter(v => v);

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
    const [min, max] = range.split("-");
    const occurance = (password.match(new RegExp(character, "g")) || []).length;

    if (occurance >= min - 0 && occurance <= max - 0) {
      validCount++;
    }
  }

  return validCount;
}
