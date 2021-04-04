const express = require('express');
const jwt = require('jsonwebtoken');
const usersController = require('./controllers/users');
const Auth = require('./models/auth');

const routes = express.Router();

async function verifyJWT(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error('header apitou');
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) throw new Error('Invalid token');
    const auth = await Auth.findOne({ token }).exec();
    if (!auth) throw new Error('Invalid token');
    req.token = token;
    req.user = auth.user;
    next();
  } catch (err) {
    return res.status(401).send({ error: err.message || 'Token is failed' });
  }
}

routes.use(['/logout', '/profile', '/home'], (req, res, next) => {
  verifyJWT(req, res, next);
});

routes.get('/', (req, res) => res.json({ message: 'It works' }));

routes.get('/home');

routes.get('/profile', usersController.profile);

routes.post('/register', usersController.register);

routes.post('/login', usersController.login);

routes.post('/logout', usersController.logout);

module.exports = routes;
