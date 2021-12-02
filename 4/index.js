const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");

const { depth, forward } = data.split("\n").reduce(
  (status, line) => {
    const [move, amountStr] = line.split(" ");
    const amount = parseInt(amountStr);

    switch (move) {
      case "forward":
        status.forward += amount;
        status.depth += amount * status.aim;
        break;
      case "up":
        status.aim -= amount;
        break;
      case "down":
        status.aim += amount;
        break;
    }
    return status;
  },
  { depth: 0, forward: 0, aim: 0 }
);

console.log("Result:", depth * forward);
