const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const parentheses = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };
  const autoScores = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  const totalScores = [];

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const brackets = [];
    let totalScore = 0;
    let corrupted = false;

    for (let j = 0; j < line.length; j++) {
      const character = line.charAt(j);

      if (character === "(" || character === "[" || character === "{" || character === "<") {
        brackets.push(character);
      } else if (character === ")" || character === "]" || character === "}" || character === ">") {
        const previous = brackets.pop();

        if (parentheses[previous] !== character) {
          corrupted = true;
          break;
        }
      }
    }

    if (!corrupted) {
      for (let x = brackets.length - 1; x >= 0; x--) {
        totalScore = totalScore * 5 + autoScores[parentheses[brackets[x]]];
      }
      totalScores.push(totalScore);
    }
  }

  return totalScores.sort((a, b) => a - b)[Math.floor(totalScores.length / 2)];
}
