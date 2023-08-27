const fs = require('fs');

const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('dog.txt', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.end(data);
  //   }
  // });
  // Solution 2: Streams
  // const readableStream = fs.createReadStream('dog.txt');
  // readableStream.on('data', (pieceofData) => {
  //   res.write(pieceofData);
  // });
  // readableStream.on('end', () => {
  //   res.end();
  // });
  // readableStream.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File not found');
  // });
  // Solution 3 - Pipe operator

  const readableStream = fs.createReadStream('dog.txt');
  readableStream.pipe(res);

  //! readableSource.pipe(writeableDest)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
