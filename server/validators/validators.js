/**
 * @description 接口数据的校检，每一个router请求都要通过校检
 * @returns {Object} 各个类型的校检
 */
const { Rule, LinValidator } = require('../utils/lin-validator');
const { User } = require('../models/userModel');
const {
    LoginType,
    JournalType
} = require('./enumType');
/**
 * 参数规范
 */
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '参数必须的正整数')
        ]
    }
}

/**
 * 注册校验
 */
class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ];
        this.password = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ];
        this.confirmPassword = this.password;
        this.email = [
            new Rule('isEmail', '不符合Email规范~')
        ];
    }
    // 确认两个密码是否一致
    validatePassword(vals) {
        const psw1 = vals.body.password
        const psw2 = vals.body.confirmPassword
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }
}

/**
 * @description 令牌颁发
 */
class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            /**
             *  登录多元化：
             * 1、账号和密码登录
             * 2、小程序不需要密码，应该你在登录微信时，微信已经帮你验证是一个正常的用户
             * 3、手机号登录
             */
            new Rule('isOptional'), // 可选值（这个secret可以传也可以不传），这个是LinValidator自定义的函数，不是validator.js的
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]

    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

/**
 * 
 */
class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
    }
}

class LikeValidator extends PositiveIntegerValidator { // 这里继承PositiveIntegerValidator只会检查id字段
    constructor() {
        super();
        this.validateType = checkJournalType;
    }

}

function checkJournalType(vals) {
    let type = vals.body.type || vals.path.type;

    if (!type) {
        throw new Error('type是必须参数')
    }
    type = parseInt(type);
    if (!JournalType.isThisType(type)) {
        throw new Error('type参数不合法')
    }
}

class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', '搜索关键词不能为空', {
                min: 1,
                max: 16
            })
        ]
        this.start = [
            new Rule('isInt', '不符合规范', {
                min: 0,
                max: 60000
            }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', '不符合规范', {
                min: 1,
                max: 20
            }),
            new Rule('isOptional', '', 20)
        ]

    }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '必须在1到12个字符之间', {
                min: 1,
                max: 12
            })
        ]
    }
}
/**
 * @description 发表动态页面
 */
class PublishValidator extends LinValidator {
    constructor() {
        super()
        this.title = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
        this.content = [
            new Rule('isLength', '必须在1到30个字符之间', {
                min: 1,
                max: 30
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    SearchValidator,
    AddShortCommentValidator,
    PublishValidator
}