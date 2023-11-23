const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'nickname',
        passwordField: 'password',
    }, async (nickname, password, done) => {
        try {
            const exUser = await User.findOne( {where: { nickname } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));

    //로그인 시 실행
    passport.serializeUser((user, done) => {
        //done 함수의 첫 번째 인수는 에러 발생시 사용
        done(null, user);
    });

    //매 요청 시 실행
    passport.deserializeUser(async (user, done) => {
        try {
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}