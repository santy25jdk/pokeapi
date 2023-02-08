const Pokemon = require('../models/pokemon.model');

exports.findPokemons = async (req, res) => {
  try {
    const { count, rows } = await Pokemon.findAndCountAll({
      attributes: ['id', 'name', 'image'],
      where: {
        status: 'available',
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Pokemons fetched successfully',
      count,
      results: rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findPokemon = async (req, res) => {
  try {
    const { pokemon } = req;

    res.status(200).json({
      status: 'success',
      message: 'Pokemon fetched successfully',
      pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createPokemon = async (req, res) => {
  try {
    const { name, image } = req.body;
    const pokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image,
    });

    res.status(201).json({
      status: 'success',
      message: 'Pokemon created successfully',
      pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updatePokemon = async (req, res) => {
  try {
    const { pokemon } = req;
    const { name, image } = req.body;

    await pokemon.update({ name, image });

    res.status(200).json({
      status: 'success',
      message: 'Pokemon updated successfully',
      pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    const { pokemon } = req;

    await pokemon.update({ status: false });

    res.status(200).json({
      status: 'success',
      message: 'Pokemon deleted successfully',
      pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
