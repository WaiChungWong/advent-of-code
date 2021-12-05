const { readFileSync } = require("fs");
const orientations = require("./orientations");

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
  const rotate = function (scanner, orientation) {
    return scanner.map(beacon => beacon.map((v, i) => beacon[orientation[i].index] * orientation[i].normal));
  };

  const scanners = [];

  for (let index = 0, scannerIndex = 0; index < data.length; index++) {
    const line = data[index];

    if (/^--- scanner [0-9]+ ---$/.test(line)) {
      scannerIndex = line.replace(/^--- scanner | ---$/g, "");
    } else if (line.length > 0) {
      scanners[scannerIndex] = scanners[scannerIndex] || [];
      scanners[scannerIndex].push(line.split(",").map(v => v - 0));
    }
  }

  const scannerIndiceToDo = [0];
  const scannerIndiceDone = [0];

  while (scannerIndiceToDo.length > 0) {
    const scannerIndex = scannerIndiceToDo.pop();
    const scannerA = scanners[scannerIndex];

    for (let i = 0; i < scanners.length; i++) {
      if (scannerIndiceDone.includes(i)) {
        continue;
      }

      let intersectFound = false;

      for (let oi = 0; oi < orientations.length && !intersectFound; oi++) {
        const orientation = orientations[oi];
        const scannerB = rotate(scanners[i], orientation);

        for (let j = 0; j < scannerA.length && !intersectFound; j++) {
          const beaconA1 = scannerA[j];

          for (let k = 0; k < scannerB.length && !intersectFound; k++) {
            const beaconB1 = scannerB[k];
            const diff1 = beaconA1.map((v, i) => v - beaconB1[i]);

            let intersectCount = 0;

            for (let l = 0; l < scannerA.length; l++) {
              if (j === l) {
                continue;
              }

              const beaconA2 = scannerA[l];

              for (let m = 0; m < scannerB.length; m++) {
                if (k === m) {
                  continue;
                }

                const beaconB2 = scannerB[m];
                const diff2 = beaconA2.map((v, i) => v - beaconB2[i]);

                if (diff1.reduce((acc, d, i) => acc && d === diff2[i], true)) {
                  intersectCount++;
                }
              }
            }

            if (intersectCount >= 11) {
              scanners[i] = scannerB.map(beacon => beacon.map((v, i) => v + diff1[i]));

              scannerIndiceToDo.push(i);
              scannerIndiceDone.push(i);

              intersectFound = true;
              break;
            }
          }
        }
      }
    }
  }

  return scanners
    .reduce((acc, v) => [...acc, ...v.map(e => e.toString())], [])
    .sort()
    .filter((v, i, a) => a.indexOf(v) === i).length;
}
