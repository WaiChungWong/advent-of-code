const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const nearbyTickets = [];
  const ownTicket = [];
  const fieldMap = new Map();

  let mode = "fields";

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line === "your ticket:") {
      mode = "own_ticket";
    } else if (line === "nearby tickets:") {
      mode = "nearby_ticket";
    } else if (line.length > 0) {
      if (mode === "fields") {
        const [field, rules] = line.split(": ");
        const fieldValues = rules.split(" or ").map(rule => rule.split("-").map(v => v - 0));

        fieldMap.set(field, fieldValues);
      } else if (mode === "own_ticket") {
        ownTicket.push(...line.split(",").map(v => v - 0));
      } else if (mode === "nearby_ticket") {
        nearbyTickets.push(line.split(",").map(v => v - 0));
      }
    }
  }

  const validTickets = nearbyTickets.filter(ticket =>
    ticket.reduce(
      (acc, v) =>
        acc &&
        Array.from(fieldMap.values())
          .flat()
          .filter(([min, max]) => v >= min && v <= max).length > 0,
      true
    )
  );

  const fields = Array.from(fieldMap.keys());
  const possibleFields = [];

  for (let index = 0; index < ownTicket.length; index++) {
    possibleFields[index] = [];

    const values = validTickets.map(v => v[index]);

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const ranges = fieldMap.get(field);

      if (values.reduce((acc, v) => acc && ranges.filter(([min, max]) => v >= min && v <= max).length > 0, true)) {
        possibleFields[index].push(field);
      }
    }
  }

  const fieldIndices = new Map();

  while (possibleFields.flat().length > 0) {
    const matchIndex = possibleFields.findIndex(possibilities => possibilities.length === 1);
    const [field] = possibleFields[matchIndex];

    fieldIndices.set(field, matchIndex);

    for (let index = 0; index < possibleFields.length; index++) {
      possibleFields[index] = possibleFields[index].filter(v => v !== field);
    }
  }

  const departureFields = Array.from(fieldIndices.keys()).filter(field => field.startsWith("departure"));

  return departureFields.reduce((acc, v) => acc * ownTicket[fieldIndices.get(v)], 1);
}
