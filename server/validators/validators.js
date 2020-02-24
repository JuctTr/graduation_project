const { Rule, LinValidator } = require('../utils/lin-validator');

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