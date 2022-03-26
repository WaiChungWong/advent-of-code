const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const nearbyTickets = [];
  const minMaxList = [];
  const ownTicket = [];
  let mode = "fields";

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line === "your ticket:") {
      mode = "own_ticket";
    } else if (line === "nearby tickets:") {
      mode = "nearby_ticket";
    } else if (line.length > 0) {
      if (mode === "fields") {
        const [_, rangesString] = line.split(": ");
        const ranges = rangesString.split(" or ");

        for (let i = 0; i < ranges.length; i++) {
          const [min, max] = ranges[i].split("-");

          minMaxList.push({ min: min - 0, max: max - 0 });
        }
      } else if (mode === "own_ticket") {
        ownTicket.push(...line.split(",").map(v => v - 0));
      } else if (mode === "nearby_ticket") {
        nearbyTickets.push(line.split(",").map(v => v - 0));
      }
    }
  }

  const invalidValues = nearbyTickets
    .flat()
    .filter(v => minMaxList.filter(({ min, max }) => v >= min && v <= max).length === 0);

  return invalidValues.reduce((acc, v) => acc + v, 0);
}
