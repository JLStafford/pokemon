var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon'
  }
});

/* GET trainer INDEX page. */
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * FROM trainers;`)
    .then(function(data) {
      console.log(data.rows)
      res.render('trainers', { title: 'Pokemon Trainers', trainers: data.rows });
  });
});

/* GET trainer NEW page. */
router.get('/new', function(req, res, next) {
  res.render('newTrainer', { title: 'Add New Trainer'})
});

/* POST trainer CREATE page. */
router.post('/new', function(req, res, next) {
  knex.raw(`INSERT INTO trainers set name = ${req.body.name};`);
  res.redirect('/trainers');
});

/* GET trainer SHOW page. */
router.get('/:id', function(req, res, next) {
  knex.raw(`SELECT * FROM trainers WHERE id = ${req.params.id};`)
    .then(function(data) {
      console.log(data.rows)
      res.render('trainers', { title: 'Pokemon Trainers', trainers: data.rows });
  });
});


/* GET trainer EDIT page. */
router.get('/:id/edit', function(req, res, next) {
  knex.raw(`UPDATE trainers WHERE id = ${req.params.id};`)
    .then(function(data) {
      console.log(data.rows)
      res.render('editTrainer', { title: 'Edit Trainer'})
      res.redirect('/trainers/:id');
  });
});

/* POST trainer UPDATE page. */
router.post('/:id', function(req, res, next) {
  knex.raw(`UPDATE trainers WHERE id = ${req.params.id};`)
    .then(function(data) {
      console.log(data.rows)
      res.redirect('/trainers/:id');
  });
});

/* POST trainer DELETE page. */
router.post('/:id/delete', function(req, res, next) {
  knex.raw(`DELETE trainers WHERE id = ${req.params.id};`)
    .then(function(data) {
      console.log(data.rows)
      res.redirect('/trainers');
  });
});

module.exports = router;
