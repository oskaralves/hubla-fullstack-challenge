# Hubla - Desafio Programação Full Stack v1.2.0

Este repositório é um monorepo contendo dois projetos principais:

1. **Hubla Backend**: Implementado com NestJS, Prisma e PostgreSQL.
2. **Hubla Frontend**: (Conteúdo a ser desenvolvido).

Abaixo, detalhamos as instruções para executar o ambiente em modo de
desenvolvimento, junto com descrições dos comandos do Prisma e localização da
documentação Swagger.

---

## **Requisitos**

Antes de iniciar, certifique-se de que você tem os seguintes softwares
instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/)

---

## **Executar o Ambiente de Desenvolvimento**

### 1. Subir o ambiente com Docker Compose

Na raiz do monorepo, execute:

```bash
# Subir apenas os serviços necessários para desenvolvimento
yarn docker:dev
```

Este comando utiliza o arquivo `docker-compose.dev.yml` para configurar os
seguintes serviços:

- **PostgreSQL**: Banco de dados na porta `5432`.
- **pgAdmin**: Interface para gerenciar o PostgreSQL, acessível em
  `http://localhost:16543`.
- **Hubla Backend**: API do backend na porta `3001`.

Para encerrar os contêineres:

```bash
yarn docker:down
```

---

## **Backend**

### **Prisma Schema**

O Prisma foi configurado para permitir a separação de schemas em arquivos
diferentes. Aqui está um exemplo da configuração:

#### **schema.prisma**

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["multiSchema", "prismaSchemaFolder"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  schemas  = ["public"]
}
```

#### **transaction.prisma**

```prisma
model Transaction {
    id      String   @id @default(uuid())
    type    Int
    date    DateTime
    product String
    value   Int
    seller  String

    @@map("transaction")
    @@schema("public")
}
```

### **Swagger Documentation**

A documentação da API do backend está disponível em:

```
http://localhost:3010/docs
```

Esta documentação é gerada automaticamente com Swagger e descreve todos os
endpoints da API.

### **Comandos do Prisma**

Os comandos abaixo são usados para gerenciar o banco de dados com Prisma.
Execute-os na raiz do backend:

#### Gerar o Prisma Client

Gera os arquivos necessários para interagir com o banco de dados.

```bash
yarn prisma generate
```

#### Aplicar Migrações

Cria as tabelas e atualiza o banco de dados com base no esquema definido em
`schema.prisma`.

```bash
yarn prisma migrate dev
```

#### Visualizar o Banco de Dados

Abre uma interface de inspeção para visualizar o banco de dados diretamente.

```bash
yarn prisma studio
```

#### Resetar o Banco de Dados

Remove todas as tabelas e recria o banco de dados com base no esquema.

```bash
yarn prisma migrate reset
```

---

## **Frontend**

> **Nota:** @todo: Documentar projeto frontend.

---

## **Estrutura do Repositório**

```
hubla-projects/
├── apps/
│   ├── hubla-backend/     # Backend do projeto
│   └── hubla-frontend/    # Frontend do projeto
├── packages/
│   └── shared/            # Pacote compartilhado
├── docker-compose.dev.yml # Configuração do Docker para desenvolvimento
├── docker-compose.yml     # Configuração do Docker para produção
├── package.json           # Configuração do monorepo
├── yarn.lock              # Dependências do projeto
└── README.md              # Este arquivo
```

---

# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs`
  applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next`
  and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as
[Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to
share cache artifacts across machines, enabling you to share build caches with
your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need
an account with Vercel. If you don't have an account you can
[create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your
[Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following
command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
