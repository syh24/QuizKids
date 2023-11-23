/**
 * @swagger
 * components:
 *   schemas:
 *     VideoHistory:
 *       type: object
 *       required:
 *         - nickname
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the video history
 *         user_id:
 *           type: integer
 *           description: 유저 id
 *         video_id:
 *           type: integer
 *           description: 비디오 id
 *       example:
 *         id: 1
 *         user_id: 2
 *         video_id: 1
 *         createdAt: 2023-11-15T04:05:06.157Z
 *         updatedAt: 2023-11-15T04:05:06.157Z
 *         deletedAt: 2023-11-15T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: VideoHistories
 *   description: The video history managing API
 * /api/videoHistories:
 *   get:
 *     tags: [VideoHistories]
 *     summary: get user video histories
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 유저 id
 *     responses:
 *       200:
 *         description: get user video histories
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 id: 1
 *                 user_id: 2
 *                 video_id: 1
 *                 createdAt: 2023-11-15T04:05:06.157Z
 *                 updatedAt: 2023-11-15T04:05:06.157Z
 *                 deletedAt: 2023-11-15T04:05:06.157Z
 *                 Video:
 *                   id: 1
 *                   user_id: 2
 *                   name: 재밌는 영상
 *                   thumbnail: image.png
 *                   url_link: http://test.img
 *                   hit: 0
 *                   createdAt: 2023-11-15T04:05:06.157Z
 *                   updatedAt: 2023-11-15T04:05:06.157Z
 *                   deletedAt: 2023-11-15T04:05:06.157Z
 *       500:
 *         description: Some server error
 *   post:
 *     tags: [VideoHistories]
 *     summary: create video history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               user_id: 2
 *               video_id: 1
 *     responses:
 *       200:
 *         description: The created video history.
 *       500:
 *         description: Some server error
 *
 */