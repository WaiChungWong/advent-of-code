const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const steps = 40;
  let template = "";
  let rules = {};
  let pairCount = {};
  let charCount = {};
  let insertionSection = false;

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line === "") {
      insertionSection = true;
      continue;
    }

    if (insertionSection) {
      const [pair, insert] = line.split(" -> ");
      const [char1, char2] = pair.split("");

      rules[pair] = [`${char1}${insert}`, `${insert}${char2}`];
      charCount[char1] = charCount[char1] || {};
      charCount[char2] = charCount[char2] || {};
      charCount[char1][pair] = pair.split(char1).length - 1;
      charCount[char2][pair] = pair.split(char2).length - 1;
    } else {
      template = line;
    }
  }

  for (let index = 0; index < template.length - 1; index++) {
    pairCount[template.slice(index, index + 2)] = (pairCount[template.slice(index, index + 2)] || 0) + 1;
  }

  for (let step = 1; step <= steps; step++) {
    let newPairCount = {};

    for (const pair in pairCount) {
      const [newPair1, newPair2] = rules[pair];
      newPairCount[newPair1] = (newPairCount[newPair1] || 0) + pairCount[pair];
      newPairCount[newPair2] = (newPairCount[newPair2] || 0) + pairCount[pair];
    }

    pairCount = newPairCount;
  }

  for (const char in charCount) {
    charCount[char].sum = template.charAt(0) === char || template.charAt(template.length - 1) === char ? 1 : 0;

    for (const pair in pairCount) {
      if (charCount[char][pair]) {
        charCount[char].sum += charCount[char][pair] * pairCount[pair];
      }
    }

    charCount[char].sum /= 2;
  }

  const countList = Object.values(charCount)
    .map(({ sum }) => sum)
    .sort((a, b) => a - b);

  return countList[countList.length - 1] - countList[0];
}
