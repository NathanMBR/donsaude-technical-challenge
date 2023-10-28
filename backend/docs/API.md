# donsaude-technical-challenge - API Documentation

This file contains the API documentation.

## Entities
List of JSON objects returned by the API

### Address
Description about the Address entity

#### JSON
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Street example",
  "number": "123",
  "neighborhood": "Neighborhood example",
  "complement": "Complement example",
  "city": "City example",
  "state": "State example",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

#### Properties
- `id` represents the ID of this entity
- `postalCode` represents the address CEP
- `street` represents the address street
- `neighborhood` represents the address neighborhood
- `complement` represents the address complement `(optional)`
- `city` represents the address city
- `state` represents the address state
- `createdAt` represents the creation date of this entity
- `updatedAt` represents the last update date of this entity
- `deletedAt` represents the deletion date of this entity `(optional)`

### Partner
Description about the Partner entity

#### JSON
```json
{
  "id": 1,
  "name": "Name example",
  "email": "example@email.com",
  "password": "Password example",
  "category": "Category example",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Clinical Manager Example",
  "financialManagerName": "Financial Manager Example",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

#### Properties
- `id` represents the ID of this entity
- `name` represents the partner name
- `email` represents the partner email
- `password` represents the partner password
- `category` represents the partner category
- `cnpj` represents the partner CNPJ
- `phone` represents the partner phone number
- `cellphone` represents the partner cellphone number
- `clinicalManagerName` represents the partner clinical manager name
- `financialManagerName` represents the partner financial manager name
- `addressId` represents an address this partner is associated with
- `createdAt` represents the creation date of this entity
- `updatedAt` represents the last update date of this entity
- `deletedAt` represents the deletion date of this entity `(optional)`

## Routes
List of all API routes

### Address
List of all Address routes

#### Create Address
1. Route:
`POST /api/addresses`

2. Body:
```json
{
  "postalCode": "12345678",
  "street": "Street example",
  "number": "123",
  "neighborhood": "Neighborhood example",
  "complement": "Complement example",
  "city": "City example",
  "state": "State example"
}
```

3. Possible Answers:
- Successfully created (201)
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Street example",
  "number": "123",
  "neighborhood": "Neighborhood example",
  "complement": "Complement example",
  "city": "City example",
  "state": "State example",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Request error (400)
```json
{
  "error": "Bad Request",
  "message": "Example error message"
}
```

#### Read Address
1. Route:
`GET /api/addresses/:id`

2. Parameters:
- `id`: The ID of the Address to be read

3. Possible Answers:
- Success (200)
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Street example",
  "number": "123",
  "neighborhood": "Neighborhood example",
  "complement": "Complement example",
  "city": "City example",
  "state": "State example",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Not found (404)
```json
{
  "error": "Not Found",
  "message": "Example error message"
}
```

#### Read Multiple Addresses
1. Route:
`GET /api/addresses?page=1&quantity=100`

2. Parameters
- `page`: The page to search `(optional)`
- `quantity`: The quantity of elements to search `(optional)`

3. Possible Answers:
- Success (200)
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
      "street": "Street example",
      "number": "123",
      "neighborhood": "Neighborhood example",
      "complement": "Complement example",
      "city": "City example",
      "state": "State example",
      "createdAt": "2023-10-27T21:50:45.190Z",
      "updatedAt": "2023-10-27T21:50:45.190Z",
      "deletedAt": null
    }
  ]
}
```

#### Update Address
1. Route:
`PUT /api/addresses/:id`

2. Parameters:
- `id`: The ID of the Address to be updated

3. Body:
```json
{
  "postalCode": "12345678",
  "street": "Updated street example",
  "number": "456",
  "neighborhood": "Updated neighborhood example",
  "complement": "Updated complement example",
  "city": "Updated city example",
  "state": "Updated state example"
}
```

4. Possible Answers:
- Success (200)
```json
{
  "id": 1,
  "postalCode": "123.456.789-0",
  "street": "Street example",
  "number": "123",
  "neighborhood": "Neighborhood example",
  "complement": "Complement example",
  "city": "City example",
  "state": "State example",
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Request error (400)
```json
{
  "error": "Bad Request",
  "message": "Example error message"
}
```

- Not found (404)
```json
{
  "error": "Not Found",
  "message": "Example error message"
}
```

#### Remove Address
1. Route:
`PUT /api/addresses/:id`

2. Parameters:
- `id`: The ID of the Address to be removed

3. Possible Answers
- Success, no response (204)

- Request error (400)
```json
{
  "error": "Bad Request",
  "message": "Example error message"
}
```

- Not found (404)
```json
{
  "error": "Not Found",
  "message": "Example error message"
}
```

### Partner
List of all Partner routes

#### Create Partner
1. Route:
`POST /api/partners`

2. Body:
```json
{
  "name": "Name example",
  "email": "example@email.com",
  "category": "Category example",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Clinical Manager Example",
  "financialManagerName": "Financial Manager Example",
  "addressId": 1
}
```

3. Possible Answers:
- Successfully created (201)
```json
{
  "id": 1,
  "name": "Name example",
  "email": "example@email.com",
  "category": "Category example",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Clinical Manager Example",
  "financialManagerName": "Financial Manager Example",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Request error (400)
```json
{
  "error": "Bad Request",
  "message": "Example error message"
}
```

- Not found (404)
```json
{
  "error": "Not Found",
  "message": "Example error message"
}
```

#### Read Partner
1. Route:
`GET /api/partners/:id`

2. Parameters:
- `id`: The ID of the Partner to be read

3. Possible Answers:
- Success (200)
```json
{
  "id": 1,
  "name": "Name example",
  "email": "example@email.com",
  "category": "Category example",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Clinical Manager Example",
  "financialManagerName": "Financial Manager Example",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Not found (404)
```json
{
  "error": "Not Found",
  "message": "Example error message"
}
```

#### Read Multiple Partners
1. Route:
`GET /api/partners?page=1&quantity=100`

2. Parameters
- `page`: The page to search `(optional)`
- `quantity`: The quantity of elements to search `(optional)`

3. Possible Answers:
- Success (200)
```json
{
  "quantityPerPage": 100,
  "total": 1,
  "currentPage": 1,
  "lastPage": 1,
  "data": [
    {
      "id": 1,
      "name": "Name example",
      "email": "example@email.com",
      "category": "Category example",
      "cnpj": "00.000.000/0000-00",
      "phone": "+55 (11) 9999-9999",
      "cellphone": "+55 (11) 99999-9999",
      "clinicalManagerName": "Clinical Manager Example",
      "financialManagerName": "Financial Manager Example",
      "addressId": 1,
      "createdAt": "2023-10-27T21:50:45.190Z",
      "updatedAt": "2023-10-27T21:50:45.190Z",
      "deletedAt": null
    }
  ]
}
```

#### Update Partner
1. Route:
`PUT /api/partners/:id`

2. Parameters:
- `id`: The ID of the Partner to be updated

3. Body:
```json
{
  "name": "Name example",
  "category": "Category example",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Clinical Manager Example",
  "financialManagerName": "Financial Manager Example",
  "addressId": 1
}
```

4. Possible Answers:
- Success (200)
```json
{
  "id": 1,
  "name": "Name example",
  "email": "example@email.com",
  "category": "Category example",
  "cnpj": "00.000.000/0000-00",
  "phone": "+55 (11) 9999-9999",
  "cellphone": "+55 (11) 99999-9999",
  "clinicalManagerName": "Clinical Manager Example",
  "financialManagerName": "Financial Manager Example",
  "addressId": 1,
  "createdAt": "2023-10-27T21:50:45.190Z",
  "updatedAt": "2023-10-27T21:50:45.190Z",
  "deletedAt": null
}
```

- Request error (400)
```json
{
  "error": "Bad Request",
  "message": "Example error message"
}
```

- Not found (404)
```json
{
  "error": "Not Found",
  "message": "Example error message"
}
```

#### Remove Partner
1. Route:
`PUT /api/partners/:id`

2. Parameters:
- `id`: The ID of the Partner to be removed

3. Possible Answers
- Success, no response (204)

- Request error (400)
```json
{
  "error": "Bad Request",
  "message": "Example error message"
}
```

- Not found (404)
```json
{
  "error": "Not Found",
  "message": "Example error message"
}
```
