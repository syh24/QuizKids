const request = require('supertest');
const express = require('express');
const router = require('../app');
const { sequelize } = require('../models');

const app = express();
app.use(express.json());
app.use('/', router);

const ViewHistory = require('../models/viewHistory');
const Video = require('../models/video');
const User = require('../models/user');

let req;

//시작전 테스트디비 연동 테스트가 끝나면 데이터베이스 데이터 모두 초기화
beforeAll(async () => {
    await sequelize.sync({force:true, truncate:true});

    req = {
        user_id: 1,
        video_id: 1,
        stop_point: 8,
    };
});

describe('POST /api/viewHistories', () => {
    it('create view history', async () => {
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
                .post('/api/viewHistories')
                .send(req);

            expect(res.statusCode).toBe(200);
            expect(res.body.result).toEqual("success");

        } catch (err) {
            console.log(err);
            expect(err).toBeDefined();
        }
    });
});

describe('GET /api/viewHistories/1', () => {
  it('get view histories', async () => {
    try {
        //api 통신
        //supertest의 request 객체를 사용하면 실제 서버를 열지 않고도 테스트 가능
        const res = await request(app)
            .get('/api/viewHistories/1');
        
        expect(res.statusCode).toBe(200);
        expect(res.body[0].user_id).toEqual(req.user_id);
        expect(res.body[0].video_id).toEqual(req.video_id);
        expect(res.body[0].stop_point).toEqual(req.stop_point);
    } catch (err) {
        console.log(err);
        expect(err).toBeDefined();
    }
  });
});

afterAll(async () => {
    await sequelize.close(); // 테스트 종료 후 데이터베이스 연결을 닫음
  });