const data = require("fs")
  .readFileSync(require("path").resolve(__dirname, "./input"), "utf-8")
  .split("\n\n")
  .map((r) => ({
    beacons: r
      .split("\n")
      .slice(1)
      .map((p) => p.split(",").map(Number)),
    pos: null,
    proj: null,
  }));
data[0].pos = [0, 0, 0];

const projections = [
  // +x
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, -1, 0],
  [1, 0, 0, 0, -1, 0, 0, 0, -1],
  [1, 0, 0, 0, 0, -1, 0, 1, 0],
  // -x
  [-1, 0, 0, 0, -1, 0, 0, 0, 1],
  [-1, 0, 0, 0, 0, 1, 0, 1, 0],
  [-1, 0, 0, 0, 1, 0, 0, 0, -1],
  [-1, 0, 0, 0, 0, -1, 0, -1, 0],
  // +y
  [0, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 0, -1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, -1, -1, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, -1],
  // -y
  [0, -1, 0, 0, 0, -1, 1, 0, 0],
  [0, -1, 0, 1, 0, 0, 0, 0, 1],
  [0, -1, 0, 0, 0, 1, -1, 0, 0],
  [0, -1, 0, -1, 0, 0, 0, 0, -1],
  // +z
  [0, 0, 1, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, -1, 0, 1, 0, 0],
  [0, 0, 1, -1, 0, 0, 0, -1, 0],
  [0, 0, 1, 0, 1, 0, -1, 0, 0],
  // -z
  [0, 0, -1, -1, 0, 0, 0, 1, 0],
  [0, 0, -1, 0, 1, 0, 1, 0, 0],
  [0, 0, -1, 1, 0, 0, 0, -1, 0],
  [0, 0, -1, 0, -1, 0, -1, 0, 0],
];

function sortPoints(a, b) {
  return a[0] !== b[0]
    ? a[0] - b[0]
    : a[1] !== b[1]
    ? a[1] - b[1]
    : a[2] - b[2];
}

function v3eq(va, vb) {
  return va[0] === vb[0] && va[1] === vb[1] && va[2] === vb[2];
}

function v3sub(va, vb) {
  return [va[0] - vb[0], va[1] - vb[1], va[2] - vb[2]];
}

function v3add(va, vb) {
  return [va[0] + vb[0], va[1] + vb[1], va[2] + vb[2]];
}

function v3mul(va, vb) {
  return [va[0] * vb[0], va[1] * vb[1], va[2] * vb[2]];
}

function v3diff(va, vb) {
  return sub(va, vb).join(",");
}

function m33v3mul(m33, v3) {
  return [
    m33[0] * v3[0] + m33[1] * v3[1] + m33[2] * v3[2],
    m33[3] * v3[0] + m33[4] * v3[1] + m33[5] * v3[2],
    m33[6] * v3[0] + m33[7] * v3[1] + m33[8] * v3[2],
  ];
}

function v3magnitude(m) {
  return m[0] * m[0] + m[1] * m[1] + m[2] * m[2];
}

function overlap(scan1, scan2) {
  for (proj of projections) {
    const len = Math.min(scan1.beacons.length, scan2.beacons.length);
    const sb1 = scan1.beacons;
    const sb2 = scan2.beacons.map((point) => m33v3mul(proj, point));
    const magnitudes = {};
    for (let j = 0; j < scan1.beacons.length; j++) {
      for (let i = 0; i < scan2.beacons.length; i++) {
        const b1 = sb1[(i + j) % scan1.beacons.length];
        const b2 = sb2[i];
        const offset = v3sub(b1, b2);
        const m = v3magnitude(offset);
        if (!magnitudes[m]) {
          magnitudes[m] = {
            count: 0,
            offset,
          };
        }
        magnitudes[m].count += 1;
      }
    }

    const max = Object.values(magnitudes).find((m) => m.count > 11);

    if (max) {
      return { hit: true, ...max, proj };
    }
  }
  return { hit: false };
}

function countBeacons(scanners) {
  const ok = [
    {
      ...scanners[0],
      proj: projections[0],
      projs: [],
      pos: [0, 0, 0],
    },
  ];
  const remaining = scanners.slice(1);

  do {
    for (let i = 0; i < remaining.length; i++) {
      const scanner = remaining[i];

      for (let j = 0; j < ok.length; j++) {
        const origin = ok[j];
        const result = overlap(origin, scanner);

        if (result.hit) {
          remaining.splice(i--, 1);

          const projs = [origin.proj, ...origin.projs];
          const relativePos = projs.reduce(
            (pos, proj) => m33v3mul(proj, pos),
            result.offset
          );
          ok.push({
            ...scanner,
            pos: v3add(origin.pos, relativePos),
            proj: result.proj,
            inverse: result.inverse,
            projs,
            origin,
          });
          break;
        }
      }
    }
  } while (remaining.length);

  const beacons = [];

  let dist = 0;
  for (let i = 0; i < ok.length; i++) {
    const oki = ok[i];
    for (let j = 0; j < ok.length; j++) {
      const okj = ok[j];
      dist = Math.max(
        dist,
        v3sub(oki.pos, okj.pos).reduce((sum, cur) => sum + cur, 0)
      );
    }
  }

  return dist;
}

console.log("Result:", countBeacons(data));
