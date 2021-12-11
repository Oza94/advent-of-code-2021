const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const width = data[0].length;
const height = data.length;
const octopus = data.join("").split("").map(Number);

function step() {
  const flashs = [];

  for (let i = 0; i < octopus.length; i++) {
    octopus[i] += 1;
    if (octopus[i] > 9) {
      flashs.push(i);
    }
  }

  for (let i = 0; i < flashs.length; i++) {
    const fi = flashs[i];
    octopus[fi] = 0;
    const fx = (fi % width) - 1;
    const fy = ((fi / width) | 0) - 1;
    for (let j = 0; j < 9; j++) {
      const x = fx + (j % 3);
      const y = fy + ((j / 3) | 0);
      const nfi = y * width + x;
      if (
        x > -1 &&
        y > -1 &&
        x < width &&
        y < height &&
        !flashs.includes(nfi)
      ) {
        octopus[nfi] += 1;
        if (octopus[nfi] > 9) {
          flashs.push(nfi);
        }
      }
    }
  }

  return flashs.length;
}

let result = 0;
for (let i = 0; i < 100; i++) {
  result += step();
}

console.log("Result", result);
