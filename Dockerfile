FROM oven/bun:1.1.21-alpine AS base
WORKDIR /usr/src/app

FROM base AS dependencies
RUN mkdir -p /temp/dev && mkdir -p /temp/prod
WORKDIR /temp/dev
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
WORKDIR /temp/prod
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production --ignore-scripts

FROM base AS release
ENV NODE_ENV=production
COPY public /usr/src/app/public
COPY --from=dependencies /temp/prod/node_modules node_modules
COPY . /usr/src/app/
USER bun
ENTRYPOINT [ "bun", "run", "start" ]
