/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - nickname
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the video
 *         user_id:
 *           type: string
 *           description: 유저 id
 *         name:
 *           type: string
 *           description: 제목
 *         thumbnail:
 *           type: string
 *           description: 썸네일 이미지
 *         url_link:
 *           type: string
 *           description: 비디오 링크
 *         createdAt:
 *           type: string
 *           format: date
 *           description: 비디오가 생성된 시간
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: 비디오가 수정된 시간
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: 비디오가 삭제된 시간
 *       example:
 *         id: 1
 *         user_id: 2
 *         name: 재밌는 영상
 *         thumbnail: image.png
 *         url_link: http://test.img
 *         createdAt: 2023-11-15T04:05:06.157Z
 *         updatedAt: 2023-11-15T04:05:06.157Z
 *         deletedAt: 2023-11-15T04:05:06.157Z
 *         User:
 *           id: 1
 *           nickname: test_nick
 *           age: 20
 *           sex: M
 *           img_idx: 3
 *           createdAt: 2023-11-15T04:05:06.157Z
 *           updatedAt: 2023-11-15T04:05:06.157Z
 *           deletedAt: 2023-11-15T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: The video managing API
 * /api/videos:
 *   get:
 *     tags: [Videos]
 *     summary: get all videos
 *     parameters:
 *       - in: path
 *         name: video_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: 비디오 id
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: 유저 id
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: 비디오명
 *       - in: path
 *         name: order_by
 *         schema:
 *           type: string
 *         required: false
 *         description: ordering할 attribute 이름
 *       - in: path
 *         name: order_type
 *         schema:
 *           type: string
 *         required: false
 *         description: ordering할 방식
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: false
 *         description: 추출할 row 개수
 *     responses:
 *       200:
 *         description: get all videos.
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 id: 3
 *                 user_id: 2
 *                 name: 재밌는 영상
 *                 thumbnail: image.png
 *                 url_link: https://youtu.be/7F33b2eK4
 *                 hit: 3
 *                 User:
 *                   id: 2
 *                   nickname: 샌즈TV
 *                   img_idx: 2
 *       500:
 *         description: Some server error
 *   post:
 *     tags: [Videos]
 *     summary: create videos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               user_id: 2
 *               name: 재밌는 영상
 *               thumbnail: image.png
 *               url_link: http://test.img
 *     responses:
 *       200:
 *         description: add quiz.
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 message: 생성되었습니다
 *       500:
 *         description: Some server error
 *
 */