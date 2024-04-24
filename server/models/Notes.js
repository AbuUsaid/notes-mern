const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Note', NoteSchema);
