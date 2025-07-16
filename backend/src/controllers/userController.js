const userModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { name, age } = req.body;
  const user = await userModel.insertUser(name, age);
  res.json(user);
};

exports.getAllUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

exports.getUserById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};
