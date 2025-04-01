import express from 'express';
import { getTrendingMovie, getTrailers, getDetails, getSimilarMovies, getmovieCategory, getmovieGenre, getAllGenres, getCredits} from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/genres", getAllGenres);
router.get("/:id/trailers", getTrailers);
router.get("/:id/details", getDetails);
router.get("/:id/credits", getCredits);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getmovieCategory);
router.get("/genre/:genre", getmovieGenre);

export default router;