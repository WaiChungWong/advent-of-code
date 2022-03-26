const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let totalFlashes = 0;

  for (let index = 0; index < data.length; index++) {
    data[index] = data[index].split("");
  }

  let index = 0;
  let synced = false;

  while (!synced) {
    const energyToAdd = [];
    const flashed = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[i][j]++;

        if (data[i][j] - 9 > 0) {
          flashed.push({ x: i, y: j });

          i - 1 >= 0 && j - 1 >= 0 && energyToAdd.push({ x: i - 1, y: j - 1 });
          i - 1 >= 0 && energyToAdd.push({ x: i - 1, y: j });
          i - 1 >= 0 && j + 1 < data[i].length && energyToAdd.push({ x: i - 1, y: j + 1 });
          j - 1 >= 0 && energyToAdd.push({ x: i, y: j - 1 });
          j + 1 < data[i].length && energyToAdd.push({ x: i, y: j + 1 });
          i + 1 < data.length && j - 1 >= 0 && energyToAdd.push({ x: i + 1, y: j - 1 });
          i + 1 < data.length && energyToAdd.push({ x: i + 1, y: j });
          i + 1 < data.length && j + 1 < data[i].length && energyToAdd.push({ x: i + 1, y: j + 1 });
        }
      }
    }

    while (energyToAdd.length > 0) {
      const { x, y } = energyToAdd.shift();

      data[x][y]++;

      if (data[x][y] - 9 > 0 && !flashed.find(({ x: fx, y: fy }) => fx - x === 0 && fy - y === 0)) {
        flashed.push({ x, y });

        x - 1 >= 0 && y - 1 >= 0 && energyToAdd.push({ x: x - 1, y: y - 1 });
        x - 1 >= 0 && energyToAdd.push({ x: x - 1, y: y });
        x - 1 >= 0 && y + 1 < data[x].length && energyToAdd.push({ x: x - 1, y: y + 1 });
        y - 1 >= 0 && energyToAdd.push({ x: x, y: y - 1 });
        y + 1 < data[x].length && energyToAdd.push({ x: x, y: y + 1 });
        x + 1 < data.length && y - 1 >= 0 && energyToAdd.push({ x: x + 1, y: y - 1 });
        x + 1 < data.length && energyToAdd.push({ x: x + 1, y: y });
        x + 1 < data.length && y + 1 < data[x].length && energyToAdd.push({ x: x + 1, y: y + 1 });
      }
    }

    synced = true;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] - 9 > 0) {
          data[i][j] = 0;
        } else {
          synced = false;
        }
      }
    }

    index++;
  }

  return index;
}
