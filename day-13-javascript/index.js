const fs = require("fs");

const [earliestInput, busesInput] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n");

function findFirstDepartureAfter(earliestDeparture, interval) {
  const remainder = earliestDeparture % interval;

  return remainder === 0
    ? earliestDeparture
    : earliestDeparture + interval - remainder;
}

function part1() {
  const earliest = parseInt(earliestInput);
  const buses = busesInput
    .split(",")
    .map(Number)
    .filter(Number.isInteger)
    .map((id) => {
      return {
        id: id,
        depature: findFirstDepartureAfter(earliest, id),
      };
    });

  const earliestBus = buses.reduce((prevBus, currBus) =>
    currBus.depature < prevBus.depature ? currBus : prevBus
  );

  return (earliestBus.depature - earliest) * earliestBus.id;
}

function part2() {
  const buses = busesInput
    .split(",")
    .map(Number)
    .map((id, idx) => {
      return id
        ? {
            id: id,
            delta: idx,
          }
        : null;
    })
    .filter((bus) => !!bus);

  const busesToCheck = buses.slice(1);
  let time = 0;
  let jump = buses[0].id;

  for (const bus of busesToCheck) {
    while ((time + bus.delta) % bus.id !== 0) {
      time += jump;
    }
    jump *= bus.id;
  }

  return time;
}

console.log(part1());
console.log(part2());
