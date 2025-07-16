const historyModel = require("../models/historyModel");

exports.getGameHistory = async (req, res) => {
  const { id } = req.params;
  const data = await historyModel.getGameHistory(id);
  res.json(data);
};

exports.getVideoHistory = async (req, res) => {
  const { id } = req.params;
  const data = await historyModel.getVideoHistory(id);
  res.json(data);
};
