use std::fs;

fn main() {
  let contents = fs::read_to_string("day-01/input").expect("Input not found");
  let nums: Vec<i32> = contents
    .split("\n")
    .map(|s| s.parse::<i32>().expect("Line should be an int"))
    .collect();

  let mut tmw: Vec<i32> = Vec::new();
  for i in 2..nums.len() {
    tmw.push(nums[i - 2] + nums[i - 1] + nums[i]);
  }

  let (increases, _prev) = tmw.iter().skip(1).fold((0, nums[0]), |acc, current| {
    (if current > &acc.1 { acc.0 + 1 } else { acc.0 }, *current)
  });

  println!("Result: {}", increases);
}
