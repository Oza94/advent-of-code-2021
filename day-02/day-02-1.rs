use std::fs;

fn main() {
  let contents = fs::read_to_string("day-02/input").expect("Input not found");

  // Forward, depth
  let mut status = (0, 0);

  for line in contents.split("\n") {
    let toks: Vec<&str> = line.split(" ").collect();

    if toks.len() != 2 { continue; }

    let v = toks[1].parse::<i32>().expect("Line value should be an int");

    match toks[0] {
      "forward" => {
        status.0 += v;
      }
      "up" => {
        status.1 -= v;
      }
      "down" => {
        status.1 += v;
      }
      _ => {}
    }
  }

  println!("Result: {}", status.0 * status.1);
}
