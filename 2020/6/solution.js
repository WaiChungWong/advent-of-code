const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let totalCount = 0;
  let yesAnswers = new Map();

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line.length === 0) {
      totalCount += yesAnswers.size;
      yesAnswers = new Map();
      continue;
    }

    const answers = data[index].split("");

    for (let i = 0; i < answers.length; i++) {
      yesAnswers.set(answers[i], 0);
    }
  }

  totalCount += yesAnswers.size;

  return totalCount;
}
