# Etapa de build
FROM node:18 AS builder

WORKDIR /app

# Copiar os arquivos necessários para instalação
COPY ./package.json ./yarn.lock ./

# Copiar arquivos do projeto
COPY ./apps/hubla-backend/package*.json ./apps/hubla-backend/
COPY ./apps/hubla-backend/prisma ./apps/hubla-backend/prisma
COPY ./apps/hubla-backend/tsconfig*.json ./apps/hubla-backend/
COPY ./apps/hubla-backend/src ./apps/hubla-backend/src

# Instalar as dependências
RUN yarn install --frozen-lockfile

# Construir o backend app
WORKDIR /app/apps/hubla-backend

# Gerar o Prisma Client
RUN npx prisma generate

# Build do backend
RUN yarn build

# Production Stage
FROM node:18

WORKDIR /app

# Copiar os arquivos necessários para produção
COPY --from=builder /app/apps/hubla-backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/hubla-backend/package*.json ./
COPY --from=builder /app/apps/hubla-backend/prisma ./prisma
COPY --from=builder /app/apps/hubla-backend/tsconfig*.json ./
COPY --from=builder /app/apps/hubla-backend/src ./src

# Instalar apenas `ts-node` no ambiente de produção
RUN yarn add ts-node --dev

# Expor a porta
EXPOSE 3010

# Rodar as migrações, o seed e iniciar o server
CMD ["sh", "-c", "npx prisma migrate deploy && yarn prisma:seed && node dist/src/main"]
