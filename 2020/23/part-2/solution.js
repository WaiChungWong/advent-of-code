const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const cupsLookup = new Map();

  class Cup {
    constructor(label) {
      this.label = label;
      this.next = null;
      this.prev = null;
    }
  }

  const [line] = data;
  const labels = line.split("").map(v => v - 0);

  let currentCup = null;
  let previousCup = null;

  for (let index = 0; index < 1000000; index++) {
    let label = index < labels.length ? labels[index] : index + 1;
    currentCup = new Cup(label);

    if (previousCup) {
      previousCup.next = currentCup;
      currentCup.prev = previousCup;
    }

    cupsLookup.set(label, currentCup);

    previousCup = currentCup;
  }

  const firstCup = cupsLookup.get(labels[0]);

  previousCup.next = firstCup;
  firstCup.prev = previousCup;

  currentCup = firstCup;

  const cupCount = cupsLookup.size;

  for (let i = 0; i < 10000000; i++) {
    const pickedCup1 = currentCup.next;
    const pickedCup2 = currentCup.next.next;
    const pickedCup3 = currentCup.next.next.next;
    const pickedLabels = [pickedCup1.label, pickedCup2.label, pickedCup3.label];

    currentCup.next = currentCup.next.next.next.next;
    currentCup.next.next.next.next.prev = currentCup;

    let destinationLabel = currentCup.label;

    do {
      destinationLabel = ((cupCount + destinationLabel - 2) % cupCount) + 1;
    } while (pickedLabels.includes(destinationLabel));

    const destinationCup = cupsLookup.get(destinationLabel);

    pickedCup1.prev = destinationCup;
    pickedCup3.next = destinationCup.next;
    destinationCup.next.prev = pickedCup3;
    destinationCup.next = pickedCup1;

    currentCup = currentCup.next;
  }

  const cupWithLabel1 = cupsLookup.get(1);

  return cupWithLabel1.next.label * cupWithLabel1.next.next.label;
}
