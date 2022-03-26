const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const [cardPublicKey, doorPublicKey] = data.map(Number);

  let cardLoopSize = 0;
  let value = 1;

  while (value != cardPublicKey) {
    value = (value * 7) % 20201227;
    cardLoopSize++;
  }

  let encryptionKey = 1;

  for (let index = 0; index < cardLoopSize; index++) {
    encryptionKey = (encryptionKey * doorPublicKey) % 20201227;
  }

  return encryptionKey;
}
