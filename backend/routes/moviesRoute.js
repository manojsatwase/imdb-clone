const express = require("express");
const { getMoviesController, createMoviesController, deleteMoviesController, updateMovieController } = require("../controllers/moviesController");
const { createGenreController, getAllGenres, updateGenres, deleteGenra, createAndUpdateGenreController } = require("../controllers/genreController");
const router = express.Router();


router.route("/movies").get(getMoviesController).post(createMoviesController);
router.route("/movie/:movieId").put(updateMovieController).delete(deleteMoviesController);

router.route("/genre").get(getAllGenres).post(createGenreController).put(createAndUpdateGenreController);
router.route("/genre/:id").put(updateGenres).delete(deleteGenra);


module.exports = router;