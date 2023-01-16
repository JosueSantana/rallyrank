import express from 'express';
import mongooseConnection from './db/mongoose';
import userRouter from './routes/user';
import buddyPairRouter from './routes/buddyPair';
import buddyRequestRouter from './routes/buddyRequest';
import courtRouter from './routes/court';
import matchRouter from './routes/match';

const app = express();
mongooseConnection();

// Bind middleware
app.use(express.json());
app.use(userRouter);
app.use(buddyPairRouter);
app.use(buddyRequestRouter);
app.use(courtRouter);
app.use(matchRouter);

// Generic root path
app.get("/", (req, res) => {
  res.status(200).send();
})

export default app;