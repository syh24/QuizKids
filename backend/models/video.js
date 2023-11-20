const Sequelize = require('sequelize');

module.exports = class Video extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            thumbnail: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            url_link: {
              type: Sequelize.STRING(255),
              allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Video',
            tableName: 'videos',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};