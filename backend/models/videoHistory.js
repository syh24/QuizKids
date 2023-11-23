const Sequelize = require('sequelize');

module.exports = class VideoHistory extends Sequelize.Model {
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
            video_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'VideoHistory',
            tableName: 'video_history',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(models) {
        VideoHistory.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });

        VideoHistory.belongsTo(models.Video, {
            foreignKey: 'video_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });
    }
};