const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.get("/game/:id", historyController.getGameHistory);
router.get("/video/:id", historyController.getVideoHistory);

module.exports = router;
