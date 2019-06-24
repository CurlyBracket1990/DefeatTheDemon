# This is our result for the second project week (week 7) of the Codaisseur academy.

The goal was to make a basic multiplayer game using websockets.
As framework we got a working game of tic-tac-toe which we expended to a demon hunting game.

As a team it is your goal to defeat all the enemies on the board by walking towards them and clicking on them.
There is a catch to it though, you have a set amount of moves (based on the amount of enemies) and the enemies can't be defeated when they face towards the direction you are coming from.

# Multiplayer Demon Hunt

This repo contains a frontend and backend for a tactical multiplayer Demon Hunt game. It uses Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API but also sends messages over websockets using SocketIO. 


## Getting Started

If the server is already running, you can try:

try to this link to open and login the game.
http://localhost:3000/login

If you do not have account yet, try this link to register our lovely game.
http://localhost:3000/signup

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
