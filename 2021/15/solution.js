const { readFileSync } = require("fs");

try {
  const data = readFileSync("input", "utf8")
    .split(/\r?\n/g)
    .filter(v => v);

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
    console.log(queue);
    let [currentX, currentY] = queue.shift().split(",");

    const neighbours = [
      { x: currentX - -1, y: currentY },
      { x: currentX, y: currentY - -1 },
      { x: currentX - 1, y: currentY },
      { x: currentX, y: currentY - 1 },
    ].filter(({ x: fx, y: fy }) => fx >= 0 && fx < width && fy >= 0 && fy < height);

    for (let i = 0; i < neighbours.length; i++) {
      const { x, y } = neighbours[i];

      let alt = distances[`${currentX},${currentY}`] - -data[y][x];

      if (!distances[`${x},${y}`] || alt < distances[`${x},${y}`]) {
        distances[`${x},${y}`] = alt;
        queue.push(`${x},${y}`);
        queue.sort((a, b) => distances[a] - distances[b]);
      }
    }
  }

  return distances[`${height - 1},${width - 1}`];
}
