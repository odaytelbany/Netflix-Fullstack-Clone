import express from 'express';
import dotenv from "dotenv";
import authRouter from './routes/auth.route.js';

dotenv.config();
const app = express();

app.use('/api/v1/auth', authRouter)

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
})
