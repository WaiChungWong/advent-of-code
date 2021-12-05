const HALLWAY_XS = [1, 2, 4, 6, 8, 10, 11];
const HALLWAYS = Array.from({ length: HALLWAY_XS.length }, (_, i) => ({ y: 1, x: HALLWAY_XS[i] }));
const A_ROOM_X = 3;
const B_ROOM_X = 5;
const C_ROOM_X = 7;
const D_ROOM_X = 9;

const isPathBlocked = function ({ y: fromY, x: fromX }, { y: toY, x: toX }, obstacles, depth) {
  const startX = Math.min(fromX, toX);
  const endX = Math.max(fromX, toX);
  const hallwaysInBetween = HALLWAYS.filter(({ x }) => x >= startX && x <= endX && x !== fromX);

  // Check if the end position is occupied
  if (obstacles.find(({ y, x }) => toY === y && toX === x)) {
    return true;
  }

  // If start position is in the inner room, check if the outter room is occupied
  if (fromY === depth + 1 && obstacles.find(({ y, x }) => y > 1 && y < depth + 1 && fromX === x)) {
    return true;
  }

  // If end position is in the inner room, check if the outter room is occupied
  if (toY === depth + 1 && obstacles.find(({ y, x }) => y > 1 && y < depth + 1 && toX === x)) {
    return true;
  }

  // Check if any hallway position in between start and end is occupied
  if (hallwaysInBetween.filter(({ y: hY, x: hX }) => obstacles.find(({ y, x }) => y === hY && x === hX)).length > 0) {
    return true;
  }

  return false;
};

const findAvailablePaths = function (depth) {
  return function (positions, roomX, rooms, otherPositions) {
    const allPositions = [...otherPositions, ...positions];
    const paths = [];

    for (let index = 0; index < positions.length; index++) {
      const position = positions[index];
      const rest = [...positions.slice(0, index), ...positions.slice(index + 1)];

      // If it's not in the destination rooms and there's no other amphipods in those rooms, then try to move to the destination rooms
      if (
        position.x !== roomX &&
        !rooms.find(({ y, x }) => otherPositions.find(({ y: pY, x: pX }) => y === pY && x == pX))
      ) {
        for (let i = 0; i < rooms.length; i++) {
          const room = rooms[i];

          if (!isPathBlocked(position, room, allPositions, depth)) {
            const newPositions = [...rest, room];
            const stepCount = Math.abs(position.x - room.x) + (position.y - 1) + (room.y - 1);

            paths.push({ positions: newPositions, stepCount });
          }
        }
      }

      // If it's in a room or not in the deepest destination room, then try to move to the hallway
      if (
        (position.x !== roomX && position.y > 1 && position.y <= depth + 1) ||
        (position.x === roomX && position.y < depth + 1)
      ) {
        for (let i = 0; i < HALLWAYS.length; i++) {
          const hallway = HALLWAYS[i];

          if (!isPathBlocked(position, hallway, allPositions, depth)) {
            const newPositions = [...rest, hallway];
            const stepCount = Math.abs(position.x - hallway.x) + position.y - 1;

            paths.push({ positions: newPositions, stepCount });
          }
        }
      }
    }

    return paths;
  };
};

module.exports = function (depth) {
  return {
    HALLWAY_XS,
    A_ROOM_X,
    B_ROOM_X,
    C_ROOM_X,
    D_ROOM_X,
    HALLWAYS: Array.from({ length: HALLWAY_XS.length }, (_, i) => ({ y: 1, x: HALLWAY_XS[i] })),
    A_ROOMS: Array.from({ length: depth }, (_, i) => ({ y: depth + 1 - i, x: A_ROOM_X })),
    B_ROOMS: Array.from({ length: depth }, (_, i) => ({ y: depth + 1 - i, x: B_ROOM_X })),
    C_ROOMS: Array.from({ length: depth }, (_, i) => ({ y: depth + 1 - i, x: C_ROOM_X })),
    D_ROOMS: Array.from({ length: depth }, (_, i) => ({ y: depth + 1 - i, x: D_ROOM_X })),
    findAvailablePaths: findAvailablePaths(depth),
  };
};
