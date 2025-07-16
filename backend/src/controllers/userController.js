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
