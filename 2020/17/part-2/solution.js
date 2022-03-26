const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let activeCubes = [];

  for (let y = 0; y < data.length; y++) {
    const row = data[y].split("");

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      if (cell === "#") {
        activeCubes.push(`${x},${y},0,0`);
      }
    }
  }

  for (let _ = 0; _ < 6; _++) {
    const cubesToCheck = [];

    for (let index = 0; index < activeCubes.length; index++) {
      const activeCube = activeCubes[index];
      const [ax, ay, az, aw] = activeCube.split(",").map(v => v - 0);

      for (let x = ax - 1; x <= ax + 1; x++) {
        for (let y = ay - 1; y <= ay + 1; y++) {
          for (let z = az - 1; z <= az + 1; z++) {
            for (let w = aw - 1; w <= aw + 1; w++) {
              const cube = `${x},${y},${z},${w}`;

              if (!cubesToCheck.includes(cube)) {
                cubesToCheck.push(`${x},${y},${z},${w}`);
              }
            }
          }
        }
      }
    }

    let newActiveCubes = [];

    for (let index = 0; index < cubesToCheck.length; index++) {
      const cube = cubesToCheck[index];
      const isActive = activeCubes.includes(cube);
      const [cx, cy, cz, cw] = cube.split(",").map(v => v - 0);
      let activeNeighbourCount = 0;

      for (let x = cx - 1; x <= cx + 1; x++) {
        for (let y = cy - 1; y <= cy + 1; y++) {
          for (let z = cz - 1; z <= cz + 1; z++) {
            for (let w = cw - 1; w <= cw + 1; w++) {
              if (`${x},${y},${z},${w}` !== cube && activeCubes.includes(`${x},${y},${z},${w}`)) {
                activeNeighbourCount++;
              }
            }
          }
        }
      }

      if (
        (isActive && activeNeighbourCount >= 2 && activeNeighbourCount <= 3) ||
        (!isActive && activeNeighbourCount === 3)
      ) {
        newActiveCubes.push(cube);
      }
    }

    activeCubes = newActiveCubes;
  }

  return activeCubes.length;
}
