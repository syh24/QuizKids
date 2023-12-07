const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const User = require('../models/user');
const Video = require('../models/video');

router.get('/', async (req, res) => {
  try {
    var { video_id, name, user_id, order_by, order_type, count } = req.query;

		count = parseInt(count, 10) || 10000000;
		if (order_by !== undefined && order_type === undefined) order_type = 'DESC';
		if (order_by === undefined && order_type !== undefined) order_by = 'updatedAt';

    var video;
    if (order_by === undefined && order_type === undefined) {
       video = await Video.findAll({
        include: User,
        where: {
          ...(video_id ? { id: video_id } : {}),
          ...(user_id ? { user_id: user_id } : {}),
          ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
        },
      });
    }
    else {
      video = await Video.findAll({
       include: User,
       where: {
         ...(video_id ? { id: video_id } : {}),
         ...(user_id ? { user_id: user_id } : {}),
         ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
       },
       order: [
         [Sequelize.literal(order_by), order_type]
       ],
     });
    }

    //조회수 증가
    if (video_id && video.length > 0) {
      const selectedVideo = video[0];
      selectedVideo.hit++;
      await selectedVideo.save();
    }

    var temp = [];
    var temp_index = 0;
    for (v of video) {
      temp.push(v);

      delete temp[temp_index].dataValues.createdAt;
      delete temp[temp_index].dataValues.updatedAt;
      delete temp[temp_index].dataValues.deletedAt;
      delete temp[temp_index].dataValues.User.dataValues.password;
      delete temp[temp_index].dataValues.User.dataValues.age;
      delete temp[temp_index].dataValues.User.dataValues.sex;
      delete temp[temp_index].dataValues.User.dataValues.createdAt;
      delete temp[temp_index].dataValues.User.dataValues.updatedAt;
      delete temp[temp_index].dataValues.User.dataValues.deletedAt;

      temp_index++;
      if (temp_index === count) break;
    }

    res.status(200).json(temp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/', async (req, res) => {
  const video = new Video(req.body);
  try {
    await video.save();
    res.status(201).json({
      "result": "success",
      "message": "생성되었습니다"
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;