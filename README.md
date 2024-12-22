# Hubla - Desafio Programação Full Stack v1.2.0

Este repositório é um monorepo que contém dois projetos principais, projetados
para oferecer uma solução completa e robusta:

1. **Hubla Backend:** Uma poderosa API desenvolvida com NestJS, Prisma, e
   PostgreSQL, proporcionando uma arquitetura escalável, modular e segura para
   gerenciar transações e dados essenciais.

2. **Hubla Frontend:** Uma interface moderna e dinâmica construída com React,
   Next.js, Tailwind CSS, e Shadcn UI, focada em responsividade, acessibilidade
   e experiência do usuário.

Este documento detalha as instruções para configurar e executar o ambiente tanto
em modo de desenvolvimento quanto em modo de produção, além de fornecer
descrições sobre comandos essenciais do Prisma e o acesso à documentação Swagger
para facilitar a integração e uso da API.

## **Tecnologias Utilizadas**

### Backend

| Logo                                                                                                                                                         | Nome       | Descrição                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ----------------------------------------- |
| <img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="NestJS" width="56" height="56">        | Node.js    | Framework para criação de APIs robustas   |
| <img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/519bfaf3-c242-431e-a269-876979f05574" alt="NestJS" width="56" height="56"> | Nest.js    | Framework para criação de APIs robustas   |
| <img src="https://img.icons8.com/?size=512&id=zJh5Gyrd6ZKu&format=png" alt="Prisma" width="56" height="56">                                                  | Prisma     | ORM para gerenciamento de banco de dados  |
| <img src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" width="56" height="56">    | PostgreSQL | Banco de dados relacional                 |
| <img src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" width="56" height="56">          | Jest       | Bilbioteca para testes                    |
| <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" width="56" height="56">        | Docker     | Contêineres para desenvolvimento e deploy |

---

### Frontend

| Logo                                                                                                                                                          | Nome         | Descrição                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------- |
| <img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" width="56" height="56"> | Next.js      | Framework para SSR e SSG                  |
| <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" width="56" height="56">          | React        | Biblioteca para construção de interfaces  |
| <img src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" width="56" height="56">   | Tailwind CSS | Framework de estilização utilitária       |
| <img src="https://github.com/user-attachments/assets/e4bd419a-2a4a-459a-ba9a-d3324e693c4d" alt="Shadcn UI" width="56" height="56">                            | Shadcn UI    | Componentes de UI modernos                |
| <img src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" width="56" height="56">           | Jest         | Bilbioteca para testes                    |
| <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" width="56" height="56">         | Docker       | Contêineres para desenvolvimento e deploy |

---

## **Requisitos**

Antes de iniciar, certifique-se de que você tem os seguintes softwares
instalados:

| Logo                                                                                                                                                          | Nome           | Link                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" width="56" height="56">         | Docker         | [Instalar Docker](https://www.docker.com/)                      |
| <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker Compose" width="56" height="56"> | Docker Compose | [Instalar Docker Compose](https://docs.docker.com/compose/)     |
| <img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" width="56" height="56">        | Node.js        | [Instalar Node.js](https://nodejs.org/) (versão 18 ou superior) |
| <img src="https://user-images.githubusercontent.com/25181517/183049794-a3dfaddd-22ee-4ffe-b0b4-549ccd4879f9.png" alt="Yarn" width="56" height="56">           | Yarn           | [Instalar Yarn](https://yarnpkg.com/)                           |
| <img src="https://user-images.githubusercontent.com/4060187/196936104-5797972c-ab10-4834-bd61-0d1e5f442c9c.png" alt="Yarn" width="56" height="56">            | Turborepo      | [Instalar Turborepo](https://turbo.build/)                      |

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

Para encerrar os contêineres:

```bash
yarn docker:down
```

---

## **Estrutura do Repositório**

```
hubla-projects/
├── apps/
│   ├── hubla-backend/     # Backend App
│   └── hubla-frontend/    # Frontend App
├── docker-compose.dev.yml # Configuração do Docker para desenvolvimento
├── docker-compose.yml     # Configuração do Docker para produção
├── package.json           # Configuração do monorepo
├── yarn.lock              # Dependências do projeto
└── README.md              # Este arquivo
```

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
    id              String          @id @default(uuid())
    type            Int
    date            DateTime
    product         String
    value           Int
    seller          String
    transactionType TransactionType @relation(fields: [type], references: [id])

    @@map("transactions")
    @@schema("public")
}
```

#### **transaction_type.prisma**

```prisma
model TransactionType {
    id           Int                   @id @default(autoincrement())
    description  String                @unique
    nature       TransactionNatureEnum
    transactions Transaction[]

    @@map("transaction_types")
    @@schema("public")
}

enum TransactionNatureEnum {
    INPUT // Entrada
    OUTPUT // Saída

    @@schema("public")
}
```

### **Swagger Documentation**

A documentação da API do backend está disponível em:

```
http://localhost:3010/docs
```

Esta documentação é gerada automaticamente com Swagger e descreve todos os
endpoints, models, payload da API.

### **Comandos do Prisma**

Os comandos abaixo são usados para gerenciar o banco de dados com Prisma.
Execute-os na raiz do backend (apps/hubla-backend):

#### Gerar o Prisma Client

Gera os arquivos necessários para interagir com o banco de dados.

```bash
npx prisma generate
```

#### Aplicar Migrações

Cria as tabelas e atualiza o banco de dados com base no esquema definido em
`schema.prisma`.

```bash
npx prisma migrate dev
```

#### Visualizar o Banco de Dados

Abre uma interface na porta http://localhost:5555 de inspeção para visualizar e
gerencia o banco de dados diretamente.

```bash
npx prisma studio
```

#### Alimentar o Banco de Dados com dados do seed

Na pasta prisma/seed/ do backend foi configurado para alimentar as tipos de
transações.

```bash
yarn prisma:seed
```

#### Resetar o Banco de Dados

Remove todas as tabelas e recria o banco de dados com base no esquema.

```bash
npx prisma migrate reset
```

---

## **Frontend**

O frontend do Hubla foi implementado utilizando o framework Next.js com suporte
a SSR (Server-Side Rendering) e Client Components. Abaixo estão os detalhes das
principais funcionalidades e configurações:

---

### **SSR e Client Components**

O projeto utiliza a abordagem de Server Components combinada com Client
Components para otimizar a performance e manter a interatividade. As páginas
utilizam os diretórios padrão do App Router (`app/`) e fazem uso de hooks como
`use client` para componentes interativos.

---

### **Formulários e Actions**

- **Validação com Zod:** A validação dos formulários é feita com o Zod,
  utilizando schemas reutilizáveis para consistência de validação.
- **Actions (use server):** As ações do formulário são organizadas em funções
  declaradas como `use server` para lidar com processamento no lado do servidor.
- **Integração com UI:** Os formulários são construídos com componentes
  reutilizáveis fornecidos pela biblioteca Shadcn UI, garantindo acessibilidade
  e um design consistente.

---

### **Dicionários Multilíngues**

Implementado suporte para os idiomas pt-BR e en-US. Os dicionários utilizam
arquivos JSON organizados por contexto, com um hook para acessá-los
dinamicamente com base na seleção do idioma. Foi criado uma estrutura para que
ao existir chave/valor no arquivo json, o typescript identifique o novo campo,
facilitando o uso e evitando erros de digitação.

> NOTA: No topo do projeto há um botão ícone onde é possivel fazer a troca do
> idioma.

Exemplo de configuração:

```json
// /dictionaries/pt-BR/general.json
{
  "SUBMIT": "Enviar",
  "CANCEL": "Cancelar"
}

//  /dictionaries/en-US/general.json
{
  "SUBMIT": "Submit",
  "CANCEL": "Cancel"
}
```

### **Configuração de Temas (Light/Dark)**

O tema é gerenciado e integrado ao sistema do Next.js para persistência. O tema
escolhido é salvo no cache para ser acessado tanto no servidor quanto no
cliente.

### **Menu Expandido e Persistência**

- A configuração de expansão do menu e o idioma selecionado são persistidos em
  cache (via cookies) para que possam ser acessados em SSR e CSR.
- Isso melhora a experiência do usuário, mantendo as preferências entre sessões.

### **Componentes Assíncronos com Suspense**

Componentes assíncronos utilizam <Suspense> para melhorar a experiência de
carregamento. Exemplo de uso:

```tsx
import { Suspense } from "react";
import { AsyncComponent } from "@/components/async-component";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <ComponentSkeleton />
        </div>
      }
    >
      <AsyncComponent />
    </Suspense>
  );
}
```

### **Configuração de APIs**

- A comunicação com APIs é organizada utilizando o Fetch com wrappers para
  melhorar a reutilização e gerenciar erros.
- Todas as chamadas são configuradas para funcionar no lado do cliente ou
  servidor, conforme necessário.

### **Estrutura do Repositório (Frontend)**

```
hubla-frontend/
└── src/
    ├── actions/                 # Ações executadas no cliente e servidor (server actions)
    ├── app/                     # Diretório principal das rotas e páginas do Next.js
    │   ├── _components/         # Componentes personalizados reutilizáveis nas páginas
    │   ├── _skeletons/          # Componentes para estados de carregamento (loading, pending)
    │   ├── api/                 # Configuração dos endpoints para **executar** ações no servidor do frontend
    │   └── transactions/        # Rotas e páginas relacionadas às transações (app route)
    ├── components/              # Componentes compartilhados e reutilizáveis (UI)
    ├── constants/               # Definições de constantes globais
    ├── contexts/                # Contextos para gerenciar estados globais (ex.: idioma, tema)
    ├── dictionaries/            # Arquivos de tradução (dicionários) em `pt-BR` e `en-US`
    ├── hooks/                   # Hooks personalizados para lógica reutilizável
    ├── lib/                     # Funções auxiliares e configuração de bibliotecas
    ├── navigation/              # Gerenciamento e definição de rotas de navegação
    ├── schemas/                 # Schemas de validação com `zod`
    ├── theme/                   # Configuração de temas (dark e light)
    ├── types/                   # Definições de tipos globais e interfaces TypeScript
    └── utils/                   # Funções utilitárias gerais

```

### **Descrição das pastas:**

#### actions/

- Contém funções de servidor e cliente para interações, como server actions.

#### app/

- Estrutura principal das rotas e páginas do Next.js 13+ (App Router).
  - **\_components/:** Componentes específicos para uma página ou recurso.
  - **\_skeletons/:** Esqueletos para exibir estados de carregamento.
  - **api/:** Endpoints internos do frontend.
  - **transactions/:** Páginas (rotas) das transações.

#### components/

- Componentes reutilizáveis e comuns, como botões, modais, tabelas, etc.

#### constants/

- Contém definições de constantes como valores fixos, chaves, URLs, etc.

#### contexts/

- Gerencia estados globais com React Context API, como idioma e tema.

#### dictionaries/

- Contém arquivos de tradução para pt-BR e en-US. hooks/ Hooks personalizados
  para lógica reutilizável, como useTheme ou useLanguage.

#### lib/

- Configurações e funções auxiliares relacionadas a bibliotecas usadas, como
  axios, zod, etc.

#### navigation/

- Gerencia rotas e URLs de navegação, incluindo helpers para links dinâmicos.

#### schemas/

- Schemas de validação de dados com zod.

#### theme/

- Configuração e lógica para gerenciar temas claros e escuros.

### types/

- Tipos TypeScript globais e interfaces usadas em todo o projeto.

### utils/

- Funções utilitárias gerais, como formatadores, manipuladores de strings, etc.

Essa estrutura é bem organizada e segue boas práticas para projetos modernos com
Next.js e TypeScript.
