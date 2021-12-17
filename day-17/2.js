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

function count() {
  const leny = tn(Math.abs(maxy));
  const lenx = maxx * 2;
  let c = 0;
  for (let vy = maxy; vy < leny; vy++) {
    for (let vx = 0; vx < lenx; vx++) {
      const res = hit(vx, vy);
      if (res.hit) {
        c += 1;
      }
    }
  }
  return c;
}

console.log("Result:", count());
