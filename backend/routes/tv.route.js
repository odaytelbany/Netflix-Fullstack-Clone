import express from 'express';
import { getAllGenres, getDetails, getSimilarTvs, getTrailers, getTrendingTv, getTvCategory, gettvGenre, getCredits, getImages, getSeasonEpisodes } from '../controllers/tv.controller.js';

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/genres", getAllGenres);
router.get("/:id/trailers", getTrailers);
router.get("/:id/details", getDetails);
router.get("/:id/images", getImages);
router.get("/:id/credits", getCredits);
router.get("/:id/similar", getSimilarTvs);
router.get("/:id/season/:season", getSeasonEpisodes);
router.get("/:category", getTvCategory);
router.get("/genre/:genre", gettvGenre);

export default router;