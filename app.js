const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

app.use(express.json()); //! middleware -> step between request and response

//! creating my own middleware

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hey - Middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! Routes

app.use('/api/v1/tours', tourRouter); //! middleware
app.use('/api/v1/users', userRouter); //! middleware

//! Start server

module.exports = app;
