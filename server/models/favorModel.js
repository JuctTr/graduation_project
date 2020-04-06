const { sequelize }  = require('../config/dbConfig');
const {
    Sequelize,
    Model,
} = require('sequelize');

class Favor extends Model {
    /**
     * @param {Number} art_id 卡片id
     * @param {Number} type 卡片类型
     * @param {Number} uid 用户id
     */
    static async like(art_id, type, uid) {
        /**
         * 两个操作，1、往favor数据表添加一条记录
         *          2、去其他表中使fav_nums这个字段+1
         * 知识点：数据库事务，保证数据的一致性，要不就都改变，要不就都不改变
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
        return sequelize.transaction(async t => {
            await Favor.create({ // 往数据表添加一条记录
                art_id,
                type,
                uid
            }, { transaction: t });
            // const art = await 
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