const { readFileSync } = require("fs");
const {
  getAllOrientations,
  linesUpVertically,
  linesUpHorizontally,
  foundMatchingOrientation,
} = require("./image-utils");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const tiles = new Map();

  let currentNumber = 0;
  let pixels = [];

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line.length === 0) {
      tiles.set(currentNumber, pixels);
      pixels = [];
    } else if (line.startsWith("Tile ")) {
      currentNumber = line.replace(/Tile |:/g, "");
    } else {
      pixels.push(line.split(""));
    }
  }

  tiles.set(currentNumber, pixels);

  const tileNumbers = Array.from(tiles.keys());
  const tileOrientations = new Map();
  const adjacentTiles = new Map();

  for (const [tileNumber, pixels] of tiles) {
    tileOrientations.set(tileNumber, getAllOrientations(pixels));
  }

  for (const tileNumber of tileNumbers) {
    adjacentTiles.set(
      tileNumber,
      tileNumbers.filter(
        tileNumber2 =>
          tileNumber !== tileNumber2 &&
          foundMatchingOrientation(tileOrientations.get(tileNumber), tileOrientations.get(tileNumber2))
      )
    );
  }

  const tileCount = tiles.size;
  const imageWidth = Math.sqrt(tiles.size);
  const imageHeight = Math.sqrt(tiles.size);
  const grid = Array.from({ length: imageHeight }, () => new Array(imageWidth));

  const findImage = function (remainingTileNumbers, cellIndex = 0) {
    const y = Math.floor(cellIndex / imageWidth);
    const x = cellIndex % imageWidth;

    if (cellIndex === tileCount) {
      return true;
    }

    if (remainingTileNumbers.length < tileCount - cellIndex) {
      return false;
    }

    let possibleTiles = [
      ...remainingTileNumbers
        .map(tileNumber => Array.from({ length: 8 }, (_, orientationIndex) => ({ tileNumber, orientationIndex })))
        .flat(),
    ];

    if (y > 0) {
      const { tileNumber: topTileNumber, orientationIndex: topOrientationIndex } = grid[y - 1][x];
      const orientation1 = tileOrientations.get(topTileNumber)[topOrientationIndex];

      possibleTiles = possibleTiles
        .filter(({ tileNumber }) => adjacentTiles.get(topTileNumber).includes(tileNumber))
        .filter(({ tileNumber, orientationIndex }) =>
          linesUpVertically(orientation1, tileOrientations.get(tileNumber)[orientationIndex])
        );
    }

    if (x > 0) {
      const { tileNumber: leftTileNumber, orientationIndex: leftOrientationIndex } = grid[y][x - 1];
      const orientation1 = tileOrientations.get(leftTileNumber)[leftOrientationIndex];

      possibleTiles = possibleTiles
        .filter(({ tileNumber }) => adjacentTiles.get(leftTileNumber).includes(tileNumber))
        .filter(({ tileNumber, orientationIndex }) =>
          linesUpHorizontally(orientation1, tileOrientations.get(tileNumber)[orientationIndex])
        );
    }

    for (const possibleTile of possibleTiles) {
      grid[y][x] = possibleTile;

      const newRemainingTileNumbers = remainingTileNumbers.filter(tileNumber => tileNumber !== possibleTile.tileNumber);

      if (findImage(newRemainingTileNumbers, cellIndex + 1)) {
        return true;
      }
    }
  };

  if (findImage(tileNumbers)) {
    return [
      grid[0][0],
      grid[grid.length - 1][0],
      grid[0][grid[0].length - 1],
      grid[grid.length - 1][grid[grid.length - 1].length - 1],
    ]
      .map(v => v.tileNumber - 0)
      .reduce((acc, v) => acc * v, 1);
  }
}
