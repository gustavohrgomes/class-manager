const express = require('express');
const routes  = express.Router();

routes.get('/', (req, res) => {
  res.redirect('/teachers');
});

routes.get('/teachers', (req, res) => {
  res.render('teachers/index');
});

module.exports = routes;