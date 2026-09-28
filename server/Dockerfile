FROM node:22-alpine AS builder

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma7.config.ts ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY tsconfig*.json nest-cli.json ./
COPY src ./src

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/prisma7.config.ts ./

RUN npx prisma generate && chown -R node:node /usr/src/app

USER node

EXPOSE 4000