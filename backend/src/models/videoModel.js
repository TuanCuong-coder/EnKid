const db = require("../config/db");

exports.getAllVideos = async () => {
  const [rows] = await db.execute("SELECT * FROM videos");
  return rows;
};

exports.getVideoById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM videos WHERE id = ?", [id]);
  return rows[0];
};

exports.unlockVideo = async (user_id, video_id) => {
  await db.execute(
    "INSERT INTO video_unlocks (user_id, video_id) VALUES (?, ?)",
    [user_id, video_id]
  );
};
