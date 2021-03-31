const express = require("express");
const router = express.Router();
const { getData, UploadSchema } = require("../controllers/keepaliveR2BController");

router.get("/", getData);
router.post("/uploadSchema", UploadSchema);

module.exports = router;
