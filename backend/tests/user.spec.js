
const request = require('supertest');
const express = require('express');
const router = require('../app');
const { sequelize } = require('../models');

const app = express();
app.use(express.json());
app.use('/', router);

const User = require('../models/user');
[]

//시작전 테스트디비 연동 테스트가 끝나면 데이터베이스 데이터 모두 초기화
beforeAll(async () => {
    await sequelize.sync({force:true, truncate:true});
});

describe('GET /', () => {
  it('should respond with JSON containing a list of users', async () => {
    try {
        //테스트 유저 생성
        let mockUser = await User.create({
            nickname: "test_1",
            password: "1234",
            age: 1,
            sex: "M",
            img_idx: 0,
        });
        //api 통신
        //supertest의 request 객체를 사용하면 실제 서버를 열지 않고도 테스트 가능
        const res = await request(app)
            .get('/api/users');
        
        expect(res.statusCode).toBe(200);
        expect(res.body[0].id).toEqual(mockUser.toJSON().id);
    } catch (err) {
        console.log(err);
        expect(error).toBeDefined();
    }
  });

  // 다른 테스트 케이스 추가 가능
});

afterAll(async () => {
    await sequelize.close(); // 테스트 종료 후 데이터베이스 연결을 닫음
  });