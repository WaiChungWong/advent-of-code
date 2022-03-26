const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let flipped = new Map();

  for (let index = 0; index < data.length; index++) {
    let line = data[index];

    let x = 0;
    let y = 0;

    while (line.length > 0) {
      if (/^e/.test(line)) {
        x--;
        line = line.substring(1);
      } else if (/^se/.test(line)) {
        y++;
        line = line.substring(2);
      } else if (/^sw/.test(line)) {
        x++;
        y++;
        line = line.substring(2);
      } else if (/^w/.test(line)) {
        x++;
        line = line.substring(1);
      } else if (/^nw/.test(line)) {
        y--;
        line = line.substring(2);
      } else if (/^ne/.test(line)) {
        x--;
        y--;
        line = line.substring(2);
      }
    }

    const coordinate = `${x},${y}`;

    if (flipped.has(coordinate)) {
      flipped.delete(coordinate);
    } else {
      flipped.set(coordinate, true);
    }
  }

  for (let index = 0; index < 100; index++) {
    let newFlipped = new Map();

    let tilesToCheck = new Set(
      [...flipped.keys()].flatMap(coordinate => {
        const [x, y] = coordinate.split(",").map(Number);

        return [
          `${x - 1},${y - 1}`,
          `${x - 1},${y}`,
          `${x},${y - 1}`,
          `${x},${y}`,
          `${x},${y + 1}`,
          `${x + 1},${y}`,
          `${x + 1},${y + 1}`,
        ];
      })
    );

    for (const coordinate of tilesToCheck) {
      const [x, y] = coordinate.split(",").map(Number);

      const blackNeighbours = [
        flipped.has(`${x - 1},${y - 1}`),
        flipped.has(`${x - 1},${y}`),
        flipped.has(`${x},${y - 1}`),
        flipped.has(`${x},${y + 1}`),
        flipped.has(`${x + 1},${y}`),
        flipped.has(`${x + 1},${y + 1}`),
      ].filter(v => v).length;

      if (flipped.has(coordinate) && (blackNeighbours === 0 || blackNeighbours > 2)) {
      } else if (!flipped.has(coordinate) && blackNeighbours === 2) {
        newFlipped.set(coordinate, true);
      } else if (flipped.has(coordinate)) {
        newFlipped.set(coordinate, true);
      }
    }

    flipped = newFlipped;
  }

  return flipped.size;
}
