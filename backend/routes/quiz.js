const express = require('express');
const { Video, User } = require('../models');
const router = express.Router();
const Quiz = require('../models/quiz');
const Sequelize = require('sequelize');
const { parse } = require('path');

//추출될 퀴즈 사이의 거리
const minimum_distance = 120;

//퀴즈 조회
router.get('/', async (req, res) => {
	try {
		const { video_id, user_id, count } = req.query;
		var parsedCount = 0;
		parsedCount = parseInt(count, 10) || 100000;
		const quiz = await Quiz.findAll({
			where: {
        ...(user_id ? { user_id: user_id } : {}),
				...(video_id ? { video_id: video_id } : {}),
			},
			//quiz가 등록된 시간순서대로 추출
			order: [
				[Sequelize.literal('CONVERT(quiz_time, SIGNED)'), 'ASC']
			],
		});

		//추후 로직 개선 필요
		var prev_quiz_time, cur_quiz_time, selected_quiz_num;
		const selected_quiz = [];
		var low_problem_set = false;
		console.log(selected_quiz.length)
		console.log(parsedCount)
		while (quiz.length != 0 && selected_quiz.length != parsedCount) {
			//퀴즈간의 간격이 minimum_distance 이상 되도록 설정
			prev_quiz_time = - minimum_distance - 1;
			cur_quiz_time = 0;
			selected_quiz_num = 0;
			temp = 0;
			for (q of quiz) {
				cur_quiz_time = parseInt(q.quiz_time);
				if (cur_quiz_time - prev_quiz_time >= minimum_distance || low_problem_set) {

					if (Math.random() > 0.3) {
						console.log(prev_quiz_time, cur_quiz_time);

						selected_quiz.push(q);
						quiz.splice(temp, 1);
						selected_quiz_num++;
						prev_quiz_time = cur_quiz_time;
					}
				}
				temp++;

				if (selected_quiz.length == parsedCount) {
					break;
				}
			}
			//만약 한바퀴돌고도 다 못찾았다면 랜덤 추출
			if (selected_quiz_num == 0) {
				low_problem_set = true;
			}
		}

		//조회수 증가
		if (selected_quiz.length > 0) {
			for (q of selected_quiz) {
				q.hit++;
				await q.save();
			}
		}
		res.json(selected_quiz);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//퀴즈 생성
router.post('/', async (req, res) => {
	console.log('퀴즈 생성22');
	console.log(req.body);

	const quiz = new Quiz(req.body);
	try {
		await quiz.save();
		res.status(201).json({ message: '생성되었습니다' });
	} catch (err) {
		console.log('퀴즈 생성 실패');
		console.log(err.message);
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
				result: 'success',
				message: '정답입니다',
			});
		} else {
			quiz.wrong_count++;
			await quiz.save();
			res.json({
				result: 'fail',
				message: '오답입니다',
			});
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
