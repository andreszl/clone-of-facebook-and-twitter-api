FROM node as base

WORKDIR /usr/src/app

COPY package.json ./

ADD package.json /usr/src/app/package.json

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build