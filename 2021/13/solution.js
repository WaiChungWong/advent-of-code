const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let foldSection = false;
  const dots = [];

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line === "") {
      foldSection = true;
      continue;
    }

    if (foldSection) {
      const [axis, value] = line.replace("fold along ", "").split("=");

      for (let i = 0; i < dots.length; i++) {
        const [x, y] = dots[i].split(",");

        if (axis === "y" && y - value > 0) {
          dots[i] = `${x},${value - (y - value)}`;
        } else if (axis === "x" && x - value > 0) {
          dots[i] = `${value - (x - value)},${y}`;
        }
      }

      break;
    } else {
      dots.push(line);
    }
  }

  return dots.filter((d, i) => dots.indexOf(d) === i).length;
}
