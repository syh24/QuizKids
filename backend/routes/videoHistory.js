const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Video = require('../models/video');
const VideoHistory = require('../models/videoHistory');

//get history
router.get('/', async (req, res) => {
	try {
		const { user_id } = req.query;
		const videoHistories = await VideoHistory.findAll({
			include: Video,
			where: {
				...(user_id ? { user_id: user_id } : {}),
			},
		});
		res.json(videoHistories);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//new history
router.post('/', async (req, res) => {
	const videoHistories = new VideoHistory(req.body);
	try {
		await videoHistories.save();
		res.status(201).json({
			result: 'success',
			message: '생성되었습니다',
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
