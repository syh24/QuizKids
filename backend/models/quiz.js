const Sequelize = require('sequelize');

module.exports = class Quiz extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user: {
                type: Sequelize.STRING(40),
                allowNull: true,
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