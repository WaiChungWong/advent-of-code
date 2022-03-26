const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let outputSum = 0;

  for (let i = 0; i < data.length; i++) {
    const [patterns, outputs] = data[i].split(" | ");
    const patternList = patterns.split(" ");
    const outputList = outputs.split(" ");

    const format = [];
    const patterns069 = [];
    const patterns235 = [];

    for (let i = 0; i < patternList.length; i++) {
      const pattern = patternList[i].split("").sort().join("");

      if (pattern.length === 2) {
        format[1] = pattern;
      } else if (pattern.length === 3) {
        format[7] = pattern;
      } else if (pattern.length === 4) {
        format[4] = pattern;
      } else if (pattern.length === 5) {
        patterns235.push(pattern);
      } else if (pattern.length === 6) {
        patterns069.push(pattern);
      } else if (pattern.length === 7) {
        format[8] = pattern;
      }
    }

    let index3 = patterns235.findIndex(p => format[1].split("").reduce((acc, v) => acc && p.indexOf(v) !== -1, true));
    format[3] = patterns235[index3];
    patterns235.splice(index3, 1);

    let index6 = patterns069.findIndex(p => format[1].split("").reduce((acc, v) => acc || p.indexOf(v) === -1, false));
    format[6] = patterns069[index6];
    patterns069.splice(index6, 1);

    let index0 = patterns069.findIndex(p => format[4].split("").reduce((acc, v) => acc || p.indexOf(v) === -1, false));
    format[0] = patterns069[index0];
    patterns069.splice(index0, 1);

    let index5 = patterns235.findIndex(p => p.split("").reduce((acc, v) => acc && format[6].indexOf(v) !== -1, true));
    format[5] = patterns235[index5];
    patterns235.splice(index5, 1);

    format[2] = patterns235[0];
    format[9] = patterns069[0];

    outputSum -= -outputList.map(output => format.findIndex(f => output.split("").sort().join("") === f)).join("");
  }

  return outputSum;
}
