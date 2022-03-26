const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const bagMap = new Map();

  for (let index = 0; index < data.length; index++) {
    const [parent, childrenString] = data[index].split(" contain ").map(bag => bag.replace("bags", "bag"));
    const bags = childrenString.split(", ").map(bag => bag.replace(/\./g, "").replace("bags", "bag"));
    const children = [];

    for (let i = 0; i < bags.length; i++) {
      if (bags[i] !== "no other bag") {
        const [count, ...bag] = bags[i].split(" ");
        children.push({ count: count - 0, bag: bag.join(" ") });
      }
    }

    bagMap.set(parent, { children });
  }

  const countBags = function (bagColor) {
    let { children, totalCount } = bagMap.get(bagColor);

    if (!totalCount) {
      totalCount = 0;

      for (let index = 0; index < children.length; index++) {
        const { count, bag } = children[index];

        totalCount += count + count * countBags(bag);
      }

      bagMap.get(bagColor).totalCount = totalCount;
    }

    return totalCount;
  };

  return countBags("shiny gold bag");
}
