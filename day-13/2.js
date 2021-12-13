const [dotData, foldData] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n\n");

const initialDots = dotData
  .split("\n")
  .map((l) => l.trim().split(",").map(Number))
  .map(([x, y]) => ({ x, y }));
const foldInstrs = foldData
  .split("\n")
  .map((l) => l.replace("fold along ", "").split("="))
  .map(([axis, n]) => [axis, Number(n)]);

function fold(dots, [axis, n]) {
  return dots.reduce((foldedDots, dot) => {
    if (dot[axis] > n) {
      dot = { ...dot, [axis]: n - (dot[axis] - n) };
    }
    if (foldedDots.find(({ x, y }) => x === dot.x && y === dot.y)) {
      return foldedDots;
    }
    return [...foldedDots, dot];
  }, []);
}

function print(dots, width, height) {
  for (let y = 0; y < height; y++) {
    let buff = [];
    for (let x = 0; x < width; x++) {
      buff.push(
        dots.find((dot) => x === dot.x && y === dot.y)
          ? "\x1b[41m \x1b[0m"
          : " "
      );
    }
    console.log(buff.join(""));
  }
}

const dots = foldInstrs.reduce(
  (currentDots, instr) => fold(currentDots, instr),
  initialDots
);
const { w, h } = dots.reduce(
  ({ w, h }, dot) => ({
    w: dot.x + 1 > w ? dot.x + 1 : w,
    h: dot.y + 1 > h ? dot.y + 1 : h,
  }),
  { w: 0, h: 0 }
);

console.log("Result:");
print(dots, w, h);
