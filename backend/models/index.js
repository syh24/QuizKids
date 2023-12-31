const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Video = require('./video');
const Quiz = require('./quiz');
const ViewHistory = require('./viewHistory')

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Quiz = Quiz;
db.Video = Video;
db.ViewHistory = ViewHistory;

User.init(sequelize);
Video.init(sequelize);
Quiz.init(sequelize);
ViewHistory.init(sequelize);

User.associate(db);
Video.associate(db);
Quiz.associate(db);
ViewHistory.associate(db);

module.exports = db;