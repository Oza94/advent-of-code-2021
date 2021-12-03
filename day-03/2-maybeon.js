const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("");

const tree = {};

function next(branch, most) {
  if (branch[0] && branch[1]) {
    const c0 = branch[0].count || 0;
    const c1 = branch[1].count || 0;
    const bit = most ? (c0 > c1 ? 0 : 1) : c1 >= c0 ? 0 : 1;
    return [bit, branch[bit]];
  }
  return branch[0] ? [0, branch[0]] : [1, branch[1]];
}

for (let c = 0, node = tree; c < data.length; c += 1) {
  const bit = data[c];
  if (bit === "\n") {
    node = tree;
  } else {
    if (!node[bit]) {
      node[bit] = { count: 0 };
    }
    node[bit].count += 1;
    node = node[bit];
  }
}

let oxybranch = tree;
let oxybit = -1;
let oxy = "";
let co2branch = tree;
let co2bit = -1;
let co2 = "";
const length = data.indexOf("\n");

for (let i = 0; i < length; i += 1) {
  [oxybit, oxybranch] = next(oxybranch, true);
  oxy += oxybit;

  [co2bit, co2branch] = next(co2branch, false);
  co2 += co2bit;
}

console.log("Result:", parseInt(oxy, 2) * parseInt(co2, 2));
