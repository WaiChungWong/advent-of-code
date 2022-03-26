const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let location = { x: 0, y: 0 };
  let faceDegree = 0;

  const actionMap = {
    N: function (n) {
      location.y += n;
    },
    S: function (n) {
      location.y -= n;
    },
    E: function (n) {
      location.x += n;
    },
    W: function (n) {
      location.x -= n;
    },
    L: function (n) {
      faceDegree = (faceDegree + n) % 360;
    },
    R: function (n) {
      faceDegree = (360 + faceDegree - n) % 360;
    },
    F: function (n) {
      location.y += Math.sin((faceDegree * Math.PI) / 180) * n;
      location.x += Math.cos((faceDegree * Math.PI) / 180) * n;
    },
  };

  for (let index = 0; index < data.length; index++) {
    const [action, ...numberString] = data[index].split("");
    const number = numberString.join("") - 0;

    actionMap[action](number);
  }

  return Math.round(Math.abs(location.x) + Math.abs(location.y));
}
