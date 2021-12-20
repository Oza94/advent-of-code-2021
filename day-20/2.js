let [ieAlgo, inputImg] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n\n");

const flip = ieAlgo[0] == "#" && ieAlgo[ieAlgo.length - 1] == ".";
let image = inputImg.split("\n").map((row) => row.split(""));

function apply(times) {
  let background = ".";

  for (let i = 0; i < times; i++) {
    const len = image[0].length + 2;
    image = [
      new Array(len).fill(background),
      ...image.map((row) => [background, ...row, background]),
      new Array(len).fill(background),
    ];

    image = image.map((row, y) =>
      row.map((pix, x) => ieAlgo[readPixel(image, x, y, background)])
    );

    if (flip) {
      background = background === "#" ? "." : "#";
    }
  }

  return image.reduce(
    (acc, row) => row.reduce((_acc, pix) => _acc + (pix == "#" ? 1 : 0), acc),
    0
  );
}

function readImageBit(image, y, x, bg) {
  return (y < 0 || y >= image.length || x < 0 || x >= image[0].length
    ? bg
    : image[y][x]) === "#"
    ? 1
    : 0;
}

function readPixel(image, x, y, bg) {
  let binary = parseInt(
    [
      readImageBit(image, y - 1, x - 1, bg),
      readImageBit(image, y - 1, x, bg),
      readImageBit(image, y - 1, x + 1, bg),
      readImageBit(image, y, x - 1, bg),
      readImageBit(image, y, x, bg),
      readImageBit(image, y, x + 1, bg),
      readImageBit(image, y + 1, x - 1, bg),
      readImageBit(image, y + 1, x, bg),
      readImageBit(image, y + 1, x + 1, bg),
    ].join(""),
    2
  );
  return binary;
}

console.log("Result:", apply(50));
