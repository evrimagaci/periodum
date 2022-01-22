ARG NODEJS_VERSION=latest
FROM node:$NODEJS_VERSION as app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

RUN echo "NODE_ENV => $NODE_ENV"

ARG YARN_PRODUCTION=false
ENV YARN_PRODUCTION=$YARN_PRODUCTION

RUN echo "YARN_PRODUCTION => $YARN_PRODUCTION"

WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production=$YARN_PRODUCTION
COPY . .

RUN chown -R nobody: /usr/src/app
USER nobody

CMD yarn run generate && yarn run dev

EXPOSE 3000
