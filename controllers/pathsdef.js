const pathsRouter = require('express').Router();
const Path = require('../models/pathdef');
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

pathsRouter.post('/', async (request, response) => {
  
  const { title,
      park_name, 
      starting_point, 
      path_length, 
      average_time, 
      average_drop,
      difficult,
      loop,
      path_numbers,
      description_it,
      description_en,
      gpx,
      pdf,
      userId } = request.body;

  const path = new Path({
    title: title,
    park_name: park_name,
    starting_point: starting_point,
    path_length: path_length,
    average_time: average_time,
    average_drop: average_drop,
    difficult: difficult,
    loop: loop,
    path_numbers: path_numbers,
    description_it: description_it,
    description_en: description_en,
    gpx: gpx,
    pdf: pdf,
    date: new Date()
  });
   
  if( userId!==undefined ){ 
    const user = await User.findById(userId);
    console.log(user._id)
    path.users = path.users.concat(user._id);
    user.paths = user.paths.concat(path._id);
    await user.save();
  }

  const savedPath = await path.save();
  response.status(201).json(savedPath.toJSON());

});
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
