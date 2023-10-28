🇺🇸 [Click here](./README.md) to read the English version

# donsaude-technical-challenge

Desafio técnico da DonSaúde

## Configuração
Essa seção contém instruções sobre como rodar este projeto.

### Rodando com o Docker
#### Requisitos
- Node.js
- npm
- Docker
- Docker Compose

#### Passo-a-passo
1. Acessar a pasta do backend (`donsaude-technical-challenge/backend`)
2. Instalar os pacotes com `npm ci`
3. Gerar a tipagem do Prisma com `npx prisma generate`
4. Compilar o código com `npm run build`
5. Ir para a pasta do frontend (`donsaude-technical-challenge/frontend`)
6. Instalar os pacotes novamente com `npm ci`
7. Voltar para a pasta raíz do projeto (`donsaude-technical-challenge`)
8. Subir os contâineres com `docker compose up` (ou `docker-compose up` pra alguns casos)
9. Esperar até que o endereço do host do frontend seja exibido no console (provavelmente `http://localhost:5173`)
10. Acessar esse endereço pelo navegador

### Rodando sem o Docker
#### Requisitos
- Node.js
- npm
- Uma instância ativa do PostgreSQL

#### Passo-a-passo
1. Acessar a pasta do backend (`donsaude-technical-challenge/backend`)
2. Instalar os pacotes com `npm ci`
3. Gerar a tipagem do Prisma com `npx prisma generate`
4. Criar um arquivo `.env` na pasta do backend (veja as variáveis de ambiente abaixo)
5. Rodar as migrations do Prisma com `npx prisma migrate deploy`
6. Compilar o código com `npm run build`
7. Iniciar o servidor com `npm run start`
8. Abrir um novo terminar e ir para a pasta do frontend (`donsaude-technical-challenge/frontend`)
9. Instalar os pacotes novamente com `npm ci`
10. Rodar o cliente com `npm run dev`
11. Esperar até que o endereço do host do frontend seja exibido no console (provavelmente `http://localhost:5173`)
12. Acessar esse endereço pelo navegador

## Backend
[Clique aqui](./backend/README_pt-br.md) para ler o README especificamente sobre o backend.

## Frontend
[Clique aqui](./frontend/README_pt-br.md) para ler o README especificamente sobre o frontend.

## Licença
[MIT](./LICENSE)
