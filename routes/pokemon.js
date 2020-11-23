const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then((pkmns) => {
    res.render('pokemon/index', { pokemon: pkmns })
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  const name = req.body.name

  db.pokemon.findOrCreate({
    where: { name } // same as { name: name }
  }).then((result) => {
    // result looks like [pkmnObj, bool]
    res.redirect('/pokemon')
  }) 
});

router.get('/:name', (req, res) => {
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;

  axios.get(pokemonUrl).then((response) => {
    console.log(response.data);
    
    res.render('pokemon/show', { pokemon: response.data })
  })
})

router.delete('/:name', (req, res) => {
  const name = req.params.name
  db.pokemon.findOne({
    where: { name }
  }).then((foundPkmn) => {
    foundPkmn.destroy().then(() => {
      res.redirect('/pokemon')
    })
  })
})

module.exports = router;
