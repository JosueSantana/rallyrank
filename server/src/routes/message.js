import express from 'express';

const router = new express.Router();

// TODO: Messaging to be implemented at a later time
// TODO: Implement route
router.get(
  "/messages/:messageId",
  async (req, res) => {}
);

// TODO: Implement route
router.post(
  "/messages/:messageId",
  async (req, res) => {}
);

// TODO: Implement route
router.patch(
  "/messages/:messageId",
  async (req, res) => {}
);

// TODO: Implement route
router.delete(
  "/messages/:messageId",
  async (req, res) => {}
);

export default router;