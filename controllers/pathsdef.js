const pathsRouter = require('express').Router();
const GpxParser = require('gpxparser');
const Path = require('../models/pathdef');
const User = require('../models/user');

const gpxparsed = (gpxfile) => {
  const gpx = new GpxParser();
  gpx.parse(gpxfile);
  return gpx;
};


const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.subString(7);
  }
  return null;
};

pathsRouter.get('/allPaths', async (request, response) => {
  const paths = await Path.find({});
  const pathsGpx = await paths.map(p => {
    if(p.gpx!==''){
      return{
        id:p._id,
        title:p.title,
        park_name:p.park_name,
        starting_point:p.starting_point,
        difficult:p.difficult,
        path_length:p.path_length,
        loop:p.loop,
        average_drop:p.average_drop,
        average_time:p.average_time,
        description_it:p.description_it,
        description_en:p.description_en,
        path_numbers:p.path_numbers,
        gpx:gpxparsed(p.gpx).tracks[0].points.map(p => [p.lat, p.lon])[0],
        date:p.date
      }
    }else{
      return p;
    }
  });
  response.json(pathsGpx);
});

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
