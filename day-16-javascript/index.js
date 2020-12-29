const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").split("\n\n");

function parseRules() {
  const ruleInput = input[0].split("\n").map((line) => line.split(": "));

  const rules = {};
  for (const [field, unparsedRule] of ruleInput) {
    // tuples of (min, max)
    const tuples = unparsedRule
      .split(" or ")
      .map((tup) => tup.split("-").map(Number));
    rules[field] = tuples;
  }
  return rules;
}

function parseTicket() {
  return input[1].replace("your ticket:\n", "").split(",").map(Number);
}

function parseOtherTickets() {
  return input[2]
    .replace("nearby tickets:\n", "")
    .split("\n")
    .map((ticket) => ticket.split(",").map(Number));
}

function combineRanges(rules) {
  const ranges = [];
  for (const tuples of Object.values(rules)) {
    for (const [min, max] of tuples) {
      for (let i = min; i <= max; i++) {
        ranges[i] = true;
      }
    }
  }
  return ranges;
}

function getValidTickets(tickets, ranges) {
  return tickets.filter((ticket) => ticket.every((num) => !!ranges[num]));
}

function part1(otherTickets, ranges) {
  return otherTickets.reduce(
    (sum, ticket) =>
      sum + ticket.reduce((acc, curr) => (ranges[curr] ? acc : acc + curr), 0),
    0
  );
}

function part2(rules, ticket, otherTickets) {
  // array of possible fields for each column of the ticket
  const possibleFields = [];

  const tickets = [...otherTickets, ticket];
  for (let i = 0; i < ticket.length; i++) {
    const mapCount = {};
    for (let j = 0; j < tickets.length; j++) {
      const currNum = tickets[j][i];
      for (const [field, tuples] of Object.entries(rules)) {
        if (mapCount[field] == null) {
          mapCount[field] = 0;
        }
        for (const [min, max] of tuples) {
          if (currNum >= min && currNum <= max) {
            mapCount[field]++;
          }
        }
      }
    }
    possibleFields[i] = new Set();
    for (const [field, count] of Object.entries(mapCount)) {
      if (count === tickets.length) {
        possibleFields[i].add(field);
      }
    }
  }

  // get the column indices for the required departure fields:
  const requiredIndices = [];
  while (requiredIndices.length < 6) {
    for (const [idx, set] of Object.entries(possibleFields)) {
      if (set.size === 1) {
        const field = set.values().next().value;
        possibleFields.forEach((set) => set.delete(field));
        if (field.includes("departure")) {
          requiredIndices.push(idx);
        }
        break;
      }
    }
  }

  return requiredIndices.reduce((acc, idx) => acc * ticket[idx], 1);
}

const rules = parseRules();
const ticket = parseTicket();
const otherTickets = parseOtherTickets();
const ranges = combineRanges(rules);
const validTickets = getValidTickets(otherTickets, ranges);

console.log(part1(otherTickets, ranges));
console.log(part2(rules, ticket, validTickets));
