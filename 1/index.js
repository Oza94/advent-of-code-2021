const fs = require("fs");
const path = require("path");

console.log("AOC #1");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");

const increases = data
  .split("\n")
  .map((num) => parseInt(num, 10))
  .reduce(
    (sum, current, index, array) =>
      !index ? 0 : array[index - 1] < current ? sum + 1 : sum,
    0
  );

console.log("Result:", increases);
