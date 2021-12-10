const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const opening = "([{<";
const closing = ")]}>";

function score(line) {
  const stack = [line[0]];
  for (let i = 1; i < line.length; i++) {
    const c = line[i];

    if (opening.includes(c)) {
      stack.unshift(c);
      continue;
    }

    const ci = closing.indexOf(c);

    if (ci !== opening.indexOf(stack[0])) {
      return -1;
    }

    stack.shift();
  }

  return stack.reduce((tot, c) => tot * 5 + opening.indexOf(c) + 1, 0);
}

const scores = data
  .map(score)
  .filter((s) => s !== -1)
  .sort((a, b) => a - b);
const result = scores[(scores.length / 2) | 0];

console.log("Result:", result);
