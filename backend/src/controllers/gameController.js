const gameModel = require("../models/gameModel");
const userModel = require("../models/userModel");

exports.playGame = async (req, res) => {
  try {
    const { user_id, game_name, score } = req.body;
    await gameModel.saveGame(user_id, game_name, score);
    await userModel.addScore(user_id, score);
    res.json({ message: "Game saved, score updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
