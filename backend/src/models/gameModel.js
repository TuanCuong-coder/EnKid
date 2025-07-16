const db = require("../config/db");

exports.saveGame = async (user_id, game_name, score) => {
  await db.execute(
    "INSERT INTO game_sessions (user_id, game_name, score) VALUES (?, ?, ?)",
    [user_id, game_name, score]
  );
};
