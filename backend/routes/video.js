const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const User = require('../models/user');
const Video = require('../models/video');

router.get('/', async (req, res) => {
  try {
    const { video_id, name } = req.query;
    const video = await Video.findAll({
      include: User,
      where: {
        ...(video_id ? { id: video_id } : {}),
        ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
      },
    });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const video = new Video(req.body);
  try {
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;