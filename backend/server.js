import express from 'express';
import dotenv from "dotenv";
import authRouter from './routes/auth.route.js';
import movieRouter from './routes/movie.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = ENV_VARS.PORT;

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movie', movieRouter)

app.listen(PORT, () => {
    console.log("Server started at http://localhost:"+PORT);
    connectDB();
})
