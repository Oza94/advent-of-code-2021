const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n")
  .map((l) => l.split("|")[1].trim())
  .reduce((acc, l) => acc.concat(l.split(" ")), []);

const digits = data.reduce(
  (sum, segments) =>
    segments.length === 2 ||
    segments.length === 3 ||
    segments.length === 4 ||
    segments.length === 7
      ? sum + 1
      : sum,
  0
);

console.log("Result:", digits);
