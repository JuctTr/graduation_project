const { sequelize }  = require('../config/dbConfig');
const {
    Sequelize,
    Model,
} = require('sequelize');
const { CommonModel } = require('./commonModel');

class Favor extends Model {
    /**
     * @param {Number} art_id 卡片id
     * @param {Number} type 卡片类型
     * @param {Number} uid 用户id
     */
    static async like(art_id, type, uid) {
        /**
         * 两个操作，1、如果有人点赞，就往favor数据表添加一条记录
         *          2、去其他表中使fav_nums这个字段+1
         * 知识点：数据库事务，保证数据的一致性，要不就都改变，要不就都不改变
         * 逻辑：1.先查询favor数据库表中有没有这条记录了
         *       2.没有的话，往favor数据表中插入这一条记录
         */
        const favor = await Favor.findOne({ 
            where: {
                art_id,
                type,
                uid
            }
        });
        if (favor) { // 如果数据库这条记录已经是点过赞了
            throw new global.errors.LikeError();
        }
        return sequelize.transaction(async t => { // 回调函数
            await Favor.create({ // 往数据表添加一条记录
                art_id,
                type,
                uid
            }, { transaction: t })
            const art = await CommonModel.getData(art_id, type, false);
            await art.increment('fav_nums', { // 把对应查询出来的数据的fav_nums字段加1
                by: 1,
                transaction: t
            })
        })
    }

    static async dislike(art_id, type, uid) {

    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}