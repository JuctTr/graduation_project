/**
 * @description 环境、数据库账号密码、端口等配置
 */
module.exports = {
    // prod
    environment:'dev',
    database:{
        dbName: 'graduation_project',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
    },
    security:{
        secretKey: "abcdefg", // 这个私有的密钥，在生成环境中是非常的复杂的和具有一定的规律的
        expiredTime: 60*60*24*30 // 令牌的过期时间，项目上线记得把时间设置短一点
    },
    // 服务端请求微信提供的接口，获取openid，下面这些在小程序公众平台和官方文档查找
    wx:{
        appId: 'wx20a7d517f7626a28',
        appSecret: '49ad8d1f3e755ec1ef78ca4c403d6c9e', // 这个不可以明文存在云开发平台，生产环境需要对其处理
        // 这里用%s代替原来的 示例模板，在对应的文件中使用node.js提供的util工具库对url格式化
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
        // loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
    },
    yushu:{
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host: 'http://localhost:3000/'
}