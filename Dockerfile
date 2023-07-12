# More Help from https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
FROM node:18-alpine

LABEL maintener = Stephane Segning <segning.lambou@bayamsell.com>

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY ./dist ./dist
COPY ./package.json yarn.lock ./

RUN yarn --production --non-interactive --silent

EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod"]
