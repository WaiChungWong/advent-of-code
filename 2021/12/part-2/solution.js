const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const connections = {};

  for (let index = 0; index < data.length; index++) {
    const [from, to] = data[index].split("-");

    if (from !== "end") {
      connections[from] = connections[from] || [];

      if (to !== "start") {
        connections[from].push(to);
      }
    }

    if (to !== "end") {
      connections[to] = connections[to] || [];

      if (from !== "start") {
        connections[to].push(from);
      }
    }
  }

  let paths = [["start"]];
  let finishedPaths = [];

  while (paths.length > 0) {
    const path = paths.pop();
    const smallPath = path.filter(p => p.toLowerCase() === p);
    const uniqueSmallPath = smallPath.filter((p, i) => smallPath.indexOf(p) === i);
    const noSmallCaveTwice = uniqueSmallPath.length === smallPath.length;
    const caves = connections[path[path.length - 1]];

    for (let i = 0; i < caves.length; i++) {
      const cave = caves[i];

      if (cave === "end") {
        finishedPaths.push([...path, cave]);
      } else if (cave.toLowerCase() !== cave || path.indexOf(cave) === -1 || noSmallCaveTwice) {
        paths.push([...path, cave]);
      }
    }
  }

  return finishedPaths.length;
}
