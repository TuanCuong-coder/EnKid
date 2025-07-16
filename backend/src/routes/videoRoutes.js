const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

router.get("/", videoController.getAllVideos);
router.post("/unlock", videoController.unlockVideo);

module.exports = router;
