const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

server.use(express.static('./public'));

server.set('view engine', 'njk');

nunjucks.configure("./views", {
  express: server
});

server.listen(3000, () => {
  console.log("server is running!");
});