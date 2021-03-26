const express = require("express");
const router = express.Router();
const { getFilesByName, getFilesByFilters } = require("../controllers/archivefilesController");

router.post("/", getFilesByName);
router.post("/filter", getFilesByFilters);

module.exports = router;
