const pathsRouter = require('express').Router();
const Path = require('../models/pathdef');

pathsRouter.get('/', async (request, response) => {
  const paths = await Path.find({}, 'title park_name starting_point difficult path_length loop average_drop average_time starting_lat_long');
  response.json(paths);
});

pathsRouter.get('/allPaths', async (request, response) => {
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
