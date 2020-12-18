const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("mask = ")
  .filter((x) => x !== "")
  .map((x) => x.trim().split("\n"))
  .map(parseInputBlock);

function parseInputBlock(block) {
  const mask = block[0];

  const instructions = block
    .slice(1)
    .map((str) => str.match(/[\d]+/g))
    .map(([addr, data]) => {
      return {
        addr: parseInt(addr),
        data: parseInt(data),
      };
    });

  return { mask, instructions };
}

function part1() {
  const mem = {};

  for (const { mask, instructions } of input) {
    const maskSplit = mask.split("");
    for (const { addr, data } of instructions) {
      const dataSplit = data.toString(2).padStart(36, 0).split("");
      const dataToSave = [];
      for (let i = 0; i < maskSplit.length; i++) {
        dataToSave[i] = maskSplit[i] === "X" ? dataSplit[i] : maskSplit[i];
      }
      mem[addr] = parseInt(dataToSave.join(""), 2);
    }
  }

  return Object.values(mem).reduce((a, b) => a + b);
}

function getAllIndices(array, element) {
  const indices = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      indices.push(i);
    }
  }
  return indices;
}

function part2() {
  const mem = {};

  for (const { mask, instructions } of input) {
    const maskSplit = mask.split("");
    for (const { addr, data } of instructions) {
      const addrSplit = addr.toString(2).padStart(36, 0).split("");
      for (let i = 0; i < maskSplit.length; i++) {
        addrSplit[i] =
          maskSplit[i] === "0"
            ? addrSplit[i]
            : maskSplit[i] === "1"
            ? "1"
            : "X";
      }
      const xIndices = getAllIndices(addrSplit, "X");
      const numFloating = xIndices.length;

      for (let i = 0; i < 2 ** numFloating; i++) {
        const bin = i.toString(2).padStart(numFloating, "0").split("");
        for (let j = 0; j < xIndices.length; j++) {
          addrSplit[xIndices[j]] = bin[j];
        }
        mem[parseInt(addrSplit.join(""), 2)] = data;
      }
    }
  }

  return Object.values(mem).reduce((a, b) => a + b);
}

console.log(part1());
console.log(part2());
