const data = require("fs").readFileSync(
  require("path").resolve(__dirname, "./input"),
  "utf-8"
);

function parseLiteral(input) {
  const groups = input.slice(6);
  const len = ((groups.length / 5) | 0) * 5;
  const nums = [];
  let i = 0;
  for (i = 0; i < len; i += 5) {
    nums.push(groups.slice(i + 1, i + 5));
    if (groups[i] === "0") {
      break;
    }
  }
  const rl = 11 + i;
  const l = (((rl / 4) | 0) + 1) * 4;

  return { p: parseInt(nums.join(""), 2), l, rl };
}

function parseOperator(input) {
  const pl = input[6] === "0" ? 15 : 11;
  const n = parseInt(input.slice(7, 7 + pl), 2);

  const s = 7 + pl;
  let i = 0;
  const subs = [];
  do {
    const packet = parse(input.slice(i + s));
    i += packet.rl;
    subs.push(packet);
  } while (
    ((pl === 15 && i < n) || (pl === 11 && subs.length < n)) &&
    parseInt(input.slice(i + s), 2) !== 0
  );

  return { pl, n, subs, rl: i + s };
}

function pad(i) {
  return new Array(4 - i.length).fill("0").join("") + i;
}

function parse(input) {
  const v = parseInt(input.slice(0, 3), 2);
  const t = parseInt(input.slice(3, 6), 2);

  return { v, t, ...(t === 4 ? parseLiteral(input) : parseOperator(input)) };
}

function hexToBin(input) {
  return input
    .split("")
    .map((i) => pad(parseInt(i, 16).toString(2)))
    .join("");
}

function total(packet) {
  return (
    packet.v +
    (packet.subs ? packet.subs.reduce((sum, p) => sum + total(p), 0) : 0)
  );
}

const parsed = parse(hexToBin(data));
const result = total(parsed);

console.log("Result:", result);
