FROM node:16.14.0-alpine3.15 AS build
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn prisma generate
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn build

FROM node:16.14.0-bullseye-slim AS runtime
RUN apt-get update -y && apt-get upgrade -y && apt-get install dumb-init -y
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --production=true
COPY ./prisma ./prisma
COPY --from=build /app/dist ./dist/
COPY --from=build /app/node_modules/.prisma/client ./node_modules/.prisma/client/
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
ENV PATH /app/node_modules/.bin:$PATH
CMD yarn start
