const Koa = require('koa');
const requireDirectory = require('require-directory');
const Router = require('koa-router');
// 中间件
const bodyParser = require('koa-bodyparser');
// 处理异常
const catchError = require('./utils/exception');

const app = new Koa();
app.use(bodyParser());
app.use(catchError);


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
 * 
 * @param {Object} 这里只是针对一个对象的处理，要是路由模块中导出多个对象，这里应该如何处理？
 */
function afterLoadModule (obj) {
    if (obj instanceof Router) {
        app.use(obj.routes());
    }
}


app.listen(8081);