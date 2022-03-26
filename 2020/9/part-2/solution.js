const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const preamble = 25;

  data = data.map(v => v - 0);

  const findEntries = function (numbers, entryCount, requiredSum) {
    const [number, ...rest] = numbers;

    if (entryCount === 0 || numbers.length === 0) {
      return;
    } else if (entryCount === 1 && number === requiredSum) {
      return [number];
    }

    const entries = findEntries(rest, entryCount - 1, requiredSum - number);

    if (entries) {
      return [number, ...entries];
    }

    return findEntries(rest, entryCount, requiredSum);
  };

  let invalidNumber;

  for (let index = 0; index < data.length; index++) {
    if (index >= preamble && !findEntries(data.slice(index - preamble, index), 2, data[index])) {
      invalidNumber = data[index];
      break;
    }
  }

  let startIndex = 0;
  let endIndex = 1;

  while (endIndex < data.length) {
    const contiguousSet = data.slice(startIndex, endIndex + 1);
    const contiguousSum = contiguousSet.reduce((acc, v) => acc + v, 0);

    if (contiguousSum < invalidNumber) {
      endIndex++;
    } else if (contiguousSum > invalidNumber) {
      startIndex++;
    } else if (contiguousSum === invalidNumber) {
      return Math.min(...contiguousSet) + Math.max(...contiguousSet);
    }
  }
}
