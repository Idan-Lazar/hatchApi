const express = require("express");
const router = express.Router();
const { getAllSubSystems , AddSubSystem, UpdateSubSystem ,DeleteSubSystem, getAllSubSystemsBySystems} = require("../controllers/subsystemController");

router.get("/", getAllSubSystems);
router.post("/", AddSubSystem);
router.patch("/", UpdateSubSystem);
router.delete("/", DeleteSubSystem);
router.post("/getSubSystem", getAllSubSystemsBySystems);

module.exports = router;
