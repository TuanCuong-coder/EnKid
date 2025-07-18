const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.post("/play", gameController.playGame);

module.exports = router;
