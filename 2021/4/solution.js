const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let drawNumbers = data[0].split(",");

  let boards = [];
  let board = [];

  for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
    const row = data[rowIndex];

    if (row === "") {
      if (board.length > 0) {
        boards.push(board);
      }

      board = [];
    } else {
      board.push(row.trim().replace(/ +/g, ",").split(","));
    }
  }

  if (board.length > 0) {
    boards.push(board);
  }

  for (let index = 0; index < drawNumbers.length; index++) {
    const drawNumber = drawNumbers[index];

    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex];

      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
          board[rowIndex][colIndex] = board[rowIndex][colIndex] == drawNumber ? NaN : board[rowIndex][colIndex];
        }
      }

      let isBingo = false;

      isBingo = isBingo || board.reduce((acc, row) => acc || row.reduce((acc, num) => acc && isNaN(num), true), false);
      for (let colIndex = 0; colIndex < board.length; colIndex++) {
        isBingo = isBingo || board.reduce((acc, row) => acc && isNaN(row[colIndex]), true);
      }

      if (isBingo) {
        let sum = board.reduce((acc, row) => acc - -row.reduce((acc, num) => acc - -(isNaN(num) ? 0 : num), 0), 0);

        return sum * drawNumber;
      }
    }
  }
}
