FROM node:20-slim AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app

# Use a specific Node.js version
FROM base AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ./src ./src

COPY ./tsconfig.json ./

RUN pnpm build

# Production stage
FROM base

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --production --frozen-lockfile

EXPOSE 3000

CMD ["node", "./dist/main.js"]
