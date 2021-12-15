#!/bin/sh

for d in */ ; do
  [ -z "$sep" ] && sep="true" || echo "\n---------------------\n";
  echo "Advent of code day #${d//[^0-9.]/}"
  [ -f "$d/1.js" ] && echo "\nChallenge 1" && time node "$d/1"
  [ -f "$d/2.js" ] && echo "\nChallenge 2" && time node "$d/2"
done
