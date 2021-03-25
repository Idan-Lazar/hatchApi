const express = require("express");
const router = express.Router();
const { getAllSystems , getAllSystemsUnique ,getAllSystemsConfig ,UploadSystem , UpdateSystem , DeleteSystem } = require("../controllers/systemController");

router.get("/", getAllSystems);
router.get("/worldContents", getAllSystemsUnique);
router.post("/", UploadSystem);
router.patch("/", UpdateSystem);
router.get("/config", getAllSystemsConfig);
router.delete("/", DeleteSystem);

module.exports = router;
