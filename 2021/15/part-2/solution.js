const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const height = data.length;
  const width = data[0].length;

  for (let index = 0; index < height; index++) {
    data[index] = data[index].split("");
  }

  let distances = { "0,0": 0 };
  let queue = ["0,0"];

  while (queue.length > 0) {
    let [currentX, currentY] = queue.shift().split(",");

    const neighbours = [
      { x: currentX - -1, y: currentY },
      { x: currentX, y: currentY - -1 },
      { x: currentX - 1, y: currentY },
      { x: currentX, y: currentY - 1 },
    ].filter(({ x: fx, y: fy }) => fx >= 0 && fx < width * 5 && fy >= 0 && fy < height * 5);

    for (let i = 0; i < neighbours.length; i++) {
      const { x, y } = neighbours[i];
      const heightCount = Math.floor(x / height);
      const widthCount = Math.floor(y / width);

      let alt =
        distances[`${currentX},${currentY}`] -
        -(((data[y % width][x % height] - -heightCount - -widthCount - 1) % 9) + 1);

      if (!distances[`${x},${y}`] || alt < distances[`${x},${y}`]) {
        distances[`${x},${y}`] = alt;
        queue.push(`${x},${y}`);
        queue.sort((a, b) => distances[a] - distances[b]);
      }
    }
  }

  return distances[`${height * 5 - 1},${width * 5 - 1}`];
}
