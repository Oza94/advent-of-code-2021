const [polymerData, pairsData] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n\n");

let polymer = polymerData.split("").reduce(
  ([pairs, chars], l, i, array) => {
    const pair = array[i - 1] + l;
    return [
      i < 1 ? pairs : { ...pairs, [pair]: (pairs[pair] || 0) + 1 },
      { ...chars, [l]: (chars[l] || 0) + 1 },
    ];
  },
  [{}, {}]
);
const pairsInserts = pairsData
  .split("\n")
  .map((pair) => pair.split(" -> "))
  .reduce((acc, [lrule, rrule]) => ({ ...acc, [lrule]: rrule }), {});

function step([pairs, chars]) {
  const opairs = {};
  const ochars = { ...chars };
  for (const [pair, count] of Object.entries(pairs)) {
    const c = pairsInserts[pair];
    const p1 = [pair[0], c].join("");
    const p2 = [c, pair[1]].join("");
    opairs[p1] = (opairs[p1] || 0) + count;
    opairs[p2] = (opairs[p2] || 0) + count;
    ochars[c] = (ochars[c] || 0) + count;
  }

  return [opairs, ochars];
}

for (let i = 0; i < 40; i++) {
  polymer = step(polymer);
}

const occurences = Object.values(polymer[1]).sort((a, b) => a - b);
const result = occurences[occurences.length - 1] - occurences[0];

console.log("Result:", result);
