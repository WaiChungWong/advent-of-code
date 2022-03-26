const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let changableIndices = [];

  for (let index = 0; index < data.length; index++) {
    const instruction = data[index];

    if (/nop|jmp/g.test(instruction)) {
      changableIndices.push(index);
    }
  }

  const findAccValue = function (instructions) {
    const visitedIndices = [];
    let index = 0;
    let accValue = 0;

    while (!visitedIndices[index] && index < instructions.length) {
      const [operation, argument] = instructions[index].split(" ");
      visitedIndices[index] = 1;

      if (operation === "acc") {
        accValue += argument - 0;
        index++;
      } else if (operation === "jmp") {
        index += argument - 0;
      } else if (operation === "nop") {
        index++;
      }
    }

    if (index === instructions.length) {
      return accValue;
    }
  };

  for (let index = 0; index < changableIndices.length; index++) {
    const instructions = [...data];
    const changeIndex = changableIndices[index];
    const instruction = instructions[changeIndex];

    if (instruction.startsWith("jmp")) {
      instructions[changeIndex] = instruction.replace("jmp", "nop");
    } else if (instruction.startsWith("nop")) {
      instructions[changeIndex] = instruction.replace("nop", "jmp");
    }

    const accValue = findAccValue(instructions);

    if (accValue) {
      return accValue;
    }
  }
}
