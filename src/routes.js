const express = require('express');
const jwt = require('jsonwebtoken');
const usersController = require('./controllers/users');
const Auth = require('./models/auth');

const routes = express.Router();

async function verifyJWT(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error('header apitou');
    const [, userToken] = token.split(' ');
    const decoded = jwt.verify(userToken, process.env.SECRET);
    if (!decoded) throw new Error('Invalid token');
    const auth = await Auth.findOne({ token: userToken }).exec();
    if (!auth) throw new Error('Invalid token');
    req.token = userToken;
    req.user = auth.user;
    next();
  } catch (err) {
    return res.status(401).send({ error: err.message || 'Token is failed' });
  }
}

routes.get('/', verifyJWT, usersController.profile);

routes.post('/register', usersController.register);

routes.post('/login', usersController.login);

routes.post('/logout', verifyJWT, usersController.logout);

module.exports = routes;
