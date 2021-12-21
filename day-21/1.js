let [p1pos, p2pos] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n")
  .map((line) => parseInt(line.split(":")[1]));

const players = [
  { pos: p1pos - 1, score: 0 },
  { pos: p2pos - 1, score: 0 },
];

let current = 1;
let dice = 0;
let rolls = 0;

function roll() {
  rolls++;
  return (dice++ % 100) + 1;
}

function rollTimes(times) {
  return new Array(times)
    .fill(0)
    .map(roll)
    .reduce((sum, n) => sum + n, 0);
}

while (players[current].score < 1000) {
  current = (current + 1) % 2;
  player = players[current];
  player.pos = (player.pos + rollTimes(3)) % 10;
  player.score += player.pos + 1;
}

console.log("Result:", players[(current + 1) % 2].score * rolls);
