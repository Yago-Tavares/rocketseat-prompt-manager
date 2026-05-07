# Rocketseat Prompt Manager

Aplicacao Next.js para gerenciar prompts.

## Requisitos

- Node.js
- npm
- Docker e Docker Compose

## Configuracao inicial

Antes de rodar o projeto pela primeira vez, prepare o banco e o Prisma seguindo os passos abaixo.

### 1. Instale as dependencias

```bash
npm install
```

### 2. Suba o banco com Docker Compose

```bash
docker compose up -d
```

Esse comando sobe um PostgreSQL local com as credenciais definidas em `docker-compose.yml`.

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e configure a variavel `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/rocketseat-prompt-manager"
```

### 4. Gere o Prisma Client

```bash
npm run db:generate
```

### 5. Rode as migrations

```bash
npm run db:migrate
```

### 6. Rode o seed

```bash
npm run db:seed
```

Depois desses passos, o projeto esta pronto para rodar normalmente.

## Rodando o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts uteis

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
