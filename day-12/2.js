const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n");

const lowcaves = [];

function testLowcave(str) {
  if (
    str !== "start" &&
    str !== "end" &&
    !lowcaves.includes(str) &&
    /^[a-z]+$/.test(str)
  ) {
    lowcaves.push(str);
  }
}

const graph = data.reduce((acc, segment) => {
  const [a, b] = segment.split("-");
  testLowcave(a);
  testLowcave(b);
  return {
    ...acc,
    [a]: acc[a] ? [...acc[a], b] : [b],
    [b]: acc[b] ? [...acc[b], a] : [a],
  };
}, {});

let paths = [[false, "start"]];
const completePaths = [];

do {
  const nextPaths = [];
  for (let p = 0; p < paths.length; p++) {
    const path = paths[p];
    const cave = path[path.length - 1];
    for (let i = 0; i < graph[cave].length; i++) {
      const nextCave = graph[cave][i];
      const isLowcave = lowcaves.includes(nextCave);
      const hasLowcave = isLowcave && path.includes(nextCave);
      const nextPath = [...path, nextCave];
      if ((hasLowcave && path[0]) || nextCave === "start") {
        continue;
      } else if (nextCave === "end") {
        completePaths.push(nextPath);
      } else {
        if (hasLowcave) {
          nextPath[0] = true;
        }
        paths.push(nextPath);
      }
    }
  }
  paths = nextPaths;
} while (paths.length);

console.log("Result:", completePaths.length);
