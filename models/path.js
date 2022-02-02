const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    required: true,
  },
  km: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: false,
  },
  differenceAltitude: {
    type: Number,
    required: false,
  },
  difficult: {
    type: String,
    required: false,
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
