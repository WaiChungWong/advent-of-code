const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").filter(v => v);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const numbers = data.map(v => v - 0);

  const findEntries = function (numbers, entryCount, requiredSum) {
    const [number, ...rest] = numbers;

    if (entryCount === 0 || numbers.length === 0) {
      return 0;
    } else if (entryCount === 1 && number === requiredSum) {
      return number;
    }

    let result = number * findEntries(rest, entryCount - 1, requiredSum - number);

    if (result !== 0) {
      return result;
    }

    return findEntries(rest, entryCount, requiredSum);
  };

  return findEntries(numbers, 2, 2020);
}
