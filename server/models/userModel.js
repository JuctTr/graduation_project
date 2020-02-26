const  { sequelize }  = require('../config/dbConfig');

const bcrypt = require('bcryptjs');

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
        type: Sequelize.STRING,
        /**
         * 把密码加密，后面这个10（位数） ，是生成盐的成本，不能乱设置，设置过大会耗尽服务器资源
         * 1、对两个相同的代码，加密后的密码是不一样的
         * 2、可以避免彩虹攻击
         */         
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            const encryptPassword = bcrypt.hashSync(val, salt);
            this.setDataValue("password", encryptPassword); // 这个方法是sequelize插件中的
        }
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