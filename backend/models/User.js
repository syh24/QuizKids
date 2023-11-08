const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nickname: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
};