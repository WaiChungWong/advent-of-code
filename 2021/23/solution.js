const { readFileSync } = require("fs");
const getMap = require("./map");

try {
  const data = readFileSync("input", "utf8")
    .split(/\r?\n/g)
    .filter(v => v);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const aPositions = [];
  const bPositions = [];
  const cPositions = [];
  const dPositions = [];

  for (let index = 0; index < data.length; index++) {
    const row = data[index];

    for (const match of row.matchAll(/A/g)) {
      aPositions.push({ y: index, x: match.index - 0 });
    }
    for (const match of row.matchAll(/B/g)) {
      bPositions.push({ y: index, x: match.index - 0 });
    }
    for (const match of row.matchAll(/C/g)) {
      cPositions.push({ y: index, x: match.index - 0 });
    }
    for (const match of row.matchAll(/D/g)) {
      dPositions.push({ y: index, x: match.index - 0 });
    }
  }

  const ROOM_DEPTH = 2;
  const { A_ROOMS, B_ROOMS, C_ROOMS, D_ROOMS, A_ROOM_X, B_ROOM_X, C_ROOM_X, D_ROOM_X, findAvailablePaths } =
    getMap(ROOM_DEPTH);

  const generateState = function (aPositions, bPositions, cPositions, dPositions) {
    const aKey = aPositions.map(({ y, x }) => `${y},${x}`).sort();
    const bKey = bPositions.map(({ y, x }) => `${y},${x}`).sort();
    const cKey = cPositions.map(({ y, x }) => `${y},${x}`).sort();
    const dKey = dPositions.map(({ y, x }) => `${y},${x}`).sort();

    return `[${aKey.toString()}],[${bKey.toString()}],[${cKey.toString()}],[${dKey.toString()}]`;
  };

  const queue = [{ energyUsed: 0, aPositions, bPositions, cPositions, dPositions }];
  const existingStates = {
    [generateState(aPositions, bPositions, cPositions, dPositions)]: 0,
  };

  while (queue.length > 0) {
    queue.sort((a, b) => a.energyUsed - b.energyUsed);

    const { energyUsed, aPositions, bPositions, cPositions, dPositions } = queue.shift();

    const aDone = aPositions.reduce((acc, { y, x }) => acc && x === A_ROOM_X && y > 1 && y <= ROOM_DEPTH + 1, true);
    const bDone = bPositions.reduce((acc, { y, x }) => acc && x === B_ROOM_X && y > 1 && y <= ROOM_DEPTH + 1, true);
    const cDone = cPositions.reduce((acc, { y, x }) => acc && x === C_ROOM_X && y > 1 && y <= ROOM_DEPTH + 1, true);
    const dDone = dPositions.reduce((acc, { y, x }) => acc && x === D_ROOM_X && y > 1 && y <= ROOM_DEPTH + 1, true);

    if (aDone && bDone && cDone && dDone) {
      return energyUsed;
    }

    if (!aDone) {
      const paths = findAvailablePaths(aPositions, A_ROOM_X, A_ROOMS, [...bPositions, ...cPositions, ...dPositions]);

      for (let index = 0; index < paths.length; index++) {
        const { positions, stepCount } = paths[index];
        const newState = generateState(positions, bPositions, cPositions, dPositions);
        const newEnergyUsed = energyUsed + stepCount;

        if (!existingStates[newState] || existingStates[newState] > newEnergyUsed) {
          existingStates[newState] = newEnergyUsed;

          queue.push({ energyUsed: newEnergyUsed, aPositions: positions, bPositions, cPositions, dPositions });
        }
      }
    }

    if (!bDone) {
      const paths = findAvailablePaths(bPositions, B_ROOM_X, B_ROOMS, [...aPositions, ...cPositions, ...dPositions]);

      for (let index = 0; index < paths.length; index++) {
        const { positions, stepCount } = paths[index];
        const newState = generateState(aPositions, positions, cPositions, dPositions);
        const newEnergyUsed = energyUsed + stepCount * 10;

        if (!existingStates[newState] || existingStates[newState] > newEnergyUsed) {
          existingStates[newState] = newEnergyUsed;

          queue.push({ energyUsed: newEnergyUsed, aPositions, bPositions: positions, cPositions, dPositions });
        }
      }
    }

    if (!cDone) {
      const paths = findAvailablePaths(cPositions, C_ROOM_X, C_ROOMS, [...aPositions, ...bPositions, ...dPositions]);

      for (let index = 0; index < paths.length; index++) {
        const { positions, stepCount } = paths[index];
        const newState = generateState(aPositions, bPositions, positions, dPositions);
        const newEnergyUsed = energyUsed + stepCount * 100;

        if (!existingStates[newState] || existingStates[newState] > newEnergyUsed) {
          existingStates[newState] = newEnergyUsed;

          queue.push({ energyUsed: newEnergyUsed, aPositions, bPositions, cPositions: positions, dPositions });
        }
      }
    }

    if (!dDone) {
      const paths = findAvailablePaths(dPositions, D_ROOM_X, D_ROOMS, [...aPositions, ...bPositions, ...cPositions]);

      for (let index = 0; index < paths.length; index++) {
        const { positions, stepCount } = paths[index];
        const newState = generateState(aPositions, bPositions, cPositions, positions);
        const newEnergyUsed = energyUsed + stepCount * 1000;

        if (!existingStates[newState] || existingStates[newState] > newEnergyUsed) {
          existingStates[newState] = newEnergyUsed;

          queue.push({ energyUsed: newEnergyUsed, aPositions, bPositions, cPositions, dPositions: positions });
        }
      }
    }
  }
}
