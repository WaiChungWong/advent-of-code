const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

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

  const getAdjacentSeats = function (y, x) {
    const adjacentSeats = [];

    let i, j;

    for (i = y - 1, j = x; i >= 0 && grid[i][j] === "."; i--) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    for (i = y + 1, j = x; i < height && grid[i][j] === "."; i++) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    for (i = y, j = x - 1; j >= 0 && grid[i][j] === "."; j--) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    for (i = y, j = x + 1; j < width && grid[i][j] === "."; j++) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    for (i = y - 1, j = x - 1; i >= 0 && j >= 0 && grid[i][j] === "."; i--, j--) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    for (i = y - 1, j = x + 1; i >= 0 && j < width && grid[i][j] === "."; i--, j++) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    for (i = y + 1, j = x - 1; i < height && j >= 0 && grid[i][j] === "."; i++, j--) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    for (i = y + 1, j = x + 1; i < height && j < width && grid[i][j] === "."; i++, j++) {}
    if (i >= 0 && i < height && j >= 0 && j < width) {
      adjacentSeats.push(grid[i][j]);
    }

    return adjacentSeats;
  };

  while (moved) {
    moved = false;
    let newGrid = [...grid.map(row => row.map(cell => cell))];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const neigbours = getAdjacentSeats(i, j);

        if (grid[i][j] === "L" && neigbours.filter(n => n === "#").length === 0) {
          moved = true;
          newGrid[i][j] = "#";
        } else if (grid[i][j] === "#" && neigbours.filter(n => n === "#").length >= 5) {
          moved = true;
          newGrid[i][j] = "L";
        }
      }
    }

    grid = [...newGrid.map(row => row.map(cell => cell))];

    stepCount++;
  }

  return grid.reduce((acc, v) => acc + v.filter(s => s === "#").length, 0);
}
