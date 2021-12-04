const data = require("fs").readFileSync(
  require("path").resolve(__dirname, "./input"),
  "utf-8"
);

function array(size) {
  return new Array(size).fill(0);
}

function mark(bingo, r) {
  const i = bingo.numbers.indexOf(r);

  if (i === -1) {
    return false;
  }

  bingo.marked[i] = 1;
  const x = i % 5;
  const y = (i / 5) | 0;
  bingo.rowsum[y] += 1;
  bingo.colsum[x] += 1;

  return bingo.rowsum[y] === 5 || bingo.colsum[x] === 5;
}

function winner(bingos, randoms) {
  for (r of randoms) {
    for (b of bingos) {
      if (mark(b, r)) {
        return [b, r];
      }
    }
  }
}

function unmarkedSum(bingo) {
  return bingo.marked.reduce(
    (sum, m, i) => (!m ? sum + bingo.numbers[i] : sum),
    0
  );
}

const bingos = data
  .split("\n\n")
  .slice(1)
  .map((bingoData) =>
    bingoData
      .split("\n")
      .map((line) =>
        line
          .trim()
          .split(/\s+/)
          .map((s) => parseInt(s, 10))
      )
      .reduce((numbers, line) => numbers.concat(line), [])
  )
  .reduce(
    (bingos, numbers) => [
      ...bingos,
      {
        numbers,
        marked: array(25),
        rowsum: array(5),
        colsum: array(5),
      },
    ],
    []
  );

const randoms = data
  .split("\n\n")[0]
  .split(",")
  .map((r) => parseInt(r, 10));

const [winnerBoard, lastRand] = winner(bingos, randoms);

console.log("Result:", unmarkedSum(winnerBoard) * lastRand);
