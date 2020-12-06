const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");

const numbers = input.split("\n").map((x) => parseInt(x));

const set = new Set(numbers);

for (const num of numbers) {
  const diff = 2020 - num;
  if (set.has(diff)) {
    console.log(num * diff);
    return;
  }
}
