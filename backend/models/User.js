const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nickname: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sex: {
              type: Sequelize.STRING(5),
              allowNull: false,
          },

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
    static associate(models) {
        User.hasMany(models.Video, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'CASCADE',
        });

        User.hasMany(models.Quiz, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'CASCADE',
        });
    }
};