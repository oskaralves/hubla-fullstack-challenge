# Etapa de build
FROM node:18 AS builder

WORKDIR /app

# Copiar os arquivos necessários para instalação
COPY ./package.json ./yarn.lock ./

# Copiar apenas os arquivos do frontend
COPY ./apps/hubla-frontend/package*.json ./apps/hubla-frontend/
COPY ./apps/hubla-frontend/public ./apps/hubla-frontend/public
COPY ./apps/hubla-frontend/tsconfig*.json ./apps/hubla-frontend/
COPY ./apps/hubla-frontend/next-auth.d.ts ./apps/hubla-frontend/
COPY ./apps/hubla-frontend/src ./apps/hubla-frontend/src
COPY ./apps/hubla-frontend/tailwind.config.ts ./apps/hubla-frontend/
COPY ./apps/hubla-frontend/postcss.config.mjs ./apps/hubla-frontend/

# Instalar as dependências
RUN yarn install --frozen-lockfile

# Construir o frontend app
WORKDIR /app/apps/hubla-frontend
RUN yarn build

# Production Stage
FROM node:18

WORKDIR /app

# Copiar os arquivos necessários para produção
COPY --from=builder /app/apps/hubla-frontend/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/hubla-frontend/package*.json ./
COPY --from=builder /app/apps/hubla-frontend/public ./public

# Expor a porta
EXPOSE 3000

# Iniciar a aplicação
CMD ["yarn", "start"]
