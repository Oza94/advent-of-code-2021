const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");

const increases = data
  .split("\n")
  .map((num) => parseInt(num, 10))
  .reduce(
    (tmw, current, index, array) =>
      index < 2 ? tmw : [...tmw, array[index - 2] + array[index - 1] + current],
    []
  )
  .reduce(
    (sum, current, index, array) =>
      !index ? 0 : array[index - 1] < current ? sum + 1 : sum,
    0
  );

console.log("Result:", increases);
