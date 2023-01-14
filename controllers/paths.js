const pathsRouter = require('express').Router();
const Path = require('../models/path');
const User = require('../models/user');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.subString(7);
  }
  return null;
};

pathsRouter.get('/', async (request, response) => {
  const paths = await Path.find({});
  response.json(paths);
});

pathsRouter.get('/:id', async (request, response) => {

  const pathFound = await Path.findById(request.params.id);
  if (pathFound) {
    response.json(pathFound.toJSON());
  } else {
    response.status(404).end();
  }

});

module.exports = pathsRouter;
