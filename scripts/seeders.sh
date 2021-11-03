#!/usr/bin/env bash


#generate files
npx ts-node database/seeders/posts.seed.ts &&

#import files
mongoimport --port 27017 --db clone-of-facebook-and-twitter --collection posts --file database/seeders/data/posts.seed.json --jsonArray