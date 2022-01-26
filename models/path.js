const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('connection to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  }).catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const pathSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true
  },
  description: {
    type: String,
    minlength: 5,
    required: true
  },
  km: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: false
  },
  differenceAltitude: {
    type: Number,
    required: false
  },
  difficult: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
});

pathSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Path', pathSchema);