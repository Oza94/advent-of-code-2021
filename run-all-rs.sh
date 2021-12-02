#!/bin/sh

for d in */ ; do
  [ -z "$sep" ] && sep="true" || echo "\n---------------------\n";
  echo "Advent of code day #${d//[^0-9.]/}"
  p=$(echo $d | rev | cut -c 2- | rev)
  [ -f "$p/$p-1.rs" ] && echo "\nChallenge 1" && cargo script "$p/$p-1.rs"
  [ -f "$p/$p-2.rs" ] && echo "\nChallenge 2" && cargo script "$p/$p-2.rs"
done
