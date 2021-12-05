const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

function parsePoint(pointStr) {
  const [x, y] = pointStr.split(",");
  return { x: parseInt(x, 10), y: parseInt(y, 10) };
}

function parseLine(lineStr) {
  const [a, b] = lineStr.split("->");

  return [parsePoint(a), parsePoint(b)];
}

let width = 0;
let height = 0;

const lines = data
  .map((lineStr) => {
    const line = parseLine(lineStr);

    const mx = Math.max(line[0].x, line[1].x);
    if (mx > width) width = mx;

    const my = Math.max(line[0].y, line[1].y);
    if (my > height) height = my;

    return line;
  })
  .filter((line) => {
    const dx = Math.abs(line[0].x - line[1].x);
    const dy = Math.abs(line[0].y - line[1].y);
    return !dx || !dy || dx === dy;
  });

const grid = new Array((width + 1) * (height + 1)).fill(0);
let dangerous = 0;

lines.forEach((line) => {
  const dx = line[1].x - line[0].x;
  const dy = line[1].y - line[0].y;
  const len = Math.abs(dx || dy);
  for (let i = 0; i < len + 1; i++) {
    const x = line[0].x + i * (dx / len);
    const y = line[0].y + i * (dy / len);
    const c = y * width + x;
    grid[c] += 1;
    if (grid[c] === 2) {
      dangerous += 1;
    }
  }
});

console.log("Result:", dangerous);
