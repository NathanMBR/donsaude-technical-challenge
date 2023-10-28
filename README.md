🇧🇷 [Clique aqui](./README_pt-br.md) para ler a versão em português

# donsaude-technical-challenge

Technical challenge for DonSaúde

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
4. Build the code with `npm run build`
5. Go to the frontend folder (`donsaude-technical-challenge/frontend`)
6. Install packages again with `npm ci`
7. Go back to the project root folder (`donsaude-technical-challenge`)
8. Start the containers with `docker compose up` (or `docker-compose up` for some cases)
9. Wait until the frontend host address is exhibited in the console (probably `http://localhost:5173`)
10. Access it through your navigator

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
8. Open a new terminal and go to the frontend folder (`donsaude-technical-challenge/frontend`)
9. Install packages again with `npm ci`
10. Run the client with `npm run dev`
11. Wait until the frontend host address is exhibited in the console (probably `http://localhost:5173`)
12. Access it through your navigator

## Backend side
[Click here](./backend/README.md) to read the README file specifically about the backend side.

## Frontend side
[Click here](./frontend/README.md) to read the README file specifically about the frontend side.

## License
[MIT](./LICENSE)
