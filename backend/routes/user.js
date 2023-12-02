const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
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
		let copy = JSON.parse(JSON.stringify(users));
		for (c of copy) {
			delete c.password;
		}
		res.json(copy);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/join', isNotLoggedIn, async (req, res, next) => {
	const { nickname, password, age, sex, img_idx } = req.body;
	try {
		const exUser = await User.findOne({ where: { nickname } });
		if (exUser) {
			return res.json({
				result: 'fail',
				message: '이미 존재하는 회원입니다.',
			});
		}
		const hash = await bcrypt.hash(password, 12);
		const new_user = await User.create({
			nickname: nickname,
			password: hash,
			age: age,
			sex: sex,
			img_idx: img_idx,
		});
		return res.json({
			result: 'success',
			message: '회원가입 되었습니다',
			user_id: new_user.id,
		});
	} catch (err) {
		console.error(err);
		return next(err);
	}
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.json({
				result: 'fail',
				message: info.message,
			});
		}
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.json({
				result: 'success',
				message: '로그인 성공',
				user_id: user.id,
			});
		});
	})(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		} else {
			req.session.destroy();
			res.json({
				result: 'success',
				message: '로그아웃 되었습니다',
			});
		}
	});
});

// Update user
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await User.update(req.body, {
			where: {
				id: id,
			},
			returning: true, // 업데이트 후의 결과 반환
		});

		res.json({
			result: 'success',
			message: '수정되었습니다',
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
