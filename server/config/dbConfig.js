/**
 * @description 定义存入数据库的数据形式、个性化配置
 * @returns {Object} 返回一个个性化对象用于Model层操作数据库
 */
const {
    Sequelize,
    Model,
} = require('sequelize');
const { unset, clone, isArray } = require('lodash');

const {
    dbName,
    host,
    port,
    user,
    password
} = require('./config').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true, // 这个为true，执行的时候，才会在控制台打出相应的数据库语句
    timezone: '+08:00',
    define: {   // 个性化配置
        timestamp: true, // create_time、uptate_time
        paranoid: true,  // delete_time
        createdAt: 'created_at', // 把字段名字改成自定义的
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true, // 把所有的驼峰命名式的字段变成下划线的
        scopes: { // 全局scopes，去掉三个时间字段
            removeTime: {
                attributes: {
                    exclude: ['updated_at', 'created_at', 'deleted_at']
                }
            }
        }
    }
})

sequelize.authenticate()
    .then(() => {
        console.log('数据库已经连接成功了');
    })
    .catch(err => {
        console.error('数据库连接失败：', err);
    });

// 只有这个方法，models层的代码才会往数据库中加入东西
sequelize.sync({
    force: false // 这个为true的时候，重新执行时，会删除整一个数据表，重新创建一个，所以这个不要随便加
});

/**
 * @description 处理数据库中的图片目录，在他们前面加host，在返回给前端
 */
Model.prototype.toJSON = function () {
    let data = clone(this.dataValues);
    unset(data, 'updated_at');
    unset(data, 'created_at');
    unset(data, 'deleted_at');

    for (key in data) {
        if (key === 'image' || key === 'back_image') {
            if (data[key] != null && !data[key].startsWith('http'))
                data[key] = global.config.host + data[key];
        }
    }

    if (isArray(this.exclude)) {
        this.exclude.forEach(
            (value) => {
                unset(data, value)
            }
        )
    }
    return data;
}

module.exports = {
    sequelize
}