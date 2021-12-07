const data = require("fs").readFileSync(
  require("path").resolve(__dirname, "./input"),
  "utf-8"
);

const heights = data
  .split(",")
  .map((s) => parseInt(s, 10))
  .sort((a, b) => a - b);

const middle = heights.length / 2;
const median =
  heights.length % 1
    ? heights[middle | 0]
    : (heights[middle] + heights[middle - 1]) / 2;

const min = Math.floor(median);
const max = Math.ceil(median);

function fuel(height) {
  return heights.reduce((tot, h) => tot + Math.abs(h - height), 0);
}

const cheapest = Math.min(fuel(min), fuel(max));

console.log("Result:", cheapest);
