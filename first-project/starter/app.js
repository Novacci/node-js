const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

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

//! Route handlers

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'succes',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'succes',
    data: {
      tour: tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'succes',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'succes',
    data: {
      tour: '<Updated tour here...',
    },
  });
};

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'succes',
    data: null,
  });
};

//  app.get('/api/v1/tours', getAllTours);
//  app.get('/api/v1/tours/:id', getTour);
//  app.post('/api/v1/tours', createTour);
//  app.patch('/api/v1/tours/:id', updateTour);
//  app.delete('/api/v1/tours/:id', deleteTour);

//! Routes

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//! Start server

const port = 3000;
app.listen(port, () => {
  console.log(`Apka odpalona na porcie ${port}`);
});
