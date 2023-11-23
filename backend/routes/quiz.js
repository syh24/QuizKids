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

module.exports = router;