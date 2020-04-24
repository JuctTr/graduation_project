const { sequelize }  = require('../config/dbConfig');
const {
    Sequelize,
    Model,
    Op,
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
            }, { transaction: t });

            const art = await CommonModel.getData(art_id, type, false);
            // 把对应查询出来的数据的fav_nums字段加1
            await art.increment('fav_nums', { by: 1, transaction: t });
        })
    }
    /**
     * @description 取消点赞
     * @param {Number} art_id 实体表id
     * @param {Number} type 期刊类型
     * @param {Number} uid 用户id
     */
    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        });
        if (!favor) {
            throw new global.errors.DislikeError()
        }
        return sequelize.transaction(async t => {

            await favor.destroy({ force: true, transaction: t });

            const art = await CommonModel.getData(art_id, type, false);

            await art.decrement('fav_nums', { by: 1, transaction: t });
        })
    }

    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type,
            }
        })
        return favor ? true : false;
    }

    static async getMyClassicFavors(uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                type:{
                    [Op.not]:400,
                }
            }
        })
        if(!arts){
            throw new global.errs.NotFound()
        }
       
        return await CommonModel.getList(arts);
    }

    static async getBookFavor(uid, bookID){
        const favorNums = await Favor.count({
            where: {
                art_id: bookID,
                type: 400
            }
        })
        const myFavor = await Favor.findOne({
            where:{
                art_id: bookID,
                uid,
                type: 400
            }
        })
        return {
            fav_nums:favorNums,
            like_status:myFavor ? 1 : 0
        }
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