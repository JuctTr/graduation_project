const { sequelize } = require('../config/dbConfig');
const {
    Sequelize,
    Model,
    Op
} = require('sequelize');
const {
    Movie,
    Music,
    Sentence,
} = require('@models/classicModel');
const { User } = require('@models/userModel');

const {
    flatten
} = require('lodash'); // 展平二维数组

class Community extends Model {
    /**
     * @param {Array} allClassicIds [{ id: 1, index: 1, art_id: 3, type: 200}, {...}, {...}]
     */
    static async getCommunityData(communityUserIds) {
        
    }

    static async getAllIndexData(allClassicIds) {
        const result = [];
        // 查询三种类型的数据
        // 要查询三次in查询
        const allClassicObj = {
            100: { allArtId: [], uid: 0 },
            200: { allArtId: [], uid: 0 },
            300: { allArtId: [], uid: 0 },
            400: { allArtId: [], uid: 0 }
        }
        for(let item of allClassicIds) {
            allClassicObj[item.type].allArtId.push(item.art_id);
            allClassicObj[item.type].uid = item.uid;
        }
        for(let key in allClassicObj) {
            const tempArray = allClassicObj[key].allArtId;
            if (tempArray.length === 0) { // 如果allClassicObj中某一个数组为空值，则不进行查询，跳出当前循环
                continue;
            }
            const art = await Community._getSingleDataByType(tempArray, key, allClassicObj[key].uid);

            result.push(art);
        }
        return flatten(result);
    }
    static async _getSingleDataByType(ids, type, uid) {
        // ids [3, 2, 1, 1]
        let art = null;
        let userInfo = null;
        let result = null;
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        };
        type = parseInt(type); // 传进来的type是字符串"100"，需要转型为数字
        switch (type) {
            case 100:
                art = await Movie.scope('removeTime').findAll(finder);
                userInfo = await Community._getUserInfo(uid)
                result = await Community._pushEveryUserInfo(art, userInfo)
                break;
            case 200:
                art = await Music.scope('removeTime').findAll(finder);
                userInfo = await Community._getUserInfo(uid)
                result = await Community._pushEveryUserInfo(art, userInfo)
                break;
            case 300:
                art = await Sentence.scope('removeTime').findAll(finder);
                userInfo = await Community._getUserInfo(uid)
                result = await Community._pushEveryUserInfo(art, userInfo)
                break;
            case 400:
                // result = await Book.findAll(finder);
                break;
            default:
                break;
        }
        return result;
    }

    /**
     * @desc 根据uid去拿对应的头像地址和昵称
     */
    static async _getUserInfo(uid) {
        const userInfo = await User.findOne({
            // attributes: ['nickname', 'avatarurl']
            where: {
                id: uid
            }
        });
        
        return {
            nickName: userInfo.nickname,
            avatarUrl: userInfo.avatarurl,
        };
    }

    static async _pushEveryUserInfo(art, userInfo) {
        for (let item  of art) {
            item.setDataValue('nickName', userInfo.nickName);
            item.setDataValue('avatarUrl', userInfo.avatarUrl);
        }
        return art;
    }   
}

Community.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.TINYINT
}, {
    sequelize,
    tableName: 'community'
})

module.exports = {
    Community
}