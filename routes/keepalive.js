const express = require("express");
const router = express.Router();
const { getData, UploadSchema, DeleteSchema } = require("../controllers/keepaliveController");

router.get("/", getData);
router.post("/uploadSchema", UploadSchema);
router.delete("/deleteSchema", DeleteSchema);

module.exports = router;
