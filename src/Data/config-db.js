require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.HOST, {
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
