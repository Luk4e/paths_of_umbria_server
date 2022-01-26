require('dotenv').config();
const mongoose = require('mongoose');
 
const url = process.env.MONGODB_URI;

 
mongoose.connect(url);

const pathSchema = new mongoose.Schema({
  title: String,
  description: String,
  km: Number,
  duration: String,
  differenceAltitude: Number,
  difficult: String,
  date: Date,
});

const Path = mongoose.model('Path',pathSchema);
/* 
const path = new Path({
  
});

path.save().then(result => {
  console.log('path saved!');
  mongoose.connection.close();
});
 */


