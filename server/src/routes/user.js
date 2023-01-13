import express from 'express';

// TODO: Read about express.Router
const router = new express.Router();

// TODO: Implement route
router.post("/users", async (req,res) => {
});

// TODO: Implement route
router.post("/users/login", async (req,res) => {
});

// TODO: Implement route
router.post("/users/logout", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId/profile", async (req,res) => {
});

// TODO: Implement route
router.patch("/users/:userId/profile", async (req,res) => {
});


// TODO: Implement route
router.get("/users/:userId/settings", async (req,res) => {
});

// TODO: Implement route
router.patch("/users/:userId/settings", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId/requests", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId/requests/:buddyId", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId/buddies", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId/buddies/:buddyId", async (req,res) => {
});

// TODO: Implement route
router.delete("/users/:userId", async (req,res) => {
});

// TODO: Implement route
router.delete("/users/:userId/requests/:buddyId", async (req,res) => {
});

// TODO: Implement route
router.delete("/users/:userId/buddies/:buddyId", async (req,res) => {
});

// TODO: Implement route
router.delete("/users/:userId/buddies/:buddyId", async (req,res) => {
});

// TODO: Implement route
router.get("/users/:userId/buddies/:buddyId/messages/:messageId", async (req,res) => {
});

// TODO: Implement route
router.post("/users/:userId/buddies/:buddyId/messages/:messageId", async (req,res) => {
});

// TODO: Implement route
router.patch("/users/:userId/buddies/:buddyId/messages/:messageId", async (req,res) => {
});

// TODO: Implement route
router.delete("/users/:userId/buddies/:buddyId/messages/:messageId", async (req,res) => {
});

export default router;