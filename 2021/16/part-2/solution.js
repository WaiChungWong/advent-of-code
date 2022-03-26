const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split("\r\n");

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const line = data[0];
  const hexMap = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };

  let binary = "";

  for (let index = 0; index < line.length; index++) {
    binary += hexMap[line.charAt(index)];
  }

  const parseBinary = function (binary) {
    let pointer = 0;
    let packets = [];

    const typeId = parseInt(binary.slice(pointer + 3, pointer + 6), 2);
    pointer += 6;

    if (typeId === 4) {
      let group = "";
      let numberString = "";

      do {
        group = binary.slice(pointer, pointer + 5);
        numberString += `${group.slice(1)}`;
        pointer += 5;
      } while (group.startsWith("1"));

      packets.push(parseInt(numberString, 2));
    } else {
      let subPackets = [];
      let lengthType = binary.slice(pointer, pointer + 1);
      pointer += 1;

      if (lengthType === "0") {
        const subPacketLength = parseInt(binary.slice(pointer, pointer + 15), 2);
        pointer += 15;
        const pointerEnd = pointer + subPacketLength;

        while (pointer < pointerEnd) {
          const { packets: subP, pointer: subPointer } = parseBinary(binary.slice(pointer));

          subPackets.push(...subP);
          pointer += subPointer;
        }
      } else if (lengthType === "1") {
        const subPacketCount = parseInt(binary.slice(pointer, pointer + 11), 2);
        pointer += 11;

        for (let i = 0; i < subPacketCount; i++) {
          const { packets: subP, pointer: subPointer } = parseBinary(binary.slice(pointer));
          subPackets.push(...subP);
          pointer += subPointer;
        }
      }
      if (typeId === 0) {
        packets.push(subPackets.reduce((acc, v) => acc + v, 0));
      } else if (typeId === 1) {
        packets.push(subPackets.reduce((acc, v) => acc * v, 1));
      } else if (typeId === 2) {
        packets.push(subPackets.reduce((acc, v) => Math.min(acc, v), subPackets[0]));
      } else if (typeId === 3) {
        packets.push(subPackets.reduce((acc, v) => Math.max(acc, v), subPackets[0]));
      } else if (typeId === 5) {
        packets.push(subPackets[0] > subPackets[1] ? 1 : 0);
      } else if (typeId === 6) {
        packets.push(subPackets[0] < subPackets[1] ? 1 : 0);
      } else if (typeId === 7) {
        packets.push(subPackets[0] === subPackets[1] ? 1 : 0);
      }
    }

    return { packets, pointer };
  };

  return parseBinary(binary).packets[0];
}
