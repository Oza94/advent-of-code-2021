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
  return { p: parseInt(nums.join(""), 2), l: 11 + i };
}

function parseOperator(t, input) {
  const pl = input[6] === "0" ? 15 : 11;
  const s = 7 + pl;
  const n = parseInt(input.slice(7, s), 2);

  let i = 0;
  const subs = [];
  do {
    const packet = parse(input.slice(i + s));
    i += packet.l;
    subs.push(packet);
  } while (
    ((pl === 15 && i < n) || (pl === 11 && subs.length < n)) &&
    parseInt(input.slice(i + s), 2) !== 0
  );

  return { pl, n, subs, l: i + s, p: evaluate(t, subs) };
}

function pad(i) {
  return new Array(4 - i.length).fill("0").join("") + i;
}

function parse(input) {
  const v = parseInt(input.slice(0, 3), 2);
  const t = parseInt(input.slice(3, 6), 2);

  return {
    v,
    t,
    ...(t === 4 ? parseLiteral(input) : parseOperator(t, input)),
  };
}

function hexToBin(input) {
  return input
    .split("")
    .map((i) => pad(parseInt(i, 16).toString(2)))
    .join("");
}

function evaluate(t, subs) {
  switch (t) {
    case 0:
      return subs.reduce((sum, p) => sum + p.p, 0);
    case 1:
      return subs.reduce((prod, p) => prod * p.p, 1);
    case 2:
      return Math.min(...subs.map((p) => p.p));
    case 3:
      return Math.max(...subs.map((p) => p.p));
    case 5:
      return subs[0].p > subs[1].p ? 1 : 0;
    case 6:
      return subs[0].p < subs[1].p ? 1 : 0;
    case 7:
      return subs[0].p === subs[1].p ? 1 : 0;
  }
}

const parsed = parse(hexToBin(data));

console.log("Result:", parsed.p);
