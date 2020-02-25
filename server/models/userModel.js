const  { sequelize }  = require('../config/dbConfig');

const {
    Sequelize,
    Model
} = require('sequelize');

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,   // 主键，唯一的
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,  // 传入一个实例
    tableName: 'user'   // 数据库的一个表名
})

module.exports = {
    User
}