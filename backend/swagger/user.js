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
 *         img_idx:
 *           type: integer
 *           description: image index
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
 *         img_idx: 3
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
 * /api/users/{user_id}:
 *   put:
 *     tags: [Users]
 *     summary: update user
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               nickname: test_nick
 *               age: 20
 *               sex: M
 *               img_idx: 2
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 message: 수정되었습니다 
 * /api/users/join:
 *   post:
 *     tags: [Auth]
 *     summary: user join
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               nickname: test_nick
 *               age: 20
 *               sex: M
 *               img_idx: 3
 *               password: 1234abc
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 message: 회원가입 되었습니다
 * /api/users/login:
 *   post:
 *     tags: [Auth]
 *     summary: user login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               nickname: test_nick
 *               password: 1234abc
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 message: 로그인 성공
 * /api/users/logout:
 *   get:
 *     tags: [Auth]
 *     summary: user logout
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 message: 로그아웃 되었습니다
 *
 */