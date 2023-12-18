const request = require('supertest');
const express = require('express');
const router = require('../app');
const { sequelize } = require('../models');

const app = express();
app.use(express.json());
app.use('/', router);

const Quiz = require('../models/quiz');
const Video = require('../models/video');
const User = require('../models/user');

let req;

//시작전 테스트디비 연동 테스트가 끝나면 데이터베이스 데이터 모두 초기화
beforeAll(async () => {
    await sequelize.sync({force:true, truncate:true});

    req = {
        user_id: 1,
        video_id: 1,
        problem: "문제\n선택지1\n선택지2\n선택지3\n선택지4",
        quiz_time: "8",
        answer: 1,
    };
});

describe('POST /api/quiz', () => {
    it('create quiz', async () => {
        try {
            //api 통신
            //supertest의 request 객체를 사용하면 실제 서버를 열지 않고도 테스트 가능
            await User.create({
                nickname: "test",
                password: "1234",
                age: 1,
                sex: "F",
                img_idx: 0,
            });
            await Video.create({
                user_id: 1,
                name: "재밌는4",
                thumbnail: "image.png",
                url_link: "http://test.img"
            })

            const res = await request(app)
                .post('/api/quiz')
                .send(req);

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toEqual("생성되었습니다");

        } catch (err) {
            console.log(err);
            expect(err).toBeDefined();
        }
    });
});

describe('GET /api/quiz', () => {
  it('get all quizes', async () => {
    try {
        //api 통신
        //supertest의 request 객체를 사용하면 실제 서버를 열지 않고도 테스트 가능
        const res = await request(app)
            .get('/api/quiz');
        
        expect(res.statusCode).toBe(200);
        expect(res.body[0].user_id).toEqual(req.user_id);
        expect(res.body[0].video_id).toEqual(req.video_id);
        expect(res.body[0].problem).toEqual(req.problem);
        expect(res.body[0].quiz_time).toEqual(req.quiz_time);
        expect(res.body[0].answer).toEqual(req.answer);
    } catch (err) {
        console.log(err);
        expect(err).toBeDefined();
    }
  });
});

afterAll(async () => {
    await sequelize.close(); // 테스트 종료 후 데이터베이스 연결을 닫음
  });