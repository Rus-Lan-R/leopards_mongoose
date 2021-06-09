const { model, Schema } = require('mongoose');

const Cat = model('Cat', {
  name: { type: String, unique: true, required: true },
  age: Number,
  owner: { type: Schema.Types.ObjectId, ref: 'People' },
});

module.exports = Cat;
