const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const height = data.length;
  const width = data[0].length;
  let grid = data.map(row => row.split(""));
  let stepCount = 0;
  let moved = true;

  while (moved) {
    moved = false;
    let newGrid = [...grid.map(row => row.map(cell => cell))];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (grid[i][j] === ">") {
          if (grid[i][(j + 1) % width] === ".") {
            moved = true;
            newGrid[i][(j + 1) % width] = ">";
            newGrid[i][j] = ".";
          }
        }
      }
    }

    grid = [...newGrid.map(row => row.map(cell => cell))];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (grid[i][j] === "v") {
          if (grid[(i + 1) % height][j] === ".") {
            moved = true;
            newGrid[(i + 1) % height][j] = "v";
            newGrid[i][j] = ".";
          }
        }
      }
    }

    grid = [...newGrid.map(row => row.map(cell => cell))];

    stepCount++;
  }

  return stepCount;
}
