# Our first stage, that is the Builder
FROM node:16-alpine3.14 as development
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/src/app
COPY --chown=node:node package*.json /usr/src/app
RUN apk add dumb-init
ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; \
        then npm ci --also=dev; \
        else npm ci --only=production; \
        fi
COPY --chown=node:node . /usr/src/app

USER node
CMD ["dumb-init","node", "index.js"]




