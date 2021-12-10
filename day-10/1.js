const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const opening = "([{<";
const closing = ")]}>";
const scores = [3, 57, 1197, 25137];

function score(line) {
  const stack = [line[0]];
  for (let i = 1; i < line.length; i++) {
    const c = line[i];

    if (opening.includes(c)) {
      stack.push(c);
      continue;
    }

    const ci = closing.indexOf(c);

    if (ci !== opening.indexOf(stack[stack.length - 1])) {
      return scores[ci];
    }

    stack.pop();
  }

  return 0;
}

const result = data.reduce((sum, line) => sum + score(line), 0);
console.log("Result:", result);
