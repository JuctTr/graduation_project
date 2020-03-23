const util = require('util'); // node.js本身提供的工具库
const { User } = require('./userModel');
const { generateToken } = require('../utils/util');
const { Permission } = require('../utils/permission');
const axios = require('axios');

/**
 * @description 通过微信官方提供的登录能力方便地获取微信提供的用户身份标识openid以及unionid
 */
class WXManager {
    constructor() {

    }
    /**
     * @param {String} code 小程序中生成的，需要再小程序中测试
     */
    static async codeToToken(code) {
        const {
            loginUrl,
            appId,
            appSecret
        } = global.config.wx;

        const url = util.format(loginUrl, appId, appSecret, code);

        const result = await axios.get(url); // 发送一个HTTP请求，获取相关用户标识

        if (result.status !== 200) {
            throw new global.errors.AuthFailed('openid获取失败');
        }

        const _errCode = result.data.errcode;
        // -1	系统繁忙，此时请开发者稍候再试	
        // 0	请求成功	
        // 40029	code 无效	
        // 45011	频率限制，每个用户每分钟100次
        const _errMsg = result.data.errmsg;
        // 这个不是说只要result.status = 200, 就意味着请求成功，可以说只是可以拿到返回值，所以我们必须再次判断，提示用户
        if (_errCode){
            throw new global.errors.AuthFailed('openid获取失败:' + _errMsg);
        }

        // 拿到 openid 之后，要把它存在数据库中
        // 档案 user uid openid 长
        // 第一次访问服务端，openid 是没有的
        // 登录状态失效了，再次访问，需要查一下数据库，如果有了，就没必要再存入数据库了

        let user = await this.getUserByOpenid(result.data.openid);
        if(!user){
            // 如果查不到用户的openid，则写入数据库
            user = await this.registerByOpenid(result.data.openid);
        }
        
        // 到了这里，说明用户的openid获取成功了，就生成一个token返回
        return generateToken(user.id, Permission.USER);
    }

    /**
     * @description 查询用户的openid
     * @param {String} openid 
     */
    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where:{
                openid
            }
        });
        return user;
    }

    /**
     * @description 创建用户的openid
     * @param {String} openid 
     */
    static async registerByOpenid(openid) {
        return await User.create({
            openid
        });
    }
}

module.exports = {
    WXManager
}