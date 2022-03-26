const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const totalRows = 128;
  const totalColumns = 8;

  const findSeatId = function (partitions) {
    let startRow = 0;
    let endRow = totalRows - 1;
    let startColumn = 0;
    let endColumn = totalColumns - 1;

    for (let index = 0; index < partitions.length; index++) {
      const letter = partitions.charAt(index);

      if (letter === "F") {
        endRow = Math.floor((endRow + startRow) / 2);
      } else if (letter === "B") {
        startRow = Math.ceil((endRow + startRow) / 2);
      } else if (letter === "R") {
        startColumn = Math.ceil((endColumn + startColumn) / 2);
      } else if (letter === "L") {
        endColumn = Math.floor((endColumn + startColumn) / 2);
      }
    }

    return startRow * totalColumns + startColumn;
  };

  let lowestSeatId = -1;
  const occupied = [];

  for (let index = 0; index < data.length; index++) {
    const seatId = findSeatId(data[index]);

    lowestSeatId = lowestSeatId === -1 ? seatId : Math.min(lowestSeatId, seatId);
    occupied.push(seatId);
  }

  let xornum = 0;

  for (let index = 0; index < occupied.length; index++) {
    xornum ^= lowestSeatId ^ occupied[index];
    lowestSeatId++;
  }

  return xornum ^ lowestSeatId;
}
