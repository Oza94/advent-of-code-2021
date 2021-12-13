const [dotData, foldData] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n\n");

const dots = dotData
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
console.log("Result:", fold(dots, foldInstrs[0]).length);
