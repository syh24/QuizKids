const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Video = require('./video');
const Quiz = require('./quiz');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Quiz = Quiz;
db.Video = Video;

User.init(sequelize);
Video.init(sequelize);
Quiz.init(sequelize);


module.exports = db;