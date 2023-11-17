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
 *           description: 성별 M=남자 F=여자
 *         createdAt:
 *           type: string
 *           format: date
 *           description: user가 생성된 시간
 *       example:
 *         id: 1
 *         nickname: test_nick
 *         age: 20
 *         sex: M
 *         createdAt: 2023-11-15T04:05:06.157Z
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
 *     requestBody:
 *       required: false
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Some server error
 *
 */