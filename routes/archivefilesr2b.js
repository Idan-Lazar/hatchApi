const express = require("express");
const router = express.Router();
const { getFilesByName, getFilesByFilters, getFileContent } = require("../controllers/archivefilesR2BController");

router.post("/", getFilesByName);
router.post("/filter", getFilesByFilters);
router.post("/content", getFileContent);

module.exports = router;
