const input: number[] = "13,0,10,12,1,5,8".split(",").map(Number);

class State {
  private state: [number, number] = [null, null];

  addTurn(turn: number): void {
    this.state.shift();
    this.state.push(turn);
  }

  getNextNumber(): number {
    return this.state[1] - this.state[0];
  }
}

function solve(turn: number) {
  const map: Record<number, State> = {};

  for (let i = 0; i < input.length; i++) {
    const num: number = input[i];
    map[num] = new State();
    map[num].addTurn(i + 1);
  }

  let isFirst: boolean = true;
  let lastSpokenNumber: number = input[input.length - 1];
  for (let i = input.length + 1; i <= turn; i++) {
    lastSpokenNumber = isFirst ? 0 : map[lastSpokenNumber].getNextNumber();
    isFirst = !map[lastSpokenNumber];
    if (isFirst) {
      map[lastSpokenNumber] = new State();
    }
    map[lastSpokenNumber].addTurn(i);
  }

  return lastSpokenNumber;
}

// part 1
console.log(solve(2020));
// part 2
console.log(solve(30000000));
