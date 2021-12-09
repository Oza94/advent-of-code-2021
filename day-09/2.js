const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const height = data.length;
const width = data[0].length;
const heightmap = data.reduce(
  (acc, line) => acc.concat(line.split("").map(Number)),
  []
);

function expand(basin, x, y) {
  const index = y * width + x;

  if (
    x < 0 ||
    y < 0 ||
    x >= width ||
    y >= height ||
    heightmap[index] > 8 ||
    basin.includes(index)
  ) {
    return;
  }

  basin.push(index);
  const pointHeight = heightmap[index];

  if (pointHeight < heightmap[index - 1]) {
    expand(basin, x - 1, y);
  }
  if (pointHeight < heightmap[index - width]) {
    expand(basin, x, y - 1);
  }
  if (pointHeight < heightmap[index + 1]) {
    expand(basin, x + 1, y);
  }
  if (pointHeight < heightmap[index + width]) {
    expand(basin, x, y + 1);
  }

  return basin;
}

const basins = [];
for (let i = 0; i < width * height; i++) {
  const x = i % width;
  const y = (i / width) | 0;
  const v = heightmap[i];
  if (
    (x > 0 && v >= heightmap[i - 1]) ||
    (y > 0 && v >= heightmap[i - width]) ||
    (x < width - 1 && v >= heightmap[i + 1]) ||
    (y < height - 1 && v >= heightmap[i + width])
  ) {
    continue;
  }
  basins.push(expand([], x, y));
}

const result = basins
  .sort((a, b) => b.length - a.length)
  .slice(0, 3)
  .reduce((tot, b) => tot * b.length, 1);

console.log("Result:", result);
