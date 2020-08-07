FROM node:12-alpine as base
ENV PATH ${PATH}:./node_modules/.bin
WORKDIR /app/code
COPY package.json ./
RUN yarn 
COPY . .
CMD [ "yarn", "start" ]

FROM base as build
WORKDIR /app/code
RUN yarn build

FROM node:12-alpine as prod
ENV NODE_ENV=production
WORKDIR /app/code
COPY --from=base /app/code/package.json /app/code/yarn.lock  ./
RUN yarn --frozen-lockfile
COPY --from=base /app/code/ormconfig.js  ./
COPY --from=build /app/code/build ./build
CMD [ "node", "build/index.js" ]