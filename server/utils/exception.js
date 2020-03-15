/**
 * @description 全局异常处理模块
 */
const { HttpException } = require('../utils/http-exception');

const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        const isHttpException = error instanceof HttpException;
        const isDev = global.config.environment === 'dev';
        
        // 开发环境中，要抛出异常
        if (isDev && !isHttpException) {
            throw error
        }
        // 这里是处理“已知”异常
        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
        // 处理“未知”异常
        else {
            ctx.body = {
                msg: 'we made a mistake O(∩_∩)O~~',
                error_code: 999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}




module.exports = catchError;