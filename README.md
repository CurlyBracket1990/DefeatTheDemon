# Multiplayer Demon Hunt

This repo contains a frontend and backend for a tactical multiplayer game. It uses Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API but also sends messages over websockets using SocketIO. 

## Getting Started

If the server is already running, you can try:

try to this link to open and login the game.
http://172.16.31.195:3000/login

If you do not have account yet, try this link to register our lovely game.
http://172.16.31.195:3000/signup

Otherwise rewrite the baseurl ip part to localhost.

### Postgres Database

Start a Postgres container using the following Docker command:

```bash
$ docker run \
  --rm \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres
```

### TypeStack Server

Then `cd` into the `server` directory and run `npm install` to install the dependencies.

Start the server with the `npm run dev`

### React Client

Open another terminal session and `cd` into the `client` directory, then run `npm install` to install dependencies and run `npm start` to start the dev server.
