function parseDigits(line) {
  return line
    .trim()
    .split(" ")
    .map((d) => d.split("").sort().join(""));
}

const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n")
  .map((l) => l.split("|"))
  .map(([i, o]) => ({
    input: parseDigits(i),
    output: parseDigits(o),
  }));

function getOutput(line) {
  const join = line.input.concat(line.output);

  const uniques = [];
  for (let i = 0; i < join.length; i++) {
    const segment = join[i];
    if (!uniques.includes(segment)) {
      uniques.push(segment);
      if (uniques.length === 10) {
        break;
      }
    }
  }

  function digitIncludes(a, b) {
    return b.split("").filter((c) => a.includes(c)).length === b.length;
  }

  let mapping = {};

  mapping[1] = uniques.find((s) => s.length === 2);
  mapping[4] = uniques.find((s) => s.length === 4);
  mapping[7] = uniques.find((s) => s.length === 3);
  mapping[8] = uniques.find((s) => s.length === 7);
  mapping[6] = uniques.find(
    (s) => s.length === 6 && !digitIncludes(s, mapping[7])
  );
  mapping[9] = uniques.find(
    (s) =>
      s.length === 6 &&
      digitIncludes(s, mapping[7]) &&
      digitIncludes(s, mapping[4])
  );
  mapping[0] = uniques.find(
    (s) =>
      s.length === 6 &&
      digitIncludes(s, mapping[7]) &&
      !digitIncludes(s, mapping[4])
  );
  mapping[3] = uniques.find(
    (s) => s.length === 5 && digitIncludes(s, mapping[7])
  );
  mapping[5] = uniques.find(
    (s) =>
      s.length === 5 &&
      !digitIncludes(s, mapping[7]) &&
      digitIncludes(mapping[9], s)
  );
  mapping[2] = uniques.find(
    (s) =>
      s.length === 5 &&
      !digitIncludes(s, mapping[7]) &&
      !digitIncludes(mapping[9], s)
  );

  Object.keys(mapping).forEach((key) => {
    mapping[mapping[key]] = key;
  });

  return parseInt(line.output.map((d) => mapping[d]).join(""), 10);
}

const total = data.reduce((sum, line) => sum + getOutput(line), 0);

console.log("Result:", total);
