const rotatePixels = function (pixels) {
  let rotatedPixels = [];

  for (let y = 0; y < pixels.length; y++) {
    rotatedPixels[y] = [];

    for (let x = 0; x < pixels[y].length; x++) {
      rotatedPixels[y][x] = pixels[pixels[y].length - 1 - x][y];
    }
  }

  return rotatedPixels;
};

const flipPixels = function (pixels) {
  return pixels.slice().reverse();
};

module.exports.getAllOrientations = function (pixels) {
  const orientations = [pixels];

  for (let index = 0; index < 3; index++) {
    orientations.push(rotatePixels(orientations[orientations.length - 1]));
  }

  return [...orientations, ...orientations.map(v => flipPixels(v))];
};

module.exports.linesUpVertically = function (topPixels, bottomPixels) {
  for (let i = 0; i < bottomPixels[0].length; i++) {
    if (topPixels[topPixels.length - 1][i] !== bottomPixels[0][i]) {
      return false;
    }
  }

  return true;
};

module.exports.linesUpHorizontally = function (leftPixels, rightPixels) {
  for (let i = 0; i < leftPixels.length; i++) {
    if (leftPixels[i][leftPixels[i].length - 1] !== rightPixels[i][0]) {
      return false;
    }
  }

  return true;
};

module.exports.foundMatchingOrientation = function (orientations1, orientations2) {
  const linesUpH = function (leftPixels, rightPixels) {
    for (let i = 0; i < leftPixels.length; i++) {
      if (leftPixels[i][leftPixels[i].length - 1] !== rightPixels[i][0]) {
        return false;
      }
    }

    return true;
  };

  for (const orientation1 of orientations1) {
    for (const orientation2 of orientations2) {
      if (linesUpH(orientation1, orientation2)) {
        return true;
      }
    }
  }

  return false;
};

module.exports.foundPattern = function (image, pattern, y, x) {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j] === "#" && image[y + i][x + j] !== "#" && image[y + i][x + j] !== "O") {
        return false;
      }
    }
  }

  return true;
};

module.exports.markPattern = function (image, pattern, y, x) {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j] === "#") {
        image[y + i][x + j] = "O";
      }
    }
  }
};
