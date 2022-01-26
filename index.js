require('dotenv').config();

const express = require('express');
//const cors = require('cors');
const Path = require('./models/path');
const { response } = require('express');
const app = express();
const PORT = process.env.PORT;
minlength: 5,

app.use(express.static('build'));
//app.use(cors());
app.use(express.json());
 
app.get('/api/paths', (request, response) => {
  Path.find({}).then( paths => {
    response.json(paths);
  });
});

app.get('/api/paths/:id', (request, response, next) => {
  Path.findById(request.params.id).then( path => {
    if (path){
      response.json(path);
    } else {
      response.status(404).end();
    }
  })
  .catch(error => next(error));
});

app.put('/api/paths/:id', (request, response, next) => {
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

  Path.findOneAndUpdate(request.params.id, path, { new:true})
    .then(updatePath => {
      response.json(updatePath);
    })
    .catch(error => next(error));
});

app.delete('/api/paths/:id', (request, response, next) => {
  Path.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/paths', (request,response, next) => {
  const body = request.body;

  const path = new Path({
    title: body.title,
    description: body.description,
    km: body.km,
    duration: body.duration,
    differenceAltitude: body.differenceAltitude,
    difficult: body.difficult,
    date: new Date(),
  });

  path
    .save()
    .then(savedPath => {
      response.json(path);
    })
    .catch(error => next(error));
});

const unknowEndpoint = (req,res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknowEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id'  });
  } else if ( error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}
// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
