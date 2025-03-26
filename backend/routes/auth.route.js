import express from 'express';
import { authCheck, logout, signin, signup } from '../controllers/auth.controller.js';
import {protectRoute} from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/signup', signup);   
router.post('/signin', signin);   
router.post('/logout', logout);   
router.get('/authCheck',protectRoute, authCheck);   

export default router;