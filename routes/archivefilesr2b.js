const express = require("express");
const router = express.Router();
const { getFilesByName, getFilesByFilters, getFileContent,updateFileStatus } = require("../controllers/archivefilesR2BController");

router.post("/", getFilesByName);
router.post("/filter", getFilesByFilters);
router.post("/content", getFileContent);
router.post("/updateFileStatus", updateFileStatus);

module.exports = router;
