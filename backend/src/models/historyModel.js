const db = require("../config/db");

exports.getGameHistory = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM game_sessions WHERE user_id = ? ORDER BY played_at DESC",
    [user_id]
  );
  return rows;
};

exports.getVideoHistory = async (user_id) => {
  const [rows] = await db.execute(
    `SELECT vu.unlocked_at, v.title, v.youtube_id
     FROM video_unlocks vu
     JOIN videos v ON vu.video_id = v.id
     WHERE vu.user_id = ?
     ORDER BY vu.unlocked_at DESC`,
    [user_id]
  );
  return rows;
};
