// Install deps with `yarn` or `npm` first
// Then run `yarn start` or `npm run start`
import * as fs from "fs";

enum Action {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
  LEFT = "L",
  RIGHT = "R",
  FORWARD = "F",
}

type Position = {
  north: number;
  east: number;
  facing: 0 | 90 | 180 | 270 | -90 | -180 | -270;
};

const input: Readonly<string[]> = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n");

function part1() {
  const position: Position = {
    north: 0,
    east: 0,
    facing: 0, // east is 0, south is 90|-270, west is 180|-180, north is 270|-90
  };

  for (const line of input) {
    const action: Action = line.charAt(0) as Action;
    const value: number = parseInt(line.slice(1));
    const { facing: currentFacing } = position;

    if (action === Action.NORTH) {
      position.north += value;
    } else if (action === Action.SOUTH) {
      position.north -= value;
    } else if (action === Action.EAST) {
      position.east += value;
    } else if (action === Action.WEST) {
      position.east -= value;
    } else if (action === Action.LEFT) {
      position.facing = ((currentFacing - value) %
        360) as typeof position.facing;
    } else if (action === Action.RIGHT) {
      position.facing = ((currentFacing + value) %
        360) as typeof position.facing;
    } else {
      if (currentFacing === 0) {
        // facing east
        position.east += value;
      } else if (currentFacing === 90 || currentFacing === -270) {
        // facing south
        position.north -= value;
      } else if (currentFacing === 180 || currentFacing === -180) {
        // facing west
        position.east -= value;
      } else if (currentFacing === 270 || currentFacing === -90) {
        // facing north
        position.north += value;
      }
    }
  }

  return Math.abs(position.east) + Math.abs(position.north);
}

function part2() {
  const waypoint: Pick<Position, "north" | "east"> = {
    north: 1,
    east: 10,
  };
  const position: Pick<Position, "north" | "east"> = {
    north: 0,
    east: 0,
  };

  for (const line of input) {
    const action: Action = line.charAt(0) as Action;
    const value: number = parseInt(line.slice(1));

    if (action === Action.NORTH) {
      waypoint.north += value;
    } else if (action === Action.SOUTH) {
      waypoint.north -= value;
    } else if (action === Action.EAST) {
      waypoint.east += value;
    } else if (action === Action.WEST) {
      waypoint.east -= value;
    } else if (action === Action.FORWARD) {
      // move towards waypoint
      position.north += waypoint.north * value;
      position.east += waypoint.east * value;
    } else {
      const tempNorth = waypoint.north;
      if (value === 180) {
        waypoint.north = -waypoint.north;
        waypoint.east = -waypoint.east;
      } else if (
        (action === Action.LEFT && value === 90) ||
        (action === Action.RIGHT && value === 270)
      ) {
        waypoint.north = waypoint.east;
        waypoint.east = -tempNorth;
      } else if (
        (action === Action.RIGHT && value === 90) ||
        (action === Action.LEFT && value === 270)
      ) {
        waypoint.north = -waypoint.east;
        waypoint.east = tempNorth;
      }
    }
  }

  return Math.abs(position.east) + Math.abs(position.north);
}

console.log(part1());
console.log(part2());
