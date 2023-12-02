const express = require('express');
const { Video, User } = require('../models');
const router = express.Router();
const Quiz = require('../models/quiz');
const Sequelize = require('sequelize');

//추출될 퀴즈 사이의 거리
const minimum_distance = 120;

//퀴즈 조회
router.get('/', async (req, res) => {
	try {
		const { video_id, count } = req.query;

		const parsedCount = parseInt(count, 10) || 0;
		const quiz = await Quiz.findAll({
			where: {
				...(video_id ? { video_id: video_id } : {}),
			},
			//quiz가 등록된 시간순서대로 추출
			order: Sequelize.fn('STR_TO_DATE', Sequelize.col('quiz_time'), '%H:%i'),
		});


		//추후 로직 개선 필요
		var prev_quiz_time, cur_quiz_time, selected_quiz_num;
		const selected_quiz = [];
		var low_problem_set = false;
		
		while (quiz.length != 0 && selected_quiz.length != parsedCount) {
			//퀴즈간의 간격이 minimum_distance 이상 되도록 설정
			prev_quiz_time = - minimum_distance - 1;
			cur_quiz_time = 0;
			selected_quiz_num = 0;
			temp = 0;
			for (q of quiz) {
				//시간 입력이 "분:초" 일때만 고려, "시:분:초" 는 고려하지 않음
				cur_quiz_time = parseInt(q.quiz_time.split(':')[0]) * 60 
								+ parseInt(q.quiz_time.split(':')[1]);
				console.log("abcd", cur_quiz_time);
				if (cur_quiz_time - prev_quiz_time >= minimum_distance || low_problem_set) {
					console.log("efgh", cur_quiz_time); 

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
			console.log(selected_quiz_num);
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
			

			res.json(selected_quiz);
		}
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
		res.status(201).json(quiz);
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
