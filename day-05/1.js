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
  .filter((line) => line[0].x === line[1].x || line[0].y === line[1].y);

const grid = new Array((width + 1) * (height + 1)).fill(0);
let dangerous = 0;

lines.forEach((line) => {
  if (line[0].x === line[1].x) {
    const miny = Math.min(line[0].y, line[1].y);
    const maxy = Math.max(line[0].y, line[1].y);
    for (let y = miny; y <= maxy; y += 1) {
      const i = y * width + line[0].x;
      grid[i] += 1;
      if (grid[i] === 2) {
        dangerous += 1;
      }
    }
  } else {
    const minx = Math.min(line[0].x, line[1].x);
    const maxx = Math.max(line[0].x, line[1].x);
    for (let x = minx; x <= maxx; x += 1) {
      const i = line[0].y * width + x;
      grid[i] += 1;
      if (grid[i] === 2) {
        dangerous += 1;
      }
    }
  }
});

console.log("Result:", dangerous);
