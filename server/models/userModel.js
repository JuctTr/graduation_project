/**
 * Model层
 * @description 用户注册操作数据库文件
 * @returns {Object} 用户模型
 */

const { sequelize }  = require('../config/dbConfig');

const bcrypt = require('bcryptjs'); // 密码加密

const {
    Sequelize,
    Model
} = require('sequelize');

class User extends Model {
    /**
     * @param {String} email 用户邮箱
     * @param {String} plainPassword 用户的普通密码（未加密）
     * @description 验证获取token(令牌)的邮箱密码
     */
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        });
        // 如果数据库中查询不到这个账号
        if (!user) {
            throw new global.errors.AuthFailed('账号不存在');
        }
        // 查询得到账号，则需要验证密码的准确性。
        // 因为用户输入的密码是没有加过密的，而数据库中的密码是加过密的，所以需要借助bcryptjs
        const isCorrect = bcrypt.compareSync(plainPassword, user.password);
        if(!isCorrect){
            throw new global.errors.AuthFailed('密码不正确');
        }
        return user;
    }
}
/**
 * 问题：
 * 1、并发问题：假如1000个用户同时注册，id号可能会重复
 */
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,   // 主键，唯一的
        autoIncrement: true // 自动增加
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