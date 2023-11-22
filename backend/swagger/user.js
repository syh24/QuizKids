/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nickname
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         nickname:
 *           type: string
 *           description: 유저 닉네임
 *         age:
 *           type: string
 *           description: 나이
 *         sex:
 *           type: string
 *           description: 성별 M=남자, F=여자
 *         createdAt:
 *           type: string
 *           format: date
 *           description: user가 생성된 시간
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: user가 수정된 시간
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: user가 삭제된 시간
 *       example:
 *         id: 1
 *         nickname: test_nick
 *         age: 20
 *         sex: M
 *         createdAt: 2023-11-15T04:05:06.157Z
 *         updatedAt: 2023-11-15T04:05:06.157Z
 *         deletedAt: 2023-11-15T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: get all users
 *     parameters:
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
 *         description: 유저명
 *     responses:
 *       200:
 *         description: get all users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *   post:
 *     tags: [Users]
 *     summary: create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               nickname: test_nick
 *               age: 20
 *               sex: M
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Some server error
 *
 */