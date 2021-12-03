const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

function common(c, most) {
  return data.reduce(
    ({ zero, one, common }, line) => {
      line[c] === "0" ? zero++ : one++;
      common = (most ? zero > one : one > zero) ? "0" : "1";
      return { zero, one, common };
    },
    { zero: 0, one: 0, common: "" }
  ).common;
}

function binary(most) {
  return parseInt(
    new Array(data[0].length)
      .fill("")
      .map((_, i) => common(i, most))
      .join(""),
    2
  );
}

function gamma() {
  return binary(true);
}

function epsilon() {
  return binary(false);
}

console.log("Result:", gamma() * epsilon());
