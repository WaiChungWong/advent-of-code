const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const steps = 10;
  let template = "";
  let rules = new Map();
  let pairCount = new Map();
  let charCount = new Map();
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

      rules.set(pair, [`${char1}${insert}`, `${insert}${char2}`]);
      charCount.set(char1, charCount.get(char1) || new Map());
      charCount.set(char2, charCount.get(char2) || new Map());
      charCount.get(char1).set(pair, pair.split(char1).length - 1);
      charCount.get(char2).set(pair, pair.split(char2).length - 1);
    } else {
      template = line;
    }
  }

  for (let index = 0; index < template.length - 1; index++) {
    const pair = template.slice(index, index + 2);

    pairCount.set(pair, (pairCount.get(pair) || 0) + 1);
  }

  for (let step = 1; step <= steps; step++) {
    let newPairCount = new Map();

    for (const [pair, pCount] of pairCount) {
      const [newPair1, newPair2] = rules.get(pair);

      newPairCount.set(newPair1, (newPairCount.get(newPair1) || 0) + pCount);
      newPairCount.set(newPair2, (newPairCount.get(newPair2) || 0) + pCount);
    }

    pairCount = newPairCount;
  }

  for (const [char, cCount] of charCount) {
    cCount.sum = template.charAt(0) === char || template.charAt(template.length - 1) === char ? 1 : 0;

    for (const [pair, pCount] of pairCount) {
      if (cCount.has(pair)) {
        cCount.sum += cCount.get(pair) * pCount;
      }
    }

    cCount.sum /= 2;
  }

  const countList = Array.from(charCount.values())
    .map(({ sum }) => sum)
    .sort((a, b) => a - b);

  return countList[countList.length - 1] - countList[0];
}
