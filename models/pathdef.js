const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true,
  },
  park_name: {
    type: String,
    required: true,
  },
  starting_point: {
    type: String,
    required: true,
  },
  path_length: {
    type: Number,
    required: true,
  },
  average_time: {
    type: Number,
    required: false,
  },
  average_drop: {
    type: Number,
    required: false,
  },
  difficult: {
    type: String,
    required: false,
  },
  loop: {
    type: Boolean,
    required: true,
  },
  path_numbers: {
    type: [String],
    required: false,
  },
  description_it: {
    type: String,
    required: false,
  },
  description_en: {
    type: String,
    required: false,
  },
  gpx: {
    type: String,
    required: false,
  },
  pdf: {
    type: String,
    required: false,
  },
  starting_lat_long: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

pathSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Path', pathSchema);
