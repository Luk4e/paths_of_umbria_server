const Path = require('../models/path');
const User = require('../models/user');

const initialPaths = [
  {
    title: 'Test title first path',
    description: 'This is the first description path',
    km: 10.12,
    duration: '00:30',
    differenceAltitude: 500,
    difficult: 'Normal',
    date: new Date(),
  },
  {
    title: 'Test title second path',
    description: 'This is the second description path',
    km: 2.8,
    duration: '04:30',
    differenceAltitude: 59,
    difficult: 'Hard',
    date: new Date(),
  },
];

const noExistingId = async () => {
  const path = new Path({
    title: 'noexist',
    description: 'noexist',
    km: 1,
    duration: '00:01',
    differenceAltitude: 1,
    difficult: 'Normal',
    date: new Date(),
  });

  await path.save();
  await path.remove();

  return path._id.toString();
}

const pathsInDb = async () => {
  const paths = await Path.find({});
  return paths.map(p => p.toJSON());
}

const userInDb = async () => {
  const users = await User.find({});

  return users.map(u => u.toJSON());
};

module.exports = { initialPaths, noExistingId, pathsInDb, userInDb };