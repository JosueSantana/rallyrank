import express from 'express';
import Court from '../models/Court.js';

const router = new express.Router();

//TODO: Implement route
router.get('/courts', ( req, res ) => {
  res.end();
});

//TODO: Implement route
router.get('/courts/:courtId', ( req, res ) => {
  res.end();
});

//TODO: Implement route
router.delete('/courts/:courtId', ( req, res ) => {
  res.end();
});

export default router;