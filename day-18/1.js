const ctrl = "[],";

function parse(expr) {
  return expr.split("").map((c) => (ctrl.includes(c) ? c : parseInt(c)));
}

const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n")
  .map(parse);

function addExplode(snailnum, i, side, n) {
  while (i > -1 && i < snailnum.length) {
    if (Number.isInteger(snailnum[i])) {
      snailnum[i] += n;
      return;
    }
    i += side;
  }
}

function reduceOnce(initSn) {
  const snailnum = [...initSn];
  let depth = 0;
  let side = -1;
  let split = null;
  for (let i = 0; i < snailnum.length; i++) {
    const tok = snailnum[i];
    switch (tok) {
      case "[":
        depth += 1;
        side = -1;
        break;
      case "]":
        if (depth > 4) {
          snailnum.splice(i - 4, 5, 0);
          return [snailnum, false];
        }
        depth -= 1;
        break;
      case ",":
        side = 1;
        break;
      default:
        if (depth > 4) {
          addExplode(snailnum, i + side, side, tok);
        } else if (tok > 9 && !split) {
          split = [i, tok];
        }
        break;
    }
  }

  if (split) {
    snailnum.splice(
      split[0],
      1,
      "[",
      Math.floor(split[1] / 2),
      ",",
      Math.ceil(split[1] / 2),
      "]"
    );
    return [snailnum, false];
  }
  return [snailnum, true];
}

function reduce(snailnum) {
  let noop = false;
  do {
    [snailnum, noop] = reduceOnce(snailnum);
  } while (!noop);
  return snailnum;
}

function add(s1, s2) {
  return reduce(["[", ...s1, ",", ...s2, "]"]);
}

function sum(snailnums) {
  let current = snailnums[0];

  for (let i = 1; i < snailnums.length; i++) {
    current = add(current, snailnums[i]);
  }

  return current;
}

function magnitude(initSn) {
  const snailnum = [...initSn];
  do {
    for (let i = 0; i < snailnum.length; i++) {
      const tok = snailnum[i];
      if (
        tok === "," &&
        Number.isInteger(snailnum[i - 1]) &&
        Number.isInteger(snailnum[i + 1])
      ) {
        const m = snailnum[i - 1] * 3 + snailnum[i + 1] * 2;
        snailnum.splice(i - 2, 5, m);
        break;
      }
    }
  } while (snailnum.length > 1);
  return snailnum[0];
}

console.log("Result:", magnitude(sum(data)));
