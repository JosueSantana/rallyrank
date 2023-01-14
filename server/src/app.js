import express from 'express';
import './db/mongoose.js';
import userRouter from './routes/user.js';
import buddyPairRouter from './routes/buddyPair.js';
import buddyRequestRouter from './routes/buddyRequest.js';

const app = express();


// Bind middleware
app.use(express.json());
app.use(userRouter);
app.use(buddyPairRouter);
app.use(buddyRequestRouter);

// Generic root path
app.get("/", (req, res) => {
  res.status(200).send();
})

export default app;