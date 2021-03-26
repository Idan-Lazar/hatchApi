const express = require("express");
const router = express.Router();
const { getBridgeStatus } = require("../controllers/bridgeController");

router.get("/", getBridgeStatus);


module.exports = router;
