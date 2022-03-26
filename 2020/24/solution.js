const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const flipped = new Map();

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

  return flipped.size;
}
