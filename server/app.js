const Koa = require('koa');
const requireDirectory = require('require-directory');
const Router = require('koa-router');
// 中间件
const bodyParser = require('koa-bodyparser');

const catchError = require('./utils/exception'); // 全局异常处理

const app = new Koa();

app.use(bodyParser());
app.use(catchError); // 全局异常处理

/**
 * 加载全局配置项
 * @description 一些环境的配置，全局异常等
 */
const configPath = process.cwd() + '/config/config.js';
const _config = require(configPath);
global.config = _config;

const _errors = require('./utils/http-exception');
global.errors = _errors;

/**
 * @param {Object} module
 * @param {String} 路径，可以单独加载一个文件'./routes/v1'，也可以整一个文件加载'.routes'
 * @param {Object} 加载完路由模块之后，执行的一个回调函数
 * @description 路由的自动注册，就是自动加载routes文件中的各个路由模块
 */
var reqRouteUrl = `${process.cwd()}/routes`;

requireDirectory(module, reqRouteUrl, {
    visit: afterLoadModule
})
/**
 * @param {Object} 这里只是针对一个对象的处理，要是路由模块中导出多个对象，这里应该如何处理？
 */
function afterLoadModule (obj) {
    if (obj instanceof Router) {
        app.use(obj.routes());
    }
}


app.listen(8081);