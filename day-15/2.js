const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const iwidth = data[0].length;
const iheight = data.length;
const igrid = data.join("").split("").map(Number);
const width = iwidth * 5;
const height = iheight * 5;
const grid = new Array(width * height).fill(0);

for (let i = 0; i < 25; i++) {
  const ix = i % 5;
  const iy = (i / 5) | 0;
  for (let xy = 0; xy < iwidth * iheight; xy++) {
    const x = xy % iwidth;
    const y = (xy / iwidth) | 0;

    let v = igrid[y * iwidth + x] + ix + iy;
    if (v > 9) v -= 9;

    grid[(iy * iheight + y) * width + x + ix * iwidth] = v;
  }
}

function getNeighbors(i) {
  return [
    i % width > 0 ? i - 1 : -1,
    i >= width ? i - width : -1,
    i % width < width - 1 ? i + 1 : -1,
    ((i / width) | 0) < height - 1 ? i + width : -1,
  ].filter((i) => i !== -1);
}

const destination = width * height - 1;
const distances = new Array(width * height).fill(Infinity);
const unvisited = new Array(width * height).fill(0).map((_, i) => i);
distances[0] = 0;
let current = 0;

const logAt = unvisited.length / 20;
const total = unvisited.length;

do {
  const neighbors = getNeighbors(current);
  const unvistedNeighbors = neighbors.filter((n) => unvisited.includes(n));
  for (n of unvistedNeighbors) {
    const dist = distances[current] + grid[n];
    if (dist < distances[n]) {
      distances[n] = dist;
    }
  }

  const index = unvisited.findIndex((n) => n === current);
  unvisited.splice(index, 1);

  let min = -1;
  for (n of unvisited) {
    if (
      distances[n] !== Infinity &&
      (min === -1 || distances[min] > distances[n])
    ) {
      min = n;
    }
  }
  if (min === -1) {
    break;
  }
  current = min;

  const visited = total - unvisited.length;
  if (visited % logAt === 0) {
    console.log(`Visited ${visited} node(s) on ${total}`);
  }
} while (unvisited.length > 0);

console.log("Result:", distances[destination]);
