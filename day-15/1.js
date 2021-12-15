const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const width = data[0].length;
const height = data.length;
const grid = data.join("").split("").map(Number);

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
} while (unvisited.length > 0);

console.log("Result:", distances[destination]);
