require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render("index.ejs")
});

// Results
app.get("/results", async (req, res) => {
 try {
   console.log(req.query.userSearch)
   const url = `https://www.omdbapi.com/?s=${req.query.userSearch}&apikey=${process.env.API_KEY}`
   const response = await axios.get(url)
   res.render("results.ejs", {
     userSearch: req.query.userSearch,
     responseData: response.data
   })
 } catch (err) {
   console.log(err)
   res.status(500).send("Server had an error")
 }
})

// GET/movies/:movie_id -- show details about a movie
app.get("/movies/:movie_id", (req, res) => {
  console.log(req.params.movie_id)
  const url = `https://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.API_KEY}`
  axios.get(url)
    .then(response => {
      res.render("detail.ejs", { movie: response.data })
    })
  .catch(error => {
    console.log(error)
    res.status(500).send("server had an error")
  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3002);

// We can export this server to other servers like this
module.exports = server;
