const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const preamble = 25;

  const findEntries = function (numbers, entryCount, requiredSum) {
    const [number, ...rest] = numbers;

    if (entryCount === 0 || numbers.length === 0) {
      return 0;
    } else if (entryCount === 1 && number - 0 === requiredSum) {
      return number;
    }

    let result = number * findEntries(rest, entryCount - 1, requiredSum - number);

    if (result !== 0) {
      return result;
    }

    return findEntries(rest, entryCount, requiredSum);
  };

  for (let index = 0; index < data.length; index++) {
    if (index >= preamble && findEntries(data.slice(index - preamble, index), 2, data[index]) === 0) {
      return data[index];
    }
  }
}
