#!/usr/bin/env bash

mongo --port 27017 <<EOF
  use use clone-of-facebook-and-twitter
  db.dropDatabase()
  db.createCollection('posts')
  print('posts collection created')
EOF
