#!/bin/sh

for d in */ ; do
  [ -z "$sep" ] && sep="true" || echo "\n---------------------\n";
  echo "Advent of code #${d//[^0-9.]/}"
  node "$d"
done
