const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Video = require('./video');
const Quiz = require('./quiz');
const VideoHistory = require('./videoHistory');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Quiz = Quiz;
db.Video = Video;
db.VideoHistory = VideoHistory;

User.init(sequelize);
Video.init(sequelize);
Quiz.init(sequelize);
VideoHistory.init(sequelize);

User.associate(db);
Video.associate(db);
Quiz.associate(db);
VideoHistory.associate(db);

module.exports = db;