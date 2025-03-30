import express from 'express';
import path from 'path';
import dotenv from "dotenv";
import authRouter from './routes/auth.route.js';
import movieRouter from './routes/movie.route.js';
import tvRouter from './routes/tv.route.js';
import searchRouter from './routes/search.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middlewares/protectRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movie', protectRoute, movieRouter);
app.use('/api/v1/tv', protectRoute, tvRouter);
app.use('/api/v1/search', protectRoute, searchRouter);

if (ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
}

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
})

app.listen(PORT, () => {
    console.log("Server started at http://localhost:"+PORT);
    connectDB();
})
