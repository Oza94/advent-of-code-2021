const data = require("fs").readFileSync(
  require("path").resolve(__dirname, "./input"),
  "utf-8"
);

const heights = data
  .split(",")
  .map((s) => parseInt(s, 10))
  .sort((a, b) => a - b);
const avg = Math.ceil(
  heights.reduce((sum, tot) => sum + tot, 0) / heights.length
);

const min = Math.floor(avg);
const max = Math.ceil(avg);

function fuel(height) {
  return heights.reduce((tot, h) => {
    const n = Math.abs(h - height);
    return tot + (n * (n + 1)) / 2;
  }, 0);
}

const cheapest = Math.min(fuel(min), fuel(max));

console.log("Result:", cheapest);
