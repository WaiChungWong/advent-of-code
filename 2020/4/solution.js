const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const isValid = currentFields => requiredFields.filter(field => currentFields.indexOf(field) === -1).length === 0;

  let validCount = 0;
  let currentFields = [];

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line.length === 0) {
      if (isValid(currentFields)) {
        validCount++;
      }

      currentFields = [];
      continue;
    }

    currentFields.push(...line.split(" ").map(pair => pair.split(":")[0]));
  }

  if (isValid(currentFields)) {
    validCount++;
  }

  return validCount;
}
