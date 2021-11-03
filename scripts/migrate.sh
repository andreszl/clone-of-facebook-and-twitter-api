#!/usr/bin/env bash

mongo --port 27017 <<EOF
  use base_project
  db.dropDatabase()
  db.createCollection('posts')
  print('posts collection created')
EOF
