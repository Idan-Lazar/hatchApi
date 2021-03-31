const express = require("express");
const router = express.Router();
const { getFilesByName, getFilesByFilters,getFileContent, UpdateFilesStatus } = require("../controllers/archivefilesController");

router.post("/", getFilesByName);
router.post("/filter", getFilesByFilters);
router.post("/content", getFileContent);
router.patch("/", UpdateFilesStatus);

module.exports = router;
