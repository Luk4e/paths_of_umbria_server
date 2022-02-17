const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
require('express-async-errors');

const app = express();
const pathsRouter = require('./controllers/pathsdef');
// const usersRouter = require('./controllers/users');
// const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('Connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('Error connecting to MongoDB: ', error.message));

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/paths', pathsRouter);
app.get('*', (req,res) =>{
  res.sendFile('/build');
});

// app.use('/api/users', usersRouter);
// app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
