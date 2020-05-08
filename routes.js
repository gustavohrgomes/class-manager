const express = require('express');
const routes  = express.Router();

routes.get('/', (req, res) => {
  res.redirect('/teachers');
});

routes.get('/teachers', (req, res) => {
  res.render('teachers/index');
});

routes.get('/students', (req, res) => {
  res.render('students/index')
});

module.exports = routes;