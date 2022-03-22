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

pathsRouter.get('/', async (request, response) => {
  const paths = await Path.find({});
  const pathsGpx = await paths.map(p => {
    if(p.gpx!==''){
      return{
        average_drop:p.average_drop,
        average_time:p.average_time,
        date:p.date,
        description_en:p.description_en,
        description_it:p.description_it,
        difficult:p.difficult,
        gpx:p.gpx,
        loop:p.loop,
        park_name:p.park_name,
        path_length:p.path_length,
        path_numbers:p.path_numbers,
        pdf:p.pdf,
        starting_point:p.starting_point,
        title:p.title,
        id:p._id,
        gpx:gpxparsed(p.gpx).tracks[0].points.map(p => [p.lat, p.lon])[0]
      }
    }else{
      return p;
    }
  });
  response.json(pathsGpx);
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

// pathsRouter.post('/', async (request, response) => {
  
//   const { title,
//       park_name, 
//       starting_point, 
//       path_length, 
//       average_time, 
//       average_drop,
//       difficult,
//       loop,
//       path_numbers,
//       description_it,
//       description_en,
//       gpx,
//       pdf,
//       userId } = request.body;

//   const path = new Path({
//     title: title,
//     park_name: park_name,
//     starting_point: starting_point,
//     path_length: path_length,
//     average_time: average_time,
//     average_drop: average_drop,
//     difficult: difficult,
//     loop: loop,
//     path_numbers: path_numbers,
//     description_it: description_it,
//     description_en: description_en,
//     gpx: gpx,
//     pdf: pdf,
//     date: new Date()
//   });
   
//   if( userId!==undefined ){ 
//     const user = await User.findById(userId);
//     console.log(user._id)
//     path.users = path.users.concat(user._id);
//     user.paths = user.paths.concat(path._id);
//     await user.save();
//   }

//   const savedPath = await path.save();
//   response.status(201).json(savedPath.toJSON());

// });
/* 
pathsRouter.delete('/:id',async (request, response) => {
  await Path.findByIdAndRemove(request.params.id);
  response.status(204).end();
}); */
/* 
pathsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const path = {
    title: body.title,
    description: body.description,
    km: body.km,
    duration: body.duration,
    differenceAltitude: body.differenceAltitude,
    difficult: body.difficult,
    date: new Date(),
  };
  
  Path.findOneAndUpdate(request.params.id, path, { new: true })
    .then((updatePath) => {
      response.json(updatePath.toJSON());
    })
    .catch((error) => next(error));
});
 
 */
module.exports = pathsRouter;
