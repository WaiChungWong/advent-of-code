const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const connections = new Map();

  for (let index = 0; index < data.length; index++) {
    const [from, to] = data[index].split("-");

    if (from !== "end") {
      connections.set(from, connections.get(from) || []);

      if (to !== "start") {
        connections.get(from).push(to);
      }
    }

    if (to !== "end") {
      connections.set(to, connections.get(to) || []);

      if (from !== "start") {
        connections.get(to).push(from);
      }
    }
  }

  let paths = [["start"]];
  let finishedPaths = [];

  while (paths.length > 0) {
    const path = paths.pop();

    const caves = connections.get(path[path.length - 1]);

    for (let i = 0; i < caves.length; i++) {
      const cave = caves[i];

      if (cave === "end") {
        finishedPaths.push([...path, cave]);
      } else if (cave.toLowerCase() !== cave || path.indexOf(cave) === -1) {
        paths.push([...path, cave]);
      }
    }
  }

  return finishedPaths.length;
}
