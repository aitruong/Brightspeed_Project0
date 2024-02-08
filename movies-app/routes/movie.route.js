const express =require('express');
const movieRoutes = express.Router();
const movieDAO = require('../dao/movie.dao');

//Get All Movies
movieRoutes.get('/',async function(req,res){
    const rows = await movieDAO.getAllMovies();
    res.send(rows);
});

movieRoutes.get("/:id", async function (req, res) {

    const movie = await movieDAO.getMovieById(req.params.id);

    if (movie) {
        res.send(movie);
    } else {
        res.status(404).send("Movie Not Found")
    }
});

movieRoutes.post("/", async function (req, res) {
    //Validate
    if (!req.body || req.body == {}) {
        res.status(400).send();
        return;
    }
    //Add it to our database
    const movie = await movieDAO.createMovie(req.body);
    //As a form of Confirmation, let's send back the added employee.
    res.send(movie);
})

movieRoutes.put("/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;
    //Changing an Object's property's (member's) value is NOT the same thing
    //as changing the entire Object. Therefore, const will not stop this. And that's a good thing.
    body.id = id;
    //^we are resetting the ID in the body to make sure it matches what was in the URL.

    const movie = await movieDAO.updateMovieById(body);

    if (!movie || movie == Object.keys(movie).length === 0) {
        res.status(404).send("Movie Not Found");
    } else {
        res.send(movie);
    }
});

movieRoutes.delete("/:id", async function (req, res) {
    const id = req.params.id;

    const movie = await movieDAO.deleteMovieById(id);

    if (!movie || Object.keys(movie).length === 0) {
        res.status(404).send("Movie Not Found");
    } else {
        res.status(204).send();
    }
});




module.exports = movieRoutes;