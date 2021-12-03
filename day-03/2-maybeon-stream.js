const stream = require("fs").createReadStream(
  require("path").resolve(__dirname, "./input"),
  "utf-8"
);

const tree = {};
const parseState = {
  c: 0,
  node: tree,
  lineLength: 0,
};

stream.on("data", (data) => {
  for (let i = 0; i < data.length; i += 1) {
    const bit = data.charAt(parseState.c);
    if (bit === "\n") {
      parseState.node = tree;
      if (!parseState.lineLength) {
        parseState.lineLength = parseState.c;
      }
    } else {
      if (!parseState.node[bit]) {
        parseState.node[bit] = { count: 0 };
      }
      parseState.node[bit].count += 1;
      parseState.node = parseState.node[bit];
    }
    parseState.c += 1;
  }
});

function next(branch, most) {
  if (branch[0] && branch[1]) {
    const c0 = branch[0].count || 0;
    const c1 = branch[1].count || 0;
    const bit = most ? (c0 > c1 ? 0 : 1) : c1 >= c0 ? 0 : 1;
    return [bit, branch[bit]];
  }
  return branch[0] ? [0, branch[0]] : [1, branch[1]];
}

stream.on("end", () => {
  let oxybranch = tree;
  let oxybit = -1;
  let oxy = "";
  let co2branch = tree;
  let co2bit = -1;
  let co2 = "";

  for (let i = 0; i < parseState.lineLength; i += 1) {
    [oxybit, oxybranch] = next(oxybranch, true);
    oxy += oxybit;

    [co2bit, co2branch] = next(co2branch, false);
    co2 += co2bit;
  }

  console.log("Result:", parseInt(oxy, 2) * parseInt(co2, 2));
});
