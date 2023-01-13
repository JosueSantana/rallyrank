import express from 'express';
import './db/mongoose.js';
import userRouter from './routes/user.js';

const app = express();

// Bind middleware
app.use(express.json());
app.use(userRouter);

// Some logic here

export default app;