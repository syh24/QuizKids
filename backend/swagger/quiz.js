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
 *           description: The auto-generated id of the quiz
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
 *           description: 퀴즈가 생성된 시간
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: 퀴즈가 수정된 시간
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: 퀴즈가 삭제된 시간
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
 *         updatedAt: 2023-11-15T04:05:06.157Z
 *         deletedAt: 2023-11-15T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: The quiz managing API
 * /api/quiz:
 *   get:
 *     tags: [Quiz]
 *     summary: get all quizes
 *     parameters:
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: false
 *         description: 가져올 퀴즈 개수
 *     responses:
 *       200:
 *         description: get quiz.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Some server error
 *   post:
 *     tags: [Quiz]
 *     summary: create quiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               user_id: 3
 *               video_id: 5
 *               problem: {"title": "quiz?", "problem": "1. answer1\n2. answer2\n3. answer3\n4. answer4"}
 *               answer: 4
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
 * /api/quiz/{quiz_id}/answer:
 *   post:
 *     tags: [Quiz]
 *     summary: check answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               answer: 4
 *     responses:
 *       200:
 *         description: check answer
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 result: success
 *                 message: 정답입니다
 *       500:
 *         description: Some server error
 *
 */
