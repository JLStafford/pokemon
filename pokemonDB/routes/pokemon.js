var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon'
  }
});

/* GET pokemon INDEX page. */
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * FROM pokemons;`)
    .then(function(data) {
      console.log(data.rows)
      res.render('pokemon', { title: 'Pokemon', pokemons: data.rows });
  });
});

/* GET pokemon SHOW page. */
router.get('/:id', function(req, res, next) {
  knex.raw(`SELECT trainers.name AS "trainers_name", pokemon.* FROM pokemons JOIN trainers on trainer_id = trainers.id WHERE id = ${req.params.id};`)
    .then(function(data) {
      console.log(data.rows)
      res.render('pokemon', { title: 'Pokemon', pokemons: data.rows });
  });
});

/* GET pokemon NEW page. */
router.get('/new', function(req, res, next) {
  knex.raw(`SELECT * FROM trainers`)
    .then(function(data) {
      console.log(data.rows)
      res.render('createPokemon', { title: 'Add New Pokemon'});
  });
});

/* GET pokemon EDIT page. */
router.get('/:id/edit', function(req, res, next) {
  knex.raw(`UPDATE pokemon WHERE id = ${req.params.id};`)
    .then(function(data) {
      console.log(data.rows)
      res.render('editPokemon', { title: 'Edit Pokemon'});
  });
});

/* POST pokemon CREATE page. */
router.post('/', function(req, res, next) {
  knex.raw(`INSERT into pokemons(name, type, trainer_id) VALUES (${req.body.name}, ${req.body.type}, ${req.body.trainer_id});`)
    .then(function(data) {
      console.log(data.rows)
      res.redirect('/pokemon');
  });
});

/* POST pokemon UPDATE page. */
router.post('/:id', function(req, res, next) {
  knex.raw(`UPDATE trainers SET name = ${req.body.new_name};`)
    .then(function(data) {
      console.log(data.rows)
      res.redirect('/pokemon/:id');
  });
});

/* POST pokemon DElETE page. */
router.post('/:id/delete', function(req, res, next) {
  knex.raw(`DELETE FROM pokemons WHERE id = ${req.params.id};`)
    .then(function(data) {
      console.log(data.rows)
      res.redirect('/pokemon');
  });
});

module.exports = router;
