import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import "dotenv/config"
import bodyParser from 'body-parser';
import postRouter from './routes/postsRouters.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// db connection
connectDB();

//api endpoints
app.use('/api/post', postRouter);

// Khởi tạo server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
