const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const split = function (numbers) {
    const number = Array.from(numbers.matchAll(/[0-9]{2}/g), ({ 0: value, index }) => ({ value, index })).shift();

    if (number) {
      const { value, index } = number;

      return `${numbers.substring(0, index)}[${Math.floor(value / 2)},${Math.ceil(value / 2)}]${numbers.substring(
        index + value.length
      )}`;
    } else {
      return numbers;
    }
  };

  const explode = function (numbers) {
    const matches = Array.from(numbers.matchAll(/\[[0-9]+,[0-9]+\]/g), ({ 0: pair, index }) => ({
      pair,
      pairIndex: index,
    }));

    for (const { pair, pairIndex } of matches) {
      const prefix = numbers.substring(0, pairIndex);
      const postfix = numbers.substring(pairIndex + pair.length);

      const nestCount = (prefix.match(/\[/g) || []).length - (prefix.match(/\]/g) || []).length;
      const previousNumber = Array.from(prefix.matchAll(/[0-9]+/g), ({ 0: value, index }) => ({ value, index })).pop();
      const nextNumber = Array.from(postfix.matchAll(/[0-9]+/g), ({ 0: value, index }) => ({
        value,
        index: index + pairIndex + pair.length,
      })).shift();

      if (nestCount >= 4) {
        const [left, right] = pair.replace(/\[|\]/g, "").split(",");

        if (nextNumber) {
          numbers = `${numbers.substring(0, nextNumber.index)}${right - -nextNumber.value}${numbers.substring(
            nextNumber.index + nextNumber.value.length
          )}`;
        }

        numbers = `${numbers.substring(0, pairIndex)}0${numbers.substring(pairIndex + pair.length)}`;

        if (previousNumber) {
          numbers = `${numbers.substring(0, previousNumber.index)}${left - -previousNumber.value}${numbers.substring(
            previousNumber.index + previousNumber.value.length
          )}`;
        }

        break;
      }
    }

    return numbers;
  };

  const evaluate = function (numbers) {
    const match = Array.from(numbers.matchAll(/\[[0-9]+,[0-9]+\]/g), ({ 0: value, index }) => ({
      value,
      index,
    })).shift();

    if (match) {
      const { value, index } = match;
      const [left, right] = value.replace(/\[|\]/g, "").split(",");

      numbers = `${numbers.substring(0, index)}${left * 3 + right * 2}${numbers.substring(index + value.length)}`;
    }

    return numbers;
  };

  let numbers = data[0];

  for (let index = 1; index < data.length; index++) {
    const line = data[index];
    numbers = `[${numbers},${line}]`;

    let reducedNumbers = explode(numbers);

    while (reducedNumbers !== numbers) {
      while (reducedNumbers !== numbers) {
        numbers = reducedNumbers;
        reducedNumbers = explode(numbers);
      }

      reducedNumbers = split(numbers);
    }
  }

  let reducedNumbers = evaluate(numbers);

  while (reducedNumbers !== numbers) {
    numbers = reducedNumbers;
    reducedNumbers = evaluate(numbers);
  }

  return numbers;
}
