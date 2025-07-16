const videoModel = require("../models/videoModel");
const userModel = require("../models/userModel");

exports.getAllVideos = async (req, res) => {
  const videos = await videoModel.getAllVideos();
  res.json(videos);
};

exports.unlockVideo = async (req, res) => {
  try {
    const { user_id, video_id } = req.body;
    const user = await userModel.getUserById(user_id);
    const video = await videoModel.getVideoById(video_id);

    if (user.total_score >= video.required_score) {
      await videoModel.unlockVideo(user_id, video_id);
      res.json({ success: true, message: "Video unlocked!" });
    } else {
      res.status(400).json({ success: false, message: "Not enough score" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
