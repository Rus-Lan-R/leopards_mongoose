const { model } = require('mongoose');

const People = model('People', {
  name: { type: String, unique: true, required: true },
  age: { type: Number, default: 18 },
  friends: [],
});

module.exports = People;
