const { readFileSync } = require("fs");

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
  let algorithm = "";
  let image = [];
  let imageSection = false;

  for (let index = 0; index < data.length; index++) {
    const line = data[index].replace(/\./g, "0").replace(/#/g, "1");

    if (line === "") {
      imageSection = true;
      continue;
    }

    if (imageSection) {
      image.push(line.split(""));
    } else {
      algorithm += line;
    }
  }

  const enhance = function (edgePixel) {
    const newImage = [];

    image = image.map(line => [edgePixel, edgePixel, ...line, edgePixel, edgePixel]);
    image.unshift(Array.from({ length: image[0].length }, () => edgePixel));
    image.unshift(Array.from({ length: image[0].length }, () => edgePixel));
    image.push(Array.from({ length: image[0].length }, () => edgePixel));
    image.push(Array.from({ length: image[0].length }, () => edgePixel));

    for (let i = 1; i < image.length - 1; i++) {
      for (let j = 1; j < image[0].length - 1; j++) {
        const signal = parseInt(
          `${image[i - 1].slice(j - 1, j + 2).join("")}${image[i].slice(j - 1, j + 2).join("")}${image[i + 1]
            .slice(j - 1, j + 2)
            .join("")}`,
          2
        );

        newImage[i - 1] = newImage[i - 1] || [];
        newImage[i - 1][j - 1] = algorithm.charAt(signal);
      }
    }

    image = newImage;
  };

  for (let i = 0; i < 2; i++) {
    let edgePixel;

    if (i === 0 || algorithm[0] === "0") {
      edgePixel = "0";
    } else if (algorithm[algorithm.length - 1] === "1") {
      edgePixel = "1";
    } else {
      edgePixel = i % 2 === 1 ? "1" : "0";
    }

    enhance(edgePixel);
  }

  return image.reduce((acc, v) => acc + v.filter(d => d === "1").length, 0);
}
