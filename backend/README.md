# donsaude-technical-challenge - Backend

This folder contains the code for the Backend side of the challenge.

## Setup
This section contains instructions on how to run this codebase.

### Running with Docker
#### Requirements
- Node.js
- npm
- Docker
- Docker Compose

#### Steps
1. Access the backend folder (`donsaude-technical-challenge/backend`)
2. Install packages with `npm ci`
3. Generate Prisma types with `npx prisma generate`
4. Go back to the project root folder (`donsaude-technical-challenge`)
5. Start the containers with `docker compose up` (or `docker-compose up` for some cases)
6. Wait until the host address is exhibited in the console

### Running without Docker
#### Requirements
- Node.js
- npm
- An active PostgreSQL instance

#### Steps
1. Access the backend folder (`donsaude-technical-challenge/backend`)
2. Install packages with `npm ci`
3. Generate Prisma types with `npx prisma generate`
4. Create a `.env` file in the backend folder (see the environment variables below)
5. Run Prisma migrations with `npx prisma migrate deploy`
6. Build the code with `npm run build`
7. Start the server with `npm run start`

## Documentation
The API documentation can be read [clicking here](./DOCS.md).

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
In this section, I'll talk about some decisions made during the project development.

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

## Did ChatGPT write this file?

No, he didn't write it. Besides programming, one of my passions is writing. I admit that my English isn't perfect and that my writing seems very formal or robotic, but that's just how I write formally. I only used it along with Google Translator to help me correct the English version, but the Portuguese version was 100% written by me.
