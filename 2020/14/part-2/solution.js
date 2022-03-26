const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

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
      const addressArray = (address - 0).toString(2).padStart(36, "0").split("");
      let addressList = [addressArray];

      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "X") {
          addressList = addressList.map(v => [...v.slice(0, i), "0", ...v.slice(i + 1)]);
          addressList.push(...addressList.map(v => [...v.slice(0, i), "1", ...v.slice(i + 1)]));
        } else if (mask[i] === "1") {
          addressList = addressList.map(v => [...v.slice(0, i), "1", ...v.slice(i + 1)]);
        }
      }

      addresses = addressList.map(v => v.join(""));

      for (let i = 0; i < addresses.length; i++) {
        mem.set(addresses[i], parseInt(value, 10));
      }
    }
  }

  return Array.from(mem.values()).reduce((acc, v) => acc + v, 0);
}
