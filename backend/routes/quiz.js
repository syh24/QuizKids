const express = require('express');
const { Video, User } = require('../models');
const router = express.Router();
const Quiz = require('../models/quiz');
const Sequelize = require('sequelize');

//퀴즈 조회
router.get('/', async (req, res) => {
  try {
    const { video_id, count } = req.query;
    const parsedCount = parseInt(count, 10) || 0;
    const quiz = await Quiz.findAll({
      where: {
        ...(video_id ? { video_id: video_id } : {}),
      },
      order: Sequelize.literal('RAND()'),
      limit: parsedCount,
    })

    //조회수 증가
    if (quiz.length > 0) {
      for (q of quiz) {
        q.hit++;
        await q.save();
      }
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//퀴즈 생성
router.post('/', async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//정답 확인
router.post('/:id/answer', async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  try {
    const quiz = await Quiz.findByPk(id);
  
    if (quiz.answer == answer) {
      quiz.answer_count++;
      await quiz.save();
      res.json({
        "result": "success",
        "message": "정답입니다",
      })
    } else {
      quiz.wrong_count++;
      await quiz.save();
      res.json({
        "result": "fail",
        "message": "오답입니다",
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;