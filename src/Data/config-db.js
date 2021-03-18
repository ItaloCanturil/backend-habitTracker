require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.HOST;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Inside the database');
  }
});

module.exports = mongoose;
