const { readFileSync } = require("fs");

try {
  const data = readFileSync("input.txt", "utf8").split(/\r?\n/g);

  const solution = findSolution(data);

  console.log(solution);
} catch (error) {
  console.error(error);
}

function findSolution(data) {
  const allIngredients = [];
  const allAllergens = new Map();

  const setIntersection = function (...sets) {
    return sets.reduce((a, b) => new Set([...a].filter(x => b.has(x))));
  };

  for (let index = 0; index < data.length; index++) {
    const [first, second] = data[index].split(" (contains ");

    const ingredients = first.split(" ");
    const allergens = second.replace(")", "").split(", ");

    allIngredients.push(...ingredients);

    for (const allergen of allergens) {
      if (allAllergens.has(allergen)) {
        allAllergens.set(allergen, setIntersection(allAllergens.get(allergen), new Set(ingredients)));
      } else {
        allAllergens.set(allergen, new Set(ingredients));
      }
    }
  }

  const allergenMap = new Map();

  while (allAllergens.size > 0) {
    for (const [allergen, ingredients] of allAllergens) {
      if (ingredients.size === 1) {
        const ingredient = ingredients.values().next().value;
        allergenMap.set(allergen, ingredient);

        allAllergens.delete(allergen);

        for (const allergicIngredients of allAllergens.values()) {
          allergicIngredients.delete(ingredient);
        }

        break;
      }
    }
  }

  const allergicIngredients = new Set(Array.from(allergenMap.values()));

  return allIngredients.filter(v => !allergicIngredients.has(v)).length;
}
