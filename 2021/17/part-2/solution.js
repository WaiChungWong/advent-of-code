const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const [xRange, yRange] = data[0]
    .replace(/target area: |x=|y=/g, "")
    .split(", ");
  const [minX, maxX] = xRange.split("..");
  const [minY, maxY] = yRange.split("..");

  const startX = Math.ceil((-1 + Math.sqrt(1 - 4 * -2 * minX)) / 2);
  const startY = -Math.ceil((-1 + Math.sqrt(1 - 4 * -2 * -maxY)) / 2);
  const endX = maxX;
  const endY = minY;
  const mapX = {};
  const mapY = {};

  for (let i = endX - 0; i >= startX; i--) {
    for (
      let j = 1, total = i, end = i;
      total <= maxX && end > 0 && j <= startX;
      j++, end--, total -= -end
    ) {
      if (total >= minX) {
        mapX[j] = mapX[j] || [];
        mapX[j].push(i);
      }
    }
  }

  for (let i = endY - 0; i <= 0; i++) {
    for (
      let j = 1, total = i, end = i;
      total >= minY && end <= 0 && j >= startY;
      j++, end--, total -= -end
    ) {
      if (total <= maxY) {
        mapY[j] = mapY[j] || [];
        mapY[j].push(i);

        let mirrorI = -i - 1;
        let mirrorJ = j + ((-i - 1) * 2 + 1);

        if (mirrorI > 0) {
          mapY[mirrorJ] = mapY[mirrorJ] || [];
          mapY[mirrorJ].push(mirrorI);
        }
      }
    }
  }

  let initials = [];

  for (const key in mapY) {
    const keyX = Math.min(key - 0, startX);

    for (let i = 0; i < mapY[key].length; i++) {
      initials.push(...mapX[keyX].map(x => `${x}, ${mapY[key][i]}`));
    }
  }

  return initials.filter((v, index) => initials.indexOf(v) === index).length;
}
