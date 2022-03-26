const { readFileSync } = require("fs");

try {
  const data = readFileSync("../input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const fieldValidations = {
    byr: year => /^(19[2-9][0-9]|200[0-2])$/.test(year),
    iyr: year => /^(201[0-9]|2020)$/.test(year),
    eyr: year => /^(202[0-9]|2030)$/.test(year),
    hgt: height => /^1([5-8][0-9]|9[0-3])cm$/.test(height) || /^(59|6[0-9]|7[0-6])in$/.test(height),
    hcl: color => /^#([a-fA-F0-9]{6})$/.test(color),
    ecl: color => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(color),
    pid: id => /^\d{9}$/.test(id),
  };
  const requiredFields = Object.keys(fieldValidations);
  const isValid = passport => {
    const currentFields = Array.from(passport.keys());

    return (
      requiredFields.filter(field => currentFields.indexOf(field) === -1).length === 0 &&
      currentFields.reduce(
        (acc, v) => acc && (fieldValidations[v] === undefined || fieldValidations[v](passport.get(v))),
        true
      )
    );
  };

  let validCount = 0;
  let passport = new Map();

  for (let index = 0; index < data.length; index++) {
    const line = data[index];

    if (line.length === 0) {
      if (isValid(passport)) {
        validCount++;
      }

      passport = new Map();
      continue;
    }

    line
      .split(" ")
      .map(pair => pair.split(":"))
      .forEach(([field, value]) => passport.set(field, value));
  }

  if (isValid(passport)) {
    validCount++;
  }

  return validCount;
}
