use std::fs;

fn main() {
  let contents = fs::read_to_string("day-01/input").expect("Input not found");
  let nums: Vec<i32> = contents
    .split("\n")
    .map(|s| s.parse::<i32>().expect("Line should be an int"))
    .collect();

  let (increases, _prev) = nums.iter().skip(1).fold((0, nums[0]), |acc, current| {
    (if current > &acc.1 { acc.0 + 1 } else { acc.0 }, *current)
  });

  println!("Result: {}", increases);
}
