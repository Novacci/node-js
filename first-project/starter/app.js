const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Hello! Siemka!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Apka odpalona na porcie ${port}`);
});
