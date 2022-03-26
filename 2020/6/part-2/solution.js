const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let totalCount = 0;
  let groupCount = 0;
  let yesAnswers = new Map();

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line.length === 0) {
      totalCount += Array.from(yesAnswers.values()).filter(v => v === groupCount).length;
      yesAnswers = new Map();
      groupCount = 0;
      continue;
    }

    const answers = data[index].split("");

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];

      yesAnswers.set(answer, (yesAnswers.get(answer) || 0) + 1);
    }

    groupCount++;
  }

  totalCount += Array.from(yesAnswers.values()).filter(v => v === groupCount).length;

  return totalCount;
}
