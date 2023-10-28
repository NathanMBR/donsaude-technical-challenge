# donsaude-technical-challenge - Documentação da API (PT-BR)

Este arquivo contém a documentação da API.

## Entidades
Listagem dos objetos JSON retornados pela API

### Endereço
Descrição sobre a entidade de endereço

#### JSON
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Exemplo de rua",
  "number": "123",
  "neighborhood": "Exemplo de bairro",
  "complement": "Exemplo de complemento",
  "city": "Exemplo de cidade",
  "state": "Exemplo de estado",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

#### Propriedades
- `id` representa o ID desta entidade
- `postalCode` representa o CEP do endereço
- `street` representa a rua do endereço
- `neighborhood` representa o bairro do endereço
- `complement` representa o complemento do endereço `(opcional)`
- `city` representa a cidade do endereço
- `state` representa o estado do endereço
- `createdAt` representa a data de criação desta entidade
- `updatedAt` representa a última data de atualização desta entidade
- `deletedAt` representa a data de deleção desta entidade `(opcional)`

### Parceiro
Descrição sobre a entidade de parceiro

#### JSON
```json
{
  "id": 1,
  "name": "Exemplo de nome",
  "email": "exemplo@email.com",
  "password": "Exemplo de senha",
  "category": "Exemplo de categoria",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Exemplo de Responsável Clínico",
  "financialManagerName": "Exemplo de Responsável Financeiro",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

#### Propriedades
- `id` representa o ID desta entidade
- `name` representa o nome do parceiro
- `email` representa o email do parceiro
- `password` representa a senha do parceiro
- `category` representa a categoria do parceiro
- `cnpj` representa o CNPJ do parceiro
- `phone` representa o número de telefone do parceiro
- `cellphone` representa o número de telefone celular do parceiro
- `clinicalManagerName` representa o nome do responsável clínico do parceiro
- `financialManagerName` representa o nome do responsável financeiro do parceiro
- `addressId` representa o ID de um endereço ao qual este parceiro está associado
- `createdAt` representa a data de criação desta entidade
- `updatedAt` representa a última data de atualização desta entidade
- `deletedAt` representa a data de deleção desta entidade `(opcional)`

## Rotas
Listagem de todas as rotas da API

### Endereço
Listagem de todas as rotas de endereço

#### Criar Endereço
1. Rota:
`POST /api/addresses`

2. Corpo:
```json
{
  "postalCode": "12345678",
  "street": "Exemplo de rua",
  "number": "123",
  "neighborhood": "Exemplo de bairro",
  "complement": "Exemplo de complemento",
  "city": "Exemplo de cidade",
  "state": "Exemplo de estado"
}
```

3. Respostas Possíveis:
- Criado com sucesso (201)
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Exemplo de rua",
  "number": "123",
  "neighborhood": "Exemplo de bairro",
  "complement": "Exemplo de complemento",
  "city": "Exemplo de cidade",
  "state": "Exemplo de estado",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Erro na requisição (400)
```json
{
  "error": "Bad Request",
  "message": "Exemplo de mensagem de erro"
}
```

#### Ler Endereço
1. Rota:
`GET /api/addresses/:id`

2. Parâmetros:
- `id`: O ID do endereço a ser lido

3. Respostas Possíveis:
- Sucesso (200)
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Exemplo de rua",
  "number": "123",
  "neighborhood": "Exemplo de bairro",
  "complement": "Exemplo de complemento",
  "city": "Exemplo de cidade",
  "state": "Exemplo de estado",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Não encontrado (404)
```json
{
  "error": "Not Found",
  "message": "Exemplo de mensagem de erro"
}
```

#### Ler Múltiplos Endereços
1. Rota:
`GET /api/addresses?page=1&quantity=100`

2. Parâmetros
- `page`: A página a ser buscada `(opcional)`
- `quantity`: A quantidade de elementos a serem buscados `(opcional)`

3. Respostas Possíveis:
- Sucesso (200)
```json
{
  "quantityPerPage": 100,
  "total": 1,
  "currentPage": 1,
  "lastPage": 1,
  "data": [
    {
      "id": 1,
      "postalCode": "123.456.789-0",
      "street": "Exemplo de rua",
      "number": "123",
      "neighborhood": "Exemplo de bairro",
      "complement": "Exemplo de complemento",
      "city": "Exemplo de cidade",
      "state": "Exemplo de estado",
      "createdAt": "2023-10-27T21:50:45.190Z",
      "updatedAt": "2023-10-27T21:50:45.190Z",
      "deletedAt": null
    }
  ]
}
```

#### Atualizar Endereço
1. Rota:
`PUT /api/addresses/:id`

2. Parâmetros:
- `id`: O ID do endereço a ser atualizado

3. Corpo:
```json
{
  "postalCode": "12345678",
  "street": "Exemplo de rua atualizada",
  "number": "456",
  "neighborhood": "Exemplo de bairro atualizado",
  "complement": "Exemplo de complemento atualizado",
  "city": "Exemplo de cidade atualizada",
  "state": "Exemplo de estado atualizado"
}
```

4. Respostas Possíveis:
- Sucesso (200)
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Exemplo de rua",
  "number": "123",
  "neighborhood": "Exemplo de bairro",
  "complement": "Exemplo de complemento",
  "city": "Exemplo de cidade",
  "state": "Exemplo de estado",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Erro na requisição (400)
```json
{
  "error": "Bad Request",
  "message": "Exemplo de mensagem de erro"
}
```

- Não encontrado (404)
```json
{
  "error": "Not Found",
  "message": "Exemplo de mensagem de erro"
}
```

#### Remover Endereço
1. Rota:
`PUT /api/addresses/:id`

2. Parâmetros:
- `id`: O ID do endereço a ser removido

3. Respostas Possíveis
- Sucesso, sem retorno (204)

- Erro na requisição (400)
```json
{
  "error": "Bad Request",
  "message": "Exemplo de mensagem de erro"
}
```

- Não encontrado (404)
```json
{
  "error": "Not Found",
  "message": "Exemplo de mensagem de erro"
}
```

### Parceiro
Listagem de todas as rotas de parceiro

#### Criar Parceiro
1. Rota:
`POST /api/partners`

2. Corpo:
```json
{
  "name": "Exemplo de nome",
  "email": "exemplo@email.com",
  "password": "Exemplo de senha",
  "category": "Exemplo de categoria",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Exemplo de Responsável Clínico",
  "financialManagerName": "Exemplo de Responsável Financeiro",
  "addressId": 1
}
```

3. Respostas Possíveis:
- Criado com Sucesso (201)
```json
{
  "id": 1,
  "name": "Exemplo de nome",
  "email": "exemplo@email.com",
  "category": "Exemplo de categoria",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Exemplo de Responsável Clínico",
  "financialManagerName": "Exemplo de Responsável Financeiro",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Erro na requisição (400)
```json
{
  "error": "Bad Request",
  "message": "Exemplo de mensagem de erro"
}
```

- Não encontrado (404)
```json
{
  "error": "Not Found",
  "message": "Exemplo de mensagem de erro"
}
```

#### Ler Parceiro
1. Rota:
`GET /api/partners/:id`

2. Parâmetros:
- `id`: O ID do parceiro a ser lido

3. Respostas Possíveis:
- Sucesso (200)
```json
{
  "id": 1,
  "name": "Exemplo de nome",
  "email": "exemplo@email.com",
  "category": "Exemplo de categoria",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Exemplo de Responsável Clínico",
  "financialManagerName": "Exemplo de Responsável Financeiro",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Não encontrado (404)
```json
{
  "error": "Not Found",
  "message": "Exemplo de mensagem de erro"
}
```

#### Ler Múltiplos Parceiros
1. Rota:
`GET /api/partners?page=1&quantity=100`

2. Parâmetros
- `page`: A página a ser buscada `(opcional)`
- `quantity`: A quantidade de elementos a serem buscados `(opcional)`

3. Respostas Possíveis:
- Sucesso (200)
```json
{
  "quantityPerPage": 100,
  "total": 1,
  "currentPage": 1,
  "lastPage": 1,
  "data": [
    {
      "id": 1,
      "name": "Exemplo de nome",
      "email": "exemplo@email.com",
      "category": "Exemplo de categoria",
      "cnpj": "00.000.000/0000-00",
      "phone": "+55 (11) 9999-9999",
      "cellphone": "+55 (11) 99999-9999",
      "clinicalManagerName": "Exemplo de Responsável Clínico",
      "financialManagerName": "Exemplo de Responsável Financeiro",
      "addressId": 1,
      "createdAt": "2023-10-27T21:50:45.190Z",
      "updatedAt": "2023-10-27T21:50:45.190Z",
      "deletedAt": null
    }
  ]
}
```

#### Atualizar Parceiro
1. Rota:
`PUT /api/partners/:id`

2. Parâmetros:
- `id`: O ID do parceiro a ser atualizado

3. Corpo:
```json
{
  "name": "Exemplo de nome",
  "category": "Exemplo de categoria",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Exemplo de Responsável Clínico",
  "financialManagerName": "Exemplo de Responsável Financeiro",
  "addressId": 1
}
```

4. Respostas Possíveis:
- Sucesso (200)
```json
{
  "id": 1,
  "name": "Exemplo de nome",
  "email": "exemplo@email.com",
  "category": "Exemplo de categoria",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Exemplo de Responsável Clínico",
  "financialManagerName": "Exemplo de Responsável Financeiro",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Erro na requisição (400)
```json
{
  "error": "Bad Request",
  "message": "Exemplo de mensagem de erro"
}
```

- Não encontrado (404)
```json
{
  "error": "Not Found",
  "message": "Exemplo de mensagem de erro"
}
```

#### Remover Parceiro
1. Rota:
`PUT /api/partners/:id`

2. Parâmetros:
- `id`: O ID do parceiro a ser removido

3. Respostas Possíveis
- Sucesso, sem retorno (204)

- Erro na requisição (400)
```json
{
  "error": "Bad Request",
  "message": "Exemplo de mensagem de erro"
}
```

- Não encontrado (404)
```json
{
  "error": "Not Found",
  "message": "Exemplo de mensagem de erro"
}
```
