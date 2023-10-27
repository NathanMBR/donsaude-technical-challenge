# donsaude-technical-challenge - Backend (PT-BR)

Essa pasta contém o código backend do desafio.

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
Nessa seção, eu vou falar mais sobre algumas decisões feitas durante o desenvolvimento do backend do projeto.

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
