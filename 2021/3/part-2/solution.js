const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  let oxygenData = data.map(row => row.split(""));
  let co2Data = data.map(row => row.split(""));

  for (let colIndex = 0; colIndex < oxygenData[0].length && oxygenData.length > 1; colIndex++) {
    let bitCount = 0;

    for (let rowIndex = 0; rowIndex < oxygenData.length; rowIndex++) {
      bitCount -= -oxygenData[rowIndex][colIndex];
    }

    let dominant = Math.round(bitCount / oxygenData.length);

    oxygenData = oxygenData.filter(row => row[colIndex] == dominant);
  }

  for (let colIndex = 0; colIndex < co2Data[0].length && co2Data.length > 1; colIndex++) {
    let bitCount = 0;

    for (let rowIndex = 0; rowIndex < co2Data.length; rowIndex++) {
      bitCount -= -co2Data[rowIndex][colIndex];
    }

    let dominant = 1 - Math.round(bitCount / co2Data.length);

    co2Data = co2Data.filter(row => row[colIndex] == dominant);
  }

  let oxygen = parseInt(oxygenData[0].join(""), 2);
  let co2 = parseInt(co2Data[0].join(""), 2);

  return oxygen * co2;
}
