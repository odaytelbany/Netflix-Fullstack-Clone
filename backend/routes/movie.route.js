import express from 'express';
import { getTrendingMovie, getTrailers, getDetails, getSimilarMovies, getCategory } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getTrailers);
router.get("/:id/details", getDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getCategory);

export default router;