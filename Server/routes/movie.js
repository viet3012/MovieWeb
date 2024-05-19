const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movie");

router.get("/trending", movieController.getTrendingMovie);

router.get("/top-rate", movieController.getRatingMovie);

router.get("/discover", movieController.getGenreMovie);

router.post("/video", movieController.postVideoMovie);

router.post("/search", movieController.postSearchMovie);

module.exports = router;
