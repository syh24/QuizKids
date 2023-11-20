const Sequelize = require('sequelize');

module.exports = class Quiz extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            video_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            problem: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            answer: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            hit: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            answer_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            wrong_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            quiz_json: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Quiz',
            tableName: 'quiz',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};