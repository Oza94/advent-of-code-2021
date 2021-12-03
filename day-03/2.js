let data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

function common(input, c, most) {
  return input.reduce(
    ({ zero, one, common }, line) => {
      line[c] === "0" ? zero++ : one++;
      common = (most ? zero > one : one >= zero) ? "0" : "1";
      return { zero, one, common };
    },
    { zero: 0, one: 0, common: "" }
  ).common;
}

function binary(most) {
  let input = [...data];
  const len = data[0].length;
  let i = 0;

  do {
    const c = common(input, i, most);
    input = input.filter((l) => l[i] === c);
    i += 1;
  } while (input.length > 1);

  return parseInt(input[0], 2);
}

function oxygen() {
  return binary(true);
}

function co2() {
  return binary(false);
}

console.log("Result:", oxygen() * co2());
