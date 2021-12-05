const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const cores = [];

  const getInterection = function (c1, c2) {
    const type = -c2.type;
    const xStart = Math.max(c1.xStart, c2.xStart);
    const xEnd = Math.min(c1.xEnd, c2.xEnd);
    const yStart = Math.max(c1.yStart, c2.yStart);
    const yEnd = Math.min(c1.yEnd, c2.yEnd);
    const zStart = Math.max(c1.zStart, c2.zStart);
    const zEnd = Math.min(c1.zEnd, c2.zEnd);

    if (xStart <= xEnd && yStart <= yEnd && zStart <= zEnd) {
      return { type, xStart, xEnd, yStart, yEnd, zStart, zEnd };
    }
  };

  for (let index = 0; index < data.length; index++) {
    const [switcher, ranges] = data[index].split(" ");
    const [x, y, z] = ranges.split(",").map(v => v.replace(/x=|y=|z=/g, ""));
    let type = switcher === "on" ? 1 : -1;
    let [xStart, xEnd] = x.split("..").map(v => v - 0);
    let [yStart, yEnd] = y.split("..").map(v => v - 0);
    let [zStart, zEnd] = z.split("..").map(v => v - 0);

    let coresToDdd = switcher === "on" ? [{ type, xStart, xEnd, yStart, yEnd, zStart, zEnd }] : [];

    for (let i = 0; i < cores.length; i++) {
      const intersaction = getInterection({ type, xStart, xEnd, yStart, yEnd, zStart, zEnd }, cores[i]);
      if (intersaction) {
        coresToDdd.push(intersaction);
      }
    }

    cores.push(...coresToDdd);
  }

  return cores.reduce(
    (sum, { type, xStart, xEnd, yStart, yEnd, zStart, zEnd }) =>
      sum + type * (xEnd - xStart + 1) * (yEnd - yStart + 1) * (zEnd - zStart + 1),
    0
  );
}
