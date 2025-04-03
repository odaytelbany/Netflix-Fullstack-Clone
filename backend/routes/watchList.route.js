import express from 'express';
import { addToWatchList, getWatchList, isInWatchList, removeFromWatchList } from '../controllers/watchList.controller.js';

const router = express.Router();

router.get("/", getWatchList);
router.post("/", addToWatchList);
router.delete("/:id", removeFromWatchList);
router.get("/:id", isInWatchList);

export default router;