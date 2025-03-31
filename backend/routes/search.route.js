import express from "express";
import { clearHistory, deleteItemFromSearchHistory, getSearchHistory, searchMovie, searchMulti, searchPerson, searchTv } from "../controllers/search.controller.js";

const router = express.Router();

router.get('/multi/:query', searchMulti);
router.get('/person/:query', searchPerson);
router.get('/movie/:query', searchMovie);
router.get('/tv/:query', searchTv);
router.get('/history', getSearchHistory);
router.delete('/history', clearHistory);
router.delete('/history/:id', deleteItemFromSearchHistory);

export default router;