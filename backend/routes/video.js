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

// Update user
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByIdAndUpdate(id, req.body, { new: true });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete user
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;