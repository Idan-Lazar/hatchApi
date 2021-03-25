const express = require("express");
const router = express.Router();
const { getFileById } = require("../controllers/archivefilesController");

router.post("/", getFileById);

module.exports = router;
