const express = require('express');
const routes  = express.Router();

routes.get('/', (req, res) => {
  return res.redirect('/teachers');
});

routes.get('/teachers', (req, res) => {
  return res.render('teachers/index');
});

routes.get('/teachers/create', (req, res) => {
  return res.render('teachers/create');
});

routes.post('/teachers', (req, res) => {
  return res.send(req.body);
})

routes.get('/students', (req, res) => {
  return res.render('students/index')
});

module.exports = routes;