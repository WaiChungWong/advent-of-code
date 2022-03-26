const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const [line] = data;
  const cups = line.split("").map(v => v - 0);

  const cupCount = cups.length;

  for (let move = 0; move < 100; move++) {
    const currentCup = cups.shift();
    const removedCups = cups.splice(0, 3);
    let destination = currentCup;

    do {
      destination = ((cupCount + destination - 2) % cupCount) + 1;
    } while (removedCups.includes(destination));

    cups.splice(cups.indexOf(destination) + 1, 0, ...removedCups);

    cups.push(currentCup);
  }

  while (cups[0] !== 1) {
    cups.push(cups.shift());
  }

  return cups.slice(1).join("");
}
