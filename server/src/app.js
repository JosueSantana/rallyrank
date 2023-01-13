import express from 'express';
import './db/mongoose.js';

const app = express();

// Bind middleware
app.use(express.json());

// Some logic here

export default app;