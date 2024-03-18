// models/genreModel.js
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name should not be empty"],
    unique: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
