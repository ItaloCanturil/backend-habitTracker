const mongoose = require('../Data/config-db');

const authSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('auth', authSchema);
