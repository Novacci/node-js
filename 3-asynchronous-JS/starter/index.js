const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('I could not find that doggo');
      }
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject('Could not write a file :( :( :(');
      } else {
        resolve('succes!!!');
      }
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`).then((data) => {
  console.log(`Breed: ${data}`);
  return superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      return writeFilePromise('dog-img.txt', res.body.message);
      // fs.writeFile('dog-img.txt', res.body.message, (err) => {
      //   if (err) return console.log(err.message);
      //   console.log('Random dog saved into file!');
      // });
    })
    .then(() => {
      console.log('Random dog saved into file!');
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {});
