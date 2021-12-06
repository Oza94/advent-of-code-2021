const data = require("fs").readFileSync(
  require("path").resolve(__dirname, "./input"),
  "utf-8"
);

const state = data
  .split(",")
  .map((n) => parseInt(n, 10))
  .reduce(
    (acc, cur) => {
      acc[cur] += 1;
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

for (let i = 0; i < 256; i++) {
  const s0 = state[0];

  for (let s = 0; s < 8; s += 1) {
    state[s] = state[s + 1];
  }

  state[8] = s0;
  state[6] += s0;
}

const sum = state.reduce((sum, cur) => sum + cur, 0);

console.log("Result:", sum);
