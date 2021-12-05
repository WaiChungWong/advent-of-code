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
  const parenthesesPairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };
  const errorScores = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  let totalScore = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const parentheses = [];

    for (let j = 0; j < line.length; j++) {
      const character = line.charAt(j);

      if (character === "(" || character === "[" || character === "{" || character === "<") {
        parentheses.push(character);
      } else if (character === ")" || character === "]" || character === "}" || character === ">") {
        const previous = parentheses.pop();

        if (parenthesesPairs[previous] !== character) {
          totalScore += errorScores[character];
        }
      }
    }
  }

  return totalScore;
}
