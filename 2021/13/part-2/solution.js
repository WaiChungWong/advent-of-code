const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input", "utf8").split("\r\n");

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
    } else {
      dots.push(line);
    }
  }

  const uniqueDots = dots.filter((d, i) => dots.indexOf(d) === i);
  const dotMap = uniqueDots.map(v => v.split(","));
  const width = dotMap.reduce((acc, [x]) => Math.max(acc, x), 0) + 1;
  const height = dotMap.reduce((acc, [_, y]) => Math.max(acc, y), 0) + 1;

  const code = [];

  for (let h = 0; h < height; h++) {
    code[h] = code[h] || [];
    for (let w = 0; w < width; w++) {
      code[h][w] = uniqueDots.indexOf(`${w},${h}`) !== -1 ? "#" : ".";
    }
  }

  return code.map(c => c.join("")).join("\n");
}
