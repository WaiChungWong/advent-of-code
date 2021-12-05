function roll([
  { index: xIndex, normal: xNormal },
  { index: yIndex, normal: yNormal },
  { index: zIndex, normal: zNormal },
]) {
  return [
    { index: xIndex, normal: xNormal },
    { index: zIndex, normal: yNormal },
    { index: yIndex, normal: -zNormal },
  ];
}

function turn([
  { index: xIndex, normal: xNormal },
  { index: yIndex, normal: yNormal },
  { index: zIndex, normal: zNormal },
]) {
  return [
    { index: yIndex, normal: -yNormal },
    { index: xIndex, normal: xNormal },
    { index: zIndex, normal: zNormal },
  ];
}

const orientations = [];

[
  [
    { index: 0, normal: 1 },
    { index: 1, normal: 1 },
    { index: 2, normal: 1 },
  ],
  [
    { index: 1, normal: -1 },
    { index: 2, normal: -1 },
    { index: 0, normal: 1 },
  ],
].forEach(orientation => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      orientation = roll(orientation);
      orientations.push(orientation);

      for (let k = 0; k < 3; k++) {
        orientation = turn(orientation);
        orientations.push(orientation);
      }
    }

    orientation = roll(turn(roll(orientation)));
  }
});

module.exports = orientations.filter(
  (
    [
      { index: xIndex1, normal: xNormal1 },
      { index: yIndex1, normal: yNormal1 },
      { index: zIndex1, normal: zNormal1 },
    ],
    i
  ) =>
    orientations.findIndex(
      ([
        { index: xIndex2, normal: xNormal2 },
        { index: yIndex2, normal: yNormal2 },
        { index: zIndex2, normal: zNormal2 },
      ]) =>
        xIndex1 === xIndex2 &&
        xNormal1 === xNormal2 &&
        yIndex1 === yIndex2 &&
        yNormal1 === yNormal2 &&
        zIndex1 === zIndex2 &&
        zNormal1 === zNormal2
    ) === i
);
