const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const bagMap = new Map();

  for (let index = 0; index < data.length; index++) {
    const [parent, children] = data[index].split(" contain ").map(bag => bag.replace("bags", "bag"));
    const bags = children.split(", ").map(bag => bag.replace(/\d+ |\./g, "").replace("bags", "bag"));

    for (let i = 0; i < bags.length; i++) {
      const bag = bags[i];

      bagMap.set(bag, bagMap.get(bag) || []);
      bagMap.get(bag).push(parent);
    }
  }

  let countedColors = [];

  const findBagColors = function (bagColor) {
    const childColors = bagMap.get(bagColor) || [];

    for (let index = 0; index < childColors.length; index++) {
      const childColor = childColors[index];

      if (!countedColors.includes(childColor)) {
        countedColors.push(childColors[index]);
        findBagColors(childColors[index]);
      }
    }
  };

  findBagColors("shiny gold bag");

  return countedColors.length;
}
