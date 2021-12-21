let [p1pos, p2pos] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n")
  .map((line) => parseInt(line.split(":")[1]));

const startUniverse = [0, p1pos - 1, 0, p2pos - 1, 0];

const possibleRolls = [];
for (let r1 = 0; r1 < 3; r1++) {
  for (let r2 = 0; r2 < 3; r2++) {
    for (let r3 = 0; r3 < 3; r3++) {
      possibleRolls.push(r1 + r2 + r3 + 3);
    }
  }
}

function quantumRoll(universe, roll) {
  const copy = [...universe];
  const current = universe[0];
  copy[1 + current * 2] = (universe[1 + current * 2] + roll) % 10;
  copy[2 + current * 2] += copy[1 + current * 2] + 1;
  copy[0] = (copy[0] + 1) % 2;
  return copy;
}

const toKey = (state) => state.join(",");
const fromKey = (state) => state.split(",").map(Number);

function play(universe) {
  const wins = [0, 0];
  let possibilities = {
    [toKey(universe)]: 1,
  };

  let keys = Object.keys(possibilities);
  while (keys.length) {
    const future = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const count = possibilities[key];
      const currentUniverse = fromKey(key);
      const current = currentUniverse[0];

      for (let j = 0; j < possibleRolls.length; j++) {
        const r = possibleRolls[j];
        const result = quantumRoll(currentUniverse, r);
        if (result[current * 2 + 2] >= 21) {
          wins[current] += count;
        } else {
          const fkey = toKey(result);
          future[fkey] = (future[fkey] || 0) + count;
        }
      }
    }

    possibilities = future;
    keys = Object.keys(possibilities);
  }

  return Math.max(...wins);
}

console.log("Result:", play(startUniverse));
