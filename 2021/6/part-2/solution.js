const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let timers = data[0].split(",");
  let dayElapsed = 256;
  let count = 0;

  let f6 = [1, 1, 1, 1, 1, 1, 1, 2, 2];

  if (dayElapsed + 7 <= 9) {
    f6 = f6.slice(dayElapsed, dayElapsed + 7);
  } else {
    for (let i = 9; i < dayElapsed + 7; i++) {
      f6.push(f6[2] + f6[0]);
      f6.shift();
    }

    f6.shift();
    f6.shift();
  }

  for (let i = 0; i < timers.length; i++) {
    count += f6[f6.length - 1 - timers[i]];
  }

  return count;
}
