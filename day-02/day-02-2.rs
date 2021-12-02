use std::fs;

fn main() {
  let contents = fs::read_to_string("day-02/input").expect("Input not found");

  // Aim, forward, depth
  let mut status = (0, 0, 0);

  for line in contents.split("\n") {
    let toks: Vec<&str> = line.split(" ").collect();

    if toks.len() != 2 { continue; }

    let v = toks[1].parse::<i32>().expect("Line value should be an int");
    
    match toks[0] {
      "forward" => {
        status.1 += v;
        status.2 += v * status.0;
      }
      "up" => {
        status.0 -= v;
      }
      "down" => {
        status.0 += v;
      }
      _ => {}
    }
  }

  println!("Result: {}", status.1 * status.2);
}
