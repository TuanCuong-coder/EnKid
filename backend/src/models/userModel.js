const db = require("../config/db");

exports.insertUser = async (name, age) => {
  const [result] = await db.execute(
    "INSERT INTO users (name, age) VALUES (?, ?)",
    [name, age]
  );
  return { id: result.insertId, name, age, total_score: 0 };
};

exports.getAllUsers = async () => {
  const [rows] = await db.execute("SELECT * FROM users");
  return rows;
};

exports.addScore = async (user_id, score) => {
  await db.execute(
    "UPDATE users SET total_score = total_score + ? WHERE id = ?",
    [score, user_id]
  );
};
