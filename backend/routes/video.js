const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const User = require('../models/user');
const Video = require('../models/video');
const ViewHistory = require('../models/viewHistory');
const { sequelize } = require('../models');

router.get('/', async (req, res) => {
	try {
		var { video_id, name, user_id, order_by, order_type, count } = req.query;

		count = parseInt(count, 10) || 10000000;
		order_type = order_type ? order_type : 'asc';
		let video_ids = video_id ? video_id.split(',').map(Number) : [];

		let video = await Video.findAll({
			include: [
				{
					model: User,
					attributes: ['id', 'nickname', 'age', 'sex', 'img_idx', 'createdAt'],
				},
			],
			where: {
				...(video_id ? { id: video_ids } : {}),
				...(user_id ? { user_id: user_id } : {}),
				...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
			},
			order: [...(order_by ? [[order_by, order_type]] : [])],
			attributes: ['id', 'user_id', 'name', 'thumbnail', 'url_link', 'hit', 'createdAt'],
			limit: count,
		});

		//조회수 증가
		if (video_id && video.length > 0) {
			const selectedVideo = video[0];
			selectedVideo.hit++;
			await selectedVideo.save();
		}

		res.status(200).json(video);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/', async (req, res) => {
	const video = new Video(req.body);
	try {
		await video.save();
		res.status(200).json({
			result: 'success',
			message: '생성되었습니다',
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.get('/:id/favorite', async (req, res) => {
	try {
    const { id } = req.params;

    const sqlQuery = `
      SELECT COUNT(videos.user_id) as cnt, videos.user_id, users.nickname
      FROM videos
      JOIN (
        SELECT * FROM view_history
        WHERE view_history.user_id = ${id}
      ) AS tmp
      ON tmp.video_id = videos.id
      join users on users.id = videos.user_id
      GROUP BY videos.user_id
      ORDER BY cnt desc
      LIMIT 1
    `;
    const result = await sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT });
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
