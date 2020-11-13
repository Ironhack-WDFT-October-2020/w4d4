const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      const options = {
        beers: beers
      }
      res.render('beers', options);
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(beer => {
      console.log(beer);
      res.render('random-beers', beer[0]);
    })
    .catch(error => {
      console.log(error)
    })
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!!`);
});