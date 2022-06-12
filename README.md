# viact-nestjs-react

# 1. Setup Backend

```bash
cd backend/

npm install

```

# docker

```bash

docker-compose -f docker-compose.db.yaml up -d
docker-compose -f docker-compose.db.yaml down

```

# start project

```bash cd backend/
npm run build
npm run migration
npm run start:dev

```

# test case

```bash
npm run test

```

# 2. Setup Frontend

```bash
cd frontend/

npm install

npm run start

```
