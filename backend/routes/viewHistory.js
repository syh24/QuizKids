const express = require('express');
const router = express.Router();
const ViewHistory = require('../models/viewHistory');
const Sequelize = require('sequelize');

//유저의 시청기록 추출

router.get('/:user_id', async (req, res) => {

	try {
		const { user_id } = req.params;
		var { video_id, order_by, order_type, count } = req.query;

		count = parseInt(count, 10) || 10000000;
		if (order_by !== undefined && order_type === undefined) order_type = 'DESC';
		if (order_by === undefined && order_type !== undefined) order_by = 'updatedAt';

		var viewHistory;

		if (order_by === undefined && order_type === undefined) {
			viewHistory = await ViewHistory.findAll({
				where: {
					...(user_id ? { user_id: user_id } : {}),
					...(video_id ? { video_id: video_id } : {}),
				},
			});
		}
        else {
			viewHistory = await ViewHistory.findAll({
				where: {
					...(user_id ? { user_id: user_id } : {}),
					...(video_id ? { video_id: video_id } : {}),
				},
				order: [
					[Sequelize.literal(order_by), order_type]
				],
			});
		}

        if (viewHistory[0] === undefined) {
			return res.status(200).json({
				result: 'fail',
				message: '시청기록이 존재하지 않습니다.',
			});
        }
        else {
			var temp = [];
			var temp_index = 0;
			for (v of viewHistory) {
				temp.push(v);

				delete temp[temp_index].dataValues.createdAt;
				delete temp[temp_index].dataValues.updatedAt;
				delete temp[temp_index].dataValues.deletedAt;

				temp_index++;
				if (temp_index === count) break;
			}
            return res.status(200).json(temp);
        }

	} catch (err) {
		return res.status(500).json({ 
            result: 'fail',
            message: err.message,
        });
	}
});


//유저의 시청기록 업데이트

router.post('/', async (req, res) => {

	try {
        const newViewHistory = new ViewHistory(req.body);
		const viewHistory = await ViewHistory.findAll({
			where: {
				...(newViewHistory.user_id ? { user_id: newViewHistory.user_id } : {}),
				...(newViewHistory.video_id ? { video_id: newViewHistory.video_id } : {}),
			},
		});

        if (viewHistory[0] === undefined) {
            await newViewHistory.save();
            var massage = "시청기록 저장이 완료되었습니다.";
            }
        else {
            viewHistory[0].stop_point = newViewHistory.stop_point;
            await viewHistory[0].save();
            var massage = "시청기록 업데이트가 완료되었습니다.";
            }

        return res.status(200).json({
            result: 'success',
            message: massage,
        });

	} catch (err) {
		return res.status(500).json({ 
			result: 'fali',
            message: err.message,
        });
	}
});

module.exports = router;