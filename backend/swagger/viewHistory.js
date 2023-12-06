/**
 * @swagger
 * components:
 *   schemas:
 *     ViewHistory:
 *       type: object
 *       required:
 *         - nickname
 *       properties:
 *         user_id:
 *           type: integer
 *           description: 유저 id
 *         video_id:
 *           type: integer
 *           description: 비디오 id
 *         stop_point:
 *           type: integer
 *           description: 마지막 비디오 시청 지점
 *         createdAt:
 *           type: string
 *           format: date
 *           description: 시청기록이 생성된 시간
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: 시청기록이 수정된 시간
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: 시청기록이 삭제된 시간
 *       example:
 *         user_id: 2
 *         video_id: 1
 *         stop_point: 173
 *         createdAt: 2023-11-15T04:05:06.157Z
 *         updatedAt: 2023-11-15T04:05:06.157Z
 *         deletedAt: 2023-11-15T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: ViewHistories
 *   description: The user's view history managing API
 * /api/viewHistories:
 *   get:
 *     tags: [ViewHistories]
 *     summary: get user's view histories
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 유저 id
 *       - in: path
 *         name: video_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 비디오 id
 *     responses:
 *       200:
 *         description: get user view histories
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 user_id: 2
 *                 video_id: 1
 *                 stop_point: 1
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: fail
 *                 message: err.message
 *   post:
 *     tags: [ViewHistories]
 *     summary: create user's view history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               user_id: 2
 *               video_id: 1
 *               stop_point: 613
 *     responses:
 *       200:
 *         description: add view history.
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 message: 시청기록 저장이 완료되었습니다.
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: fail
 *                 message: err.message
 *
 */
