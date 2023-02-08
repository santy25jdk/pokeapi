const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { pokemonRouter } = require('../routes/pokemon.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      pokemons: '/api/v1/pokemons',
    };

    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.pokemons, pokemonRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated! ;D'))
      .catch((err) => console.log(err));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch((err) => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port', this.port);
    });
  }
}

module.exports = Server;
