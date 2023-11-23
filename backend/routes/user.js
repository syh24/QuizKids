const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middleware');
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

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { nickname, password, age, sex } = req.body;
  try {
      const exUser = await User.findOne({ where: { nickname } });
      if (exUser) {
          return res.json({
            "result": "fail",
            "message": "이미 존재하는 회원입니다."
          })
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
          nickname: nickname,
          password: hash,
          age: age,
          sex: sex,
      });
      return res.json({
        "result": "success",
      })
  } catch (err) {
      console.error(err);
      return next(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
      if (authError) {
          console.error(authError);
          return next(authError);
      }
      if (!user) {
          return res.json({
            "result": "fail",
            "message": info.message,
          });
      }
      return req.login(user, (loginError) => {
          if (loginError) {
              console.error(loginError);
              return next(loginError);
          }
          return res.json({
            "result": "success",
            "message": "로그인 성공",
          });
      });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200);
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