const express = require('express');
const jwt = require('jsonwebtoken');
const usersController = require('./controllers/users');

const routes = express.Router();

routes.get('/', (req, res) => res.json({ message: 'It works' }));

routes.post('/register', usersController.register);

routes.post('/login', usersController.login);

routes.post('/logout', usersController.logout);

function verifyJWT(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    return res.status(200);
  } catch (err) {
    return res.status(401).send({ error: err.message || 'Token is failed' });
  }
}

module.exports = routes;
