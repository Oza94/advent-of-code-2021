const data = require("fs").readFileSync(
  require("path").resolve(__dirname, "./input"),
  "utf-8"
);

const state = data.split(",").map((n) => parseInt(n, 10));

for (let i = 0; i < 80; i++) {
  const added = [];
  for (let s = 0; s < state.length; s++) {
    if (!state[s]) {
      added.push(8);
      state[s] = 7;
    }
    state[s] -= 1;
  }
  state.push(...added);
  added.length = 0;
}

console.log("Result:", state.length);
