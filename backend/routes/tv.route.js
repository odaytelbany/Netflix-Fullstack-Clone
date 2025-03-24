import express from 'express';
import { getDetails, getSimilarTvs, getTrailers, getTrendingTv, getTvCategory } from '../controllers/tv.controller.js';

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTrailers);
router.get("/:id/details", getDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvCategory);

export default router;