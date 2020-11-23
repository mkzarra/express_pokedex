const db = require('./models')

// db.pokemon.create({
//   name: 'Raichu'
// }).then((pkmn) => {
//   console.log(pkmn);
// })

db.pokemon.findAll().then((pkmns) => {
  console.log(pkmns);
})

