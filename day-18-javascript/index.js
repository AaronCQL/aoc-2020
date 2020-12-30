const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .replace(/ /g, "")
  .split("\n")
  .map((line) => line.split(""));

/**
 * Shunting-yard algorithm (https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
 * to produce the Reverse Polish Notation (RPN) from the input tokens
 */
function shuntingYardPart1(tokens) {
  const outputRPN = [];
  const opStack = [];

  for (const token of tokens) {
    const isNumber = !!token.match(/\d/);
    if (isNumber) {
      // if is number, simply push to output
      outputRPN.push(parseInt(token));
      continue;
    }

    if (token === "(") {
      // if left bracket, push to op stack
      opStack.push(token);
      continue;
    }

    if (token === ")") {
      // if right bracket, pop all ops till left bracket and add to output
      let op;
      while ((op = opStack.pop()) !== "(") {
        outputRPN.push(op);
      }
      continue;
    }

    // if is operator, pop all ops and add to output (since left op takes precedence)
    while (opStack.length > 0 && opStack[opStack.length - 1] !== "(") {
      outputRPN.push(opStack.pop());
    }
    opStack.push(token);
  }

  // pop all operators and add to output
  return outputRPN.concat(opStack.reverse());
}

function shuntingYardPart2(tokens) {
  const outputRPN = [];
  const opStack = [];

  for (const token of tokens) {
    const isNumber = !!token.match(/\d/);
    if (isNumber) {
      // if is number, simply push to output
      outputRPN.push(parseInt(token));
      continue;
    }

    if (token === "(") {
      // if left bracket, push to op stack
      opStack.push(token);
      continue;
    }

    if (token === ")") {
      // if right bracket, pop all ops till left bracket and add to output
      let op;
      while ((op = opStack.pop()) !== "(") {
        outputRPN.push(op);
      }
      continue;
    }

    if (token === "*") {
      // if "*", pop all ops and add to output (since "+" takes precedence)
      while (opStack.length > 0 && opStack[opStack.length - 1] !== "(") {
        outputRPN.push(opStack.pop());
      }
    }
    opStack.push(token);
  }

  // pop all operators and add to output
  return outputRPN.concat(opStack.reverse());
}

function solveRPN(rpnTokens) {
  const stack = [];
  for (const token of rpnTokens) {
    if (Number.isInteger(token)) {
      stack.push(token);
      continue;
    }

    // if op, pop two numbers from stack and evaluate them with op
    const [right, left] = [stack.pop(), stack.pop()];
    stack.push(eval(`${left} ${token} ${right}`));
  }

  return stack[0];
}

function part1() {
  return input
    .map(shuntingYardPart1)
    .map(solveRPN)
    .reduce((a, b) => a + b, 0);
}

function part2() {
  return input
    .map(shuntingYardPart2)
    .map(solveRPN)
    .reduce((a, b) => a + b, 0);
}

console.log(part1());
console.log(part2());
