const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const delimiterIndex = data.indexOf("");
  const firstPart = data.slice(0, delimiterIndex);
  const secondPart = data.slice(delimiterIndex + 1);

  const rules = [];

  for (let index = 0; index < firstPart.length; index++) {
    const [ruleIndex, options] = firstPart[index].split(": ");
    rules[ruleIndex] = options
      .split(" | ")
      .map(r => r.split(" ").map(v => (/"[a-z]{1}"/.test(v) ? v.replace(/"/g, "") : parseInt(v, 10))));
  }

  rules[8] = [[42], [42, 8]];
  rules[11] = [
    [42, 31],
    [42, 11, 31],
  ];

  const matchesRule = function (ruleIndex, message) {
    const rule = rules[ruleIndex];
    const remains = [];

    for (let i = 0; i < rule.length; i++) {
      const subRules = rule[i];
      let subRemains = [message];

      for (let j = 0; j < subRules.length; j++) {
        const subRule = subRules[j];

        if (/[a-z]{1}/.test(subRule)) {
          subRemains = subRemains.filter(m => m.charAt(0) === subRule).map(m => m.slice(1));
        } else {
          subRemains = subRemains.map(m => matchesRule(subRule, m)).flat();
        }
      }

      remains.push(...subRemains);
    }

    return remains;
  };

  return secondPart.filter(message => matchesRule(0, message).filter(m => m === "").length > 0).length;
}
