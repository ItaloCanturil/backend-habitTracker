const express = require('express');
const jwt = require('jsonwebtoken');
const usersController = require('./controllers/users');
const Auth = require('./models/auth');

const routes = express.Router();

async function verifyJWT(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error('header apitou');
    const [, userToken] = token;
    const decoded = jwt.verify(userToken, process.env.SECRET);
    if (!decoded) throw new Error('Invalid token');
    const auth = await Auth.findOne({ userToken }).exec();
    if (!auth) throw new Error('Invalid token');
    req.token = token;
    req.user = auth.user;
    next();
  } catch (err) {
    return res.status(401).send({ error: err.message || 'Token is failed' });
  }
}

routes.use(['/logout', '/profile'], (req, res, next) => {
  verifyJWT(req, res, next);
});

routes.get('/', usersController.profile);

routes.post('/register', usersController.register);

routes.post('/login', usersController.login);

routes.post('/logout', usersController.logout);

module.exports = routes;
