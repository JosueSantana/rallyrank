import express from 'express';
import './db/mongoose';
import userRouter from './routes/user';
// import buddyPairRouter from './routes/buddyPair';
// import buddyRequestRouter from './routes/buddyRequest';

const app = express();


// Bind middleware
app.use(express.json());
app.use(userRouter);
// app.use(buddyPairRouter);
// app.use(buddyRequestRouter);

// Generic root path
app.get("/", (req, res) => {
  res.status(200).send();
})

export default app;