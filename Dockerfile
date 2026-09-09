FROM node:20-alpine AS base
WORKDIR /app
RUN apk update && apk upgrade --no-cache && corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_CUBE_API_URL
ARG NEXT_PUBLIC_CUBE_API_TOKEN
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_CUBE_API_URL=$NEXT_PUBLIC_CUBE_API_URL
ENV NEXT_PUBLIC_CUBE_API_TOKEN=$NEXT_PUBLIC_CUBE_API_TOKEN
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start", "--", "-H", "0.0.0.0"]