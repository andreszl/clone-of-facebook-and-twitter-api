FROM node as test

WORKDIR /usr/src/app

COPY package.json ./

ADD package.json /usr/src/app/package.json

RUN npm i

COPY . .

FROM test as production

ENV NODE_PATH=./build

RUN npm run build