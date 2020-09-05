const express = require('express');
const teachers = require('./controllers/teachers');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.redirect('/teachers');
});

routes.get('/teachers', (req, res) => {
  return res.render('teachers/index');
});

routes.get('/teachers/create', (req, res) => {
  return res.render('teachers/create');
});

routes.get('/teachers/:id', teachers.show);

routes.get('/teachers/:id/edit', teachers.edit);

routes.post('/teachers', teachers.post);

routes.put('/teachers', teachers.put);

routes.get('/students', (req, res) => {
  return res.render('students/index');
});

module.exports = routes;