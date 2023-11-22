const express = require('express');
const { Video, User } = require('../models');
const router = express.Router();
const Quiz = require('../models/quiz');

router.get('/', async (req, res) => {
  try {
    const { quiz_id } = req.query;
    const quiz = await Quiz.findAll({
      where: {
        ...(quiz_id ? { id: quiz_id } : {}),
      },
    })
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    await quiz.save();
    res.status(201).json(quiz);
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