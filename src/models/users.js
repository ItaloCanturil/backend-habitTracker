const mongoose = require('../Data/config-db');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const users = mongoose.model('users', userSchema);

module.exports = users;
