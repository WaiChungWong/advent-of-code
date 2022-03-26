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
        const neigbours = [
          (grid[i - 1] || [])[j - 1] || ".",
          (grid[i - 1] || [])[j] || ".",
          (grid[i - 1] || [])[j + 1] || ".",
          grid[i][j - 1] || ".",
          grid[i][j + 1] || ".",
          (grid[i + 1] || [])[j - 1] || ".",
          (grid[i + 1] || [])[j] || ".",
          (grid[i + 1] || [])[j + 1] || ".",
        ];

        if (grid[i][j] === "L" && neigbours.filter(n => n === "#").length === 0) {
          moved = true;
          newGrid[i][j] = "#";
        } else if (grid[i][j] === "#" && neigbours.filter(n => n === "#").length >= 4) {
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
