const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let location = { x: 0, y: 0 };
  let waypoint = { x: 10, y: 1 };

  const rotateWaypoint = function (waypoint, degree) {
    const radian = (degree * Math.PI) / 180;

    return {
      x: Math.round(waypoint.x * Math.cos(radian) - waypoint.y * Math.sin(radian)),
      y: Math.round(waypoint.y * Math.cos(radian) + waypoint.x * Math.sin(radian)),
    };
  };

  const actionMap = {
    N: function (n) {
      waypoint.y += n;
    },
    S: function (n) {
      waypoint.y -= n;
    },
    E: function (n) {
      waypoint.x += n;
    },
    W: function (n) {
      waypoint.x -= n;
    },
    L: function (n) {
      waypoint = rotateWaypoint(waypoint, n);
    },
    R: function (n) {
      waypoint = rotateWaypoint(waypoint, -n);
    },
    F: function (n) {
      location.y += waypoint.y * n;
      location.x += waypoint.x * n;
    },
  };

  for (let index = 0; index < data.length; index++) {
    const [action, ...numberString] = data[index].split("");
    const number = numberString.join("") - 0;

    actionMap[action](number);
  }

  return Math.round(Math.abs(location.x) + Math.abs(location.y));
}
