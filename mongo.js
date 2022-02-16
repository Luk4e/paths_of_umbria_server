require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url);

const pathSchema = new mongoose.Schema({
  title:String,
  park_name:String,
  starting_point: String,
  path_length: Number,
  average_time: Number,
  average_drop: Number,
  difficult: String,
  loop: Boolean,
  path_numbers: [String],
  description_it: String,
  description_en: String,
  gpx: String,
  pdf: String,
  date: Date,
});

const Path = mongoose.model('Path', pathSchema);
