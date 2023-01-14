import express from 'express';
import Match from '../models/Match.js';

const router = new express.Router();

//TODO: Implement route
router.get('/matches', ( req, res ) => {
  res.end();
});

//TODO: Implement route
router.get('/matches/:userId', ( req, res ) => {
  res.end();
});

//TODO: Implement route
router.get('/matches/:buddyPairId', ( req, res ) => {
  res.end();
});

//TODO: Implement route
router.delete('/matches/:buddyPairId', ( req, res ) => {
  res.end();
});

export default router;