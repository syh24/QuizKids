const Sequelize = require('sequelize');

module.exports = class ViewHistory extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true
            },
            video_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            stop_point: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'viewHistory',
            tableName: 'view_history',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(models) {
        ViewHistory.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });

        ViewHistory.belongsTo(models.Video, {
            foreignKey: 'video_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });
    }
};