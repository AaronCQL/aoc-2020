const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");

const numbers = input.split("\n").map((x) => parseInt(x));

const set = new Set(numbers);

for (let i = 0; i < numbers.length - 1; i++) {
  const remaining = 2020 - numbers[i];
  for (let j = i; j < numbers.length; j++) {
    const diff = remaining - numbers[j];
    if (set.has(diff)) {
      console.log(numbers[i] * numbers[j] * diff);
      return;
    }
  }
}
