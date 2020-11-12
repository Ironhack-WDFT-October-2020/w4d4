const express = require('express');
const app = express();
const movies = require('./movies.json');
const handlebars = require('hbs');
// console.log(movies);

app.use(express.static('public'));
handlebars.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('movies', { moviesList: movies })
});

app.get('/godfather', (req, res) => {
    const godfather = movies.find(movie => movie.title === 'The Godfather');
    console.log(godfather);
    res.render('movieDetails', { clickedMovie: godfather });
})

app.get('/onemovie', (req, res) => {
    res.render('onemovie')
});

app.listen(3000);