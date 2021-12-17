const [minx, maxx, maxy, miny] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .match(/-?[0-9]+/g)
  .map(Number);

function tn(n) {
  return (n * n + n) / 2;
}

function hit(vx, vy) {
  const len = Math.max(Math.abs(maxy) * vy, maxx * vx);
  for (let i = 0, x = 0, y = 0, hy = 0; i < len; i++) {
    x += vx;
    y += vy;
    vx = Math.max(vx - 1, 0);
    vy -= 1;
    hy = Math.max(hy, y);
    if (x > maxx || y < maxy) {
      return { hit: false, hy };
    } else if (x >= minx && y <= miny && x <= maxx && y >= maxy) {
      return { hit: true, hy };
    }
  }
  return { hit: false };
}

function highestY() {
  const leny = tn(Math.abs(maxy));
  const lenx = maxx;

  let hy = 0;
  for (let vy = 0; vy < leny; vy++) {
    let hasReached = false;
    for (let vx = 0; vx < lenx; vx++) {
      const res = hit(vx, vy);
      if (res.hit) {
        hy = Math.max(hy, res.hy);
      }
    }
  }
  return hy;
}

console.log("Result:", highestY());
