const { Router } = require('express');
const {
  findPokemons,
  findPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} = require('../controllers/pokemon.controller');
const { validPokemonsById } = require('../middlewares/pokemon.middlewares');

const router = Router();

router.get('/', findPokemons);

router.get('/:id', validPokemonsById, findPokemon);

router.post('/', createPokemon);

router.patch('/:id', validPokemonsById, updatePokemon);

router.delete('/:id', validPokemonsById, deletePokemon);

module.exports = {
  pokemonRouter: router,
};
