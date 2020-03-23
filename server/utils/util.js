const jwt = require('jsonwebtoken');

/**
 * 生成Token的函数
 * @param {String} uid 用户id
 * @param {*} scope 用户权限分级
 */
function generateToken (uid, scope){
    const secretKey = global.config.security.secretKey;
    const expiredTime = global.config.security.expiredTime;
    /**
     * @param {Object} 用户信息
     * @param {String} secret 私有的密钥
     * @param options 可选的参数值
     * @description 用来生成令牌的函数
     */
    const token = jwt.sign({ 
        uid,
        scope
    },secretKey,{
        expiresIn: expiredTime
    })
    return token;
}

/**
 * 
 */
function findMembers (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}


module.exports = {
    findMembers,
    generateToken,
}