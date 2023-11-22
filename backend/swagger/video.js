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
 *           description: The auto-generated id of the user
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
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: get all videos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
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
 *         description: The created videos.
 *       500:
 *         description: Some server error
 *
 */