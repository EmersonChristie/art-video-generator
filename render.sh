#!/bin/bash

# A script to render videos with directory of images

# variables
BASE_PATH=$(pwd)/src/static/artImages

for entry in "$BASE_PATH"/*
do
  FILE_NAME=`basename "$entry"`
  OUT_FILE="video-${FILE_NAME%.*}.mp4"

  npx remotion render src/index.tsx ArtVideo $OUT_FILE --props='{"filePath": "'"$FILE_NAME"'"}'

done

# pass file name as prop to render cli command