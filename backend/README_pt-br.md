# donsaude-technical-challenge - Backend (PT-BR)

Essa pasta contém o código backend do desafio.

## Configuração
Essa seção contém instruções sobre como rodar o backend.

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
4. Voltar para a pasta raíz do projeto (`donsaude-technical-challenge`)
5. Subir os contâineres com `docker compose up` (ou `docker-compose up` pra alguns casos)
6. Esperar até que o endereço do host seja exibido no console

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

## Documentação
A documentação da API pode ser lida [clicando aqui](./DOCS_pt-br.md).

## Testando
Essa seção explica como rodar os testes.

### Requisitos
- Node.js
- npm

### Passo-a-passo
1. Acesse a pasta do backend (`donsaude-technical-challenge/backend`)
2. Instale os pacotes com `npm ci`
3. Rode os testes com `npm test`

É isso. Já que todos os testes desse projeto são testes unitários, não há necessidade de ter um banco de dados rodando.

## Sobre decisões
Nessa seção, eu vou falar mais sobre algumas decisões feitas durante o desenvolvimento do projeto.

### Arquitetura
Escolhi adotar alguns conceitos de Clean Architecture e Domain-Driven Design para desenvolver o lado backend, porque acredito que isso demonstre minha capacidade de desenvolver sistemas complexos, mas escaláveis, em um curto período de tempo. Apesar disso, tenho ciência de que essa arquitetura não seria ideal para sistemas mais simples, mas mesmo assim a escolhi para mostrar minhas habilidades e também desafiar a mim mesmo.

### Tecnologias
Essas são as tecnologias utilizadas e seus motivos:

- TypeScript (Segurança de tipagem e facilidade em aplicar inversão/injeção de dependências)
- Express (Um roteador de APIs bem-estabelecido)
- Prisma (Segurança de tipagem no acesso ao banco de dados e geração automática de migrations)
- Zod (Validador pensado para o TypeScript que pode ser reutilizado no frontend)
- Eslint (Manutenção e padronização da base de código)
- Jest (Garantia de qualidade e prevenção de bugs)
- Docker (Fácil configuração do ambiente)

## O ChatGPT escreveu esse arquivo?

Não, ele não escreveu. Além de programar, uma das minhas paixões é a escrita. Admito que meu inglês não é perfeito e que minha escrita parece muito formal ou robótica, mas é assim mesmo que eu escrevo de um jeito formal. O máximo que eu fiz foi utilizar ele e o Google Translator para me ajudar na correção da versão em inglês, mas a versão em português foi 100% escrita por mim.
