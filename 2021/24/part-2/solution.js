const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8")
    .split(/\r?\n/g)
    .filter(v => v);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const operations = [];

  for (let index = 0; index < data.length; index++) {
    let [operator, a, b] = data[index].split(" ");
    operations.push({ operator, a, b });
  }

  const existingStates = {};

  const findMin = function (opIndex, w, x, y, z) {
    const state = `${opIndex},${z}`;

    if (x > 1000000 || y > 1000000 || z > 1000000) {
      return { valid: false, inputs: "" };
    }

    if (opIndex >= operations.length) {
      existingStates[state] = { valid: z === 0, inputs: "" };
      return existingStates[state];
    }

    const registers = { w, x, y, z };
    const { operator, a, b } = operations[opIndex];

    if (operator === "inp") {
      if (existingStates[state]) {
        return existingStates[state];
      }

      for (let input = 1; input < 10; input++) {
        registers[a] = input;

        const { valid, inputs } = findMin(opIndex + 1, registers.w, registers.x, registers.y, registers.z);

        if (valid) {
          existingStates[state] = { valid: true, inputs: `${input}${inputs}` };

          return existingStates[state];
        }
      }

      existingStates[state] = { valid: false, inputs: "" };

      return existingStates[state];
    }

    const bValue = registers[b] === undefined ? parseInt(b, 10) : registers[b];

    if (operator === "add") {
      registers[a] = registers[a] + bValue;
    } else if (operator === "mul") {
      registers[a] = registers[a] * bValue;
    } else if (operator === "div") {
      registers[a] = Math.floor(registers[a] / bValue);
    } else if (operator === "mod") {
      registers[a] = registers[a] % bValue;
    } else if (operator === "eql") {
      registers[a] = registers[a] === bValue ? 1 : 0;
    }

    return findMin(opIndex + 1, registers.w, registers.x, registers.y, registers.z);
  };

  return findMin(0, 0, 0, 0, 0).inputs;
}
