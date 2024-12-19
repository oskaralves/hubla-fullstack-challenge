# Build Stage
FROM node:18 AS builder

WORKDIR /app

# Copiar os arquivos necessários para instalação
COPY ./package.json ./yarn.lock ./

# Copiar apenas os arquivos do backend

COPY ./packages/shared ./packages/shared
COPY ./apps/hubla-backend/package*.json ./apps/hubla-backend/
COPY ./apps/hubla-backend/prisma ./apps/hubla-backend/prisma
COPY ./apps/hubla-backend/tsconfig*.json ./apps/hubla-backend/
COPY ./apps/hubla-backend/src ./apps/hubla-backend/src
COPY ./apps/hubla-backend/.env ./apps/hubla-backend/.env

# Instalar as dependências
RUN yarn install

# Gerar o Prisma Client
WORKDIR /app/apps/hubla-backend
RUN yarn prisma generate

# Build do backend
RUN yarn build

# Production Stage
FROM node:18

WORKDIR /app

# Copiar os arquivos necessários para produção
COPY --from=builder /app/apps/hubla-backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/hubla-backend/package*.json ./

EXPOSE 3001
CMD ["yarn", "start:prod"]
