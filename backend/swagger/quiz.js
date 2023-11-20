/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       required:
 *         - nickname
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         user_id:
 *           type: integer
 *           description: user id
 *         video_id:
 *           type: integer
 *           description: video id
 *         problem:
 *           type: string
 *           description: 문제 및 선지
 *         answer:
 *           type: interger
 *           description: quiz 답 ex) 4
 *         hit:
 *           type: interger
 *           description: 조회수 (answer_count + wrong_count)
 *         answer_count:
 *           type: interger
 *           description: 정답 횟수
 *         wrong_count:
 *           type: interger
 *           description: 오답 횟수
 *         createdAt:
 *           type: string
 *           format: date
 *           description: user가 생성된 시간
 *       example:
 *         id: 1
 *         user_id: 3
 *         video_id: 5
 *         problem: {"title": "quiz?", "problem": "1. answer1\n2. answer2\n3. answer3\n4. answer4"}
 *         answer: 4
 *         hit: 200
 *         answer_count: 150
 *         wrong_count: 50
 *         createdAt: 2023-11-15T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: The users managing API
 * /api/quiz:
 *   get:
 *     tags: [Quiz]
 *     summary: get all users
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: get all users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Some server error
 *   post:
 *     tags: [Quiz]
 *     summary: create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Some server error
 *
 */