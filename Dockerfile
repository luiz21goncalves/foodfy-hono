FROM oven/bun:1.1.15-alpine as base
WORKDIR /usr/src/app

FROM base AS dependencies
RUN mkdir -p /temp/dev && mkdir -p /temp/prod
WORKDIR /temp/dev
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
WORKDIR /temp/prod
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

FROM base AS builder
COPY --from=dependencies /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM base AS release
COPY --from=dependencies /temp/prod/node_modules node_modules
COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/package.json .
USER bun
ENTRYPOINT [ "bun", "run", "dist/server.js" ]
