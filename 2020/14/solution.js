const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let mask = "X".repeat(36).split("");
  const mem = new Map();

  for (let index = 0; index < data.length; index++) {
    const [action, value] = data[index].split(" = ");

    if (action === "mask") {
      mask = value.split("");
    } else if (action.startsWith("mem")) {
      const [address] = action.match(/\d+/);
      const valueArray = (value - 0).toString(2).padStart(36, "0").split("");

      for (let i = 0; i < valueArray.length; i++) {
        if (mask[i] !== "X") {
          valueArray[i] = mask[i];
        }
      }

      mem.set(address, parseInt(valueArray.join(""), 2));
    }
  }

  return Array.from(mem.values()).reduce((acc, v) => acc + v, 0);
}
