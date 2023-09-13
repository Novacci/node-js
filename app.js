const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();
app.use(express.json()); //! middleware -> step between request and response

//! creating my own middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`./public`));

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
