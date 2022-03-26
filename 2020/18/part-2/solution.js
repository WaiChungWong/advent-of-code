const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const evaluate = function (expression) {
    return expression.split(" * ").reduce((acc, v) => acc * v.split(" + ").reduce((acc2, v2) => acc2 + (v2 - 0), 0), 1);
  };

  const findSubExpression = function (expression) {
    let parenthesisCount = 0;
    let maxParenthesisCount = 0;
    let startIndex = -1;
    let endIndex = -1;

    for (let index = 0; index < expression.length; index++) {
      const character = expression.charAt(index);

      if (character === "(") {
        parenthesisCount++;

        if (maxParenthesisCount < parenthesisCount) {
          maxParenthesisCount = parenthesisCount;
          startIndex = index;
          endIndex = -1;
        }
      } else if (character === ")") {
        if (maxParenthesisCount === parenthesisCount && endIndex === -1) {
          endIndex = index;
        }

        parenthesisCount--;
      }
    }

    return [maxParenthesisCount > 0 ? expression.slice(startIndex + 1, endIndex) : "", startIndex, endIndex];
  };

  const solve = function (expression) {
    let [subExpression, startIndex, endIndex] = findSubExpression(expression);

    while (subExpression.length > 0) {
      const value = evaluate(subExpression);

      expression = expression.slice(0, startIndex) + value + expression.slice(endIndex + 1);

      [subExpression, startIndex, endIndex] = findSubExpression(expression);
    }

    return evaluate(expression);
  };

  return data.reduce((acc, v) => acc + solve(v), 0);
}
