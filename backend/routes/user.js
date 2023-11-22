const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const User = require('../models/user');
const Video = require('../models/video');

// Get all users
router.get('/', async (req, res) => {
  try {
    const { user_id, name } = req.query;
    const users = await User.findAll({
      where: {
        ...(user_id ? { id: user_id } : {}),
        ...(name ? { nickname: { [Op.like]: `%${name}%` } } : {}),
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
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