const [polymerData, pairsData] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n\n");

const polymer = polymerData.split("");
const pairs = pairsData
  .split("\n")
  .map((pair) => pair.split(" -> "))
  .reduce((acc, [lrule, rrule]) => ({ ...acc, [lrule]: rrule }), {});

function step() {
  const len = (polymer.length - 1) * 2;
  for (let i = 0; i < len; i += 2) {
    const lrule = polymer.slice(i, i + 2).join("");
    polymer.splice(i + 1, 0, pairs[lrule]);
  }
}

for (let i = 0; i < 10; i++) {
  step();
}

const occurences = Object.values(
  polymer.reduce((acc, c) => ({ ...acc, [c]: acc[c] ? acc[c] + 1 : 1 }), {})
).sort((a, b) => a - b);
const result = occurences[occurences.length - 1] - occurences[0];

console.log("Result:", result);
