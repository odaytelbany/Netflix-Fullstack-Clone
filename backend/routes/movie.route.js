import express from 'express';
import { getTrendingMovie, getTrailers, getDetails, getSimilarMovies, getmovieCategory } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getTrailers);
router.get("/:id/details", getDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getmovieCategory);

export default router;