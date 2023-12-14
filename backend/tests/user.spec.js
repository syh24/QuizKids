
const request = require('supertest');
const express = require('express');
const router = require('../app');
const { sequelize } = require('../models');

const app = express();
app.use(express.json());
app.use('/', router);

const User = require('../models/user');

let req;

//시작전 테스트디비 연동 테스트가 끝나면 데이터베이스 데이터 모두 초기화
beforeAll(async () => {
    await sequelize.sync({force:true, truncate:true});

    req = {
        nickname: "test_1",
        password: "1234",
        age: 1,
        sex: "M",
        img_idx: 0,
    };
});

describe('POST /api/users/join', () => {
    it('should respond with JSON containing a list of users', async () => {
      try {
          //api 통신
          //supertest의 request 객체를 사용하면 실제 서버를 열지 않고도 테스트 가능
          const res = await request(app)
              .post('/api/users/join')
              .send(req);

          let tmp_user = await User.findByPk(res.body.user_id);

          expect(res.statusCode).toBe(200);
          expect(res.body.result).toEqual("success");
          expect(tmp_user.nickname).toEqual(req.nickname);
      } catch (err) {
          console.log(err);
          expect(error).toBeDefined();
      }
    });

  });

describe('GET /api/users', () => {
  it('should respond with JSON containing a list of users', async () => {
    try {
        //api 통신
        //supertest의 request 객체를 사용하면 실제 서버를 열지 않고도 테스트 가능
        const res = await request(app)
            .get('/api/users');
        
        expect(res.statusCode).toBe(200);
        expect(res.body[0].nickname).toEqual(req.nickname);
        expect(res.body[0].age).toEqual(req.age);
        expect(res.body[0].sex).toEqual(req.sex);
        expect(res.body[0].img_idx).toEqual(req.img_idx);
    } catch (err) {
        console.log(err);
        expect(error).toBeDefined();
    }
  });
});

describe('GET /api/users/logout', () => {
    it('logout user', async () => {
      try {
          const res = await request(app)
              .get('/api/users/logout');
          
          expect(res.statusCode).toBe(200);
          expect(res.body.result).toEqual("success");
      } catch (err) {
          console.log(err);
          expect(error).toBeDefined();
      }
    });
  });

describe('PUT /api/users/1', () => {
    it('update user', async () => {
      try {
          req.nickname = "test_update";
          req.age = 2;
          req.sex = "F";
          req.img_idx = 1;

          const res = await request(app)
              .put('/api/users/1')
              .send(req);
          
          expect(res.statusCode).toBe(200);
          expect(res.body.result).toEqual("success");
      } catch (err) {
          console.log(err);
          expect(error).toBeDefined();
      }
    });
  });

afterAll(async () => {
    await sequelize.close(); // 테스트 종료 후 데이터베이스 연결을 닫음
  });