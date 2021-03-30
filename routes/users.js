const express = require("express");
const router = express.Router();
const { getUser, getUserBySubSystem } = require("../controllers/userController");

router.get("/", getUser);
router.post("/subsystem", getUserBySubSystem);

module.exports = router;
