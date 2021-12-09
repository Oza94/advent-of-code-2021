const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const height = data.length;
const width = data[0].length;
const heightmap = data.reduce(
  (acc, line) => acc.concat(line.split("").map(Number)),
  []
);

let risk = 0;
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
  risk += v + 1;
}

console.log("Result:", risk);
