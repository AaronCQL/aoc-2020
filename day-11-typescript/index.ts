// Install deps with `yarn` or `npm` first
// Then run `yarn start` or `npm run start`
import * as fs from "fs";

const input: Readonly<string> = fs.readFileSync("input.txt", "utf-8");

enum State {
  FLOOR = ".",
  EMPTY = "L",
  OCCUPIED = "#",
}

enum Dir {
  TL, // top-left
  T, // top
  TR, // top-right
  L, // left
  R, // right
  BL, // bottom-left
  B, // bottom
  BR, // bottom-right
}

const topDirs: Set<Dir> = new Set([Dir.T, Dir.TL, Dir.TR]);
const botDirs: Set<Dir> = new Set([Dir.B, Dir.BL, Dir.BR]);
const leftDirs: Set<Dir> = new Set([Dir.L, Dir.TL, Dir.BL]);
const rightDirs: Set<Dir> = new Set([Dir.R, Dir.TR, Dir.BR]);

function getInitialState(): Readonly<State[][]> {
  return input.split("\n").map((ln) => ln.split("")) as State[][];
}

function initNewState(rows: number, cols: number): State[][] {
  return Array.from({ length: rows }, () => new Array(cols));
}

function countOccupiedStates(state: Readonly<State[][]>): number {
  return state.reduce(
    (count, row) =>
      count +
      row.reduce(
        (count, state) => (state === State.OCCUPIED ? count + 1 : count),
        0
      ),
    0
  );
}

// PART 1
function getNextStatePart1(
  state: Readonly<State[][]>,
  row: number,
  col: number
): State {
  const current: State = state[row][col];

  if (current === State.FLOOR) {
    return State.FLOOR;
  }

  const tl: State | undefined = state[row - 1]?.[col - 1];
  const t: State | undefined = state[row - 1]?.[col];
  const tr: State | undefined = state[row - 1]?.[col + 1];
  const l: State | undefined = state[row]?.[col - 1];
  const r: State | undefined = state[row]?.[col + 1];
  const bl: State | undefined = state[row + 1]?.[col - 1];
  const b: State | undefined = state[row + 1]?.[col];
  const br: State | undefined = state[row + 1]?.[col + 1];
  const adjacentSeats: (State | undefined)[] = [tl, t, tr, l, r, bl, b, br];

  if (current === State.EMPTY) {
    return adjacentSeats.every(
      (state: State | undefined) => state !== State.OCCUPIED
    )
      ? State.OCCUPIED
      : current;
  }

  // current is occupied:
  return adjacentSeats.reduce(
    (count: number, state: State | undefined) =>
      state === State.OCCUPIED ? count + 1 : count,
    0
  ) >= 4
    ? State.EMPTY
    : current;
}

function part1(state: Readonly<State[][]>, isStable: boolean): number {
  if (isStable) {
    return countOccupiedStates(state);
  }

  let isCurrentlyStable: boolean = true;
  const nextState: State[][] = initNewState(state.length, state[0].length);

  for (let row = 0; row < state.length; row++) {
    for (let col = 0; col < state[0].length; col++) {
      const curr = state[row][col];
      const next = (nextState[row][col] = getNextStatePart1(state, row, col));
      isCurrentlyStable = isCurrentlyStable && curr === next;
    }
  }

  return part1(nextState, isCurrentlyStable);
}

// PART 2
function getAdjacentState(
  state: Readonly<State[][]>,
  row: number,
  col: number,
  dir: Dir
): State | undefined {
  const newRow = row + (topDirs.has(dir) ? -1 : botDirs.has(dir) ? 1 : 0);
  const newCol = col + (leftDirs.has(dir) ? -1 : rightDirs.has(dir) ? 1 : 0);

  const adjState: State | undefined = state[newRow]?.[newCol];

  return adjState === State.FLOOR
    ? getAdjacentState(state, newRow, newCol, dir)
    : adjState;
}

function getNextStatePart2(
  state: Readonly<State[][]>,
  row: number,
  col: number
): State {
  const current: State = state[row][col];

  if (current === State.FLOOR) {
    return State.FLOOR;
  }

  const tl: State | undefined = getAdjacentState(state, row, col, Dir.TL);
  const t: State | undefined = getAdjacentState(state, row, col, Dir.T);
  const tr: State | undefined = getAdjacentState(state, row, col, Dir.TR);
  const l: State | undefined = getAdjacentState(state, row, col, Dir.L);
  const r: State | undefined = getAdjacentState(state, row, col, Dir.R);
  const bl: State | undefined = getAdjacentState(state, row, col, Dir.BL);
  const b: State | undefined = getAdjacentState(state, row, col, Dir.B);
  const br: State | undefined = getAdjacentState(state, row, col, Dir.BR);
  const adjacentSeats: (State | undefined)[] = [tl, t, tr, l, r, bl, b, br];

  if (current === State.EMPTY) {
    return adjacentSeats.every(
      (state: State | undefined) => state !== State.OCCUPIED
    )
      ? State.OCCUPIED
      : current;
  }

  // current is occupied:
  return adjacentSeats.reduce(
    (count: number, state: State | undefined) =>
      state === State.OCCUPIED ? count + 1 : count,
    0
  ) >= 5
    ? State.EMPTY
    : current;
}

function part2(state: Readonly<State[][]>, isStable: boolean): number {
  if (isStable) {
    return countOccupiedStates(state);
  }

  let isCurrentlyStable: boolean = true;
  const nextState: State[][] = initNewState(state.length, state[0].length);

  for (let row = 0; row < state.length; row++) {
    for (let col = 0; col < state[0].length; col++) {
      const curr = state[row][col];
      const next = (nextState[row][col] = getNextStatePart2(state, row, col));
      isCurrentlyStable = isCurrentlyStable && curr === next;
    }
  }

  return part2(nextState, isCurrentlyStable);
}

const initialState = getInitialState();
console.log(part1(initialState, false));
console.log(part2(initialState, false));
