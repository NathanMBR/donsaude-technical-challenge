# donsaude-technical-challenge - Backend

This folder contains the code for the Backend side of the challenge.

## Documentation
The API documentation can be read [clicking here](./docs/API.md).

## Testing
This section explains how to run tests.

### Requirements
- Node.js
- npm

### Steps
1. Access the backend folder (`donsaude-technical-challenge/backend`)
2. Install packages with `npm ci`
3. Run the tests with `npm test`

That's it. Since all tests in this project are unit tests, there's no need to have a running database.

## About decisions
In this section, I'll talk about some decisions made during the backend development.

### Architecture
I chose to adopt some Clean Architecture and Domain-Driven Design concepts to develop the backend side, because I believe this demonstrates my ability to develop complex but scalable systems in a short period of time. Despite that, I'm aware that this architecture would not be ideal for simpler systems, but I still chose it to show my skills and also challenge myself.

### Technologies
These are the used technologies and its reasons:

- TypeScript (Type-safety and easier application of dependency inversion/injection)
- Express (Well-established API router)
- Prisma (Type-safe database access with automatic migration generation)
- Zod (Typescript-first validation that can be reutilized in frontend)
- Eslint (Codebase maintainability and standardization)
- Jest (Quality assurance and bug prevention)
- Docker (Easy environment setup)

