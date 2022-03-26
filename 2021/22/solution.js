const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const cubes = new Map();

  for (let index = 0; index < data.length; index++) {
    const [switcher, coordinates] = data[index].split(" ");
    const [xRange, yRange, zRange] = coordinates.split(",").map(v => v.replace(/x=|y=|z=/g, ""));
    const [xStart, xEnd] = xRange.split("..");
    const [yStart, yEnd] = yRange.split("..");
    const [zStart, zEnd] = zRange.split("..");

    for (let i = Math.max(-50, xStart); i <= Math.min(50, xEnd); i++) {
      for (let j = Math.max(-50, yStart); j <= Math.min(50, yEnd); j++) {
        for (let k = Math.max(-50, zStart); k <= Math.min(50, zEnd); k++) {
          if (switcher === "on") {
            cubes.set(`${i},${j},${k}`, true);
          } else if (switcher === "off") {
            cubes.delete(`${i},${j},${k}`);
          }
        }
      }
    }
  }

  return cubes.size;
}
