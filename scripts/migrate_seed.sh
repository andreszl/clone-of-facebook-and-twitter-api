#!/usr/bin/env bash
mongo --port 27017 <<EOF
  use clone-of-facebook-and-twitter
  db.dropDatabase()
  db.createCollection('posts')
  print('posts collection created')
EOF

#generate files
npx ts-node database/seeders/posts.seed.ts

#import files
mongoimport --port 27017 --db clone-of-facebook-and-twitter --collection places --file database/seeders/data/places.seed.json --jsonArray