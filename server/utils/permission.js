/**
 * @description 1、管理用户权限分级
 *              2、验证前端用户传过来的token是否有效的中间件
 */

const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Permission {
    constructor(level) {
        /*
            1、用户权限分级
            2、给每一个请求（api）都设置一个权限级别
            3、如果前台过来的请求的权限级别 >= api所在的级别，说明可以访问
        */ 
        this.level = level || 1 // 用户传入的api的权限级别，默认为 1
        Permission.USER = 8 // 普通用户
        Permission.ADMIN = 16 // 管理员
        Permission.SUPER_ADMIN = 32 // 超级管理员（根据项目需求添加）
    }

    get isCorrectToken () {
        return async (ctx, next) => {
            
            const userToken = basicAuth(ctx.req);
            let errMsg = 'token不合法';

            // 1、用户token不存在、不合法

            if (!userToken || !userToken.name) {
                throw new global.errors.Forbbiden(errMsg);
            }

            // 2、合法性校验

            try {
                /**
                 * @returns {Object} { uid: 1, scope: 2, iat: 1584884307, exp: 1587476307 }
                 */
                var decode = jwt.verify(userToken.name, global.config.security.secretKey);
                console.log(decode, '验证token是否有效')
            } catch (error) {
                // token过期了
                if (error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期';
                }
                // 前台乱传一个token，直接抛出不合法
                throw new global.errors.Forbbiden(errMsg);
            }

            // 3、权限的校检

            if(decode.scope < this.level){
                errMsg = '你没有权限访问哦~';
                throw new global.errors.Forbbiden(errMsg);
            }

            // 把 uid,scope 挂载到ctx对象，以后可以直接使用
            ctx.auth = {
                uid: decode.uid, // 用户id
                scope: decode.scope // 用户权限
            }

            await next()
        }
    }

    static verifyToken (token) {
        try{
            jwt.verify(token, global.config.security.secretKey);
            return true;
        }
        catch (error){
            return false;
        }

    }
}

module.exports = {
    Permission
}