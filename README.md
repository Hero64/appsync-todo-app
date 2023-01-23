# AppSync TODO App

## Getting Started

Install the dependencies

```bash
npm install
# or
yarn
```

Deploy Api to AWS

```bash
cd ./apps/api
sam deploy
```

Create env variables in client

```bash
cd ../client
cp .env.example .env
```

Copy API settings in .env file

## Develop

In root folder, run

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in two different tabs to see the realtime sync
