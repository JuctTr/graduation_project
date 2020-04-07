const {
    Movie,
    Music,
    Sentence,
} = require('../models/classicModel');
const {
    Op,
} = require('sequelize');
const {
    flatten
} = require('lodash'); // 展平二维数组

/**
 * @param {Number} art_id 每一种类型（电影、书籍、音乐）的实体表中所对应的id
 * @param {Number} type 告知model层该去哪一个实体表查询具体的信息
 */
class CommonModel {
    constructor(art_id, type) {
        this.art_id = art_id;
        this.type = type;
    }   

    static async getData(art_id, type) {
        let result = null;
        const finder = {
            where: {
                id: art_id
            }
        }

        switch (type) {
            case 100:
                result = await Movie.scope('removeTime').findOne(finder);
                break;
            case 200:
                result = await Music.scope('removeTime').findOne(finder);
                break;
            case 300:
                result = await Sentence.scope('removeTime').findOne(finder);
                break;
            case 400:
                // result = await Book.findOne(finder);
                break;
            default:
                break;
        }
        return result;
    }
    /**
     * @param {Array} allClassicIds [{ id: 1, index: 1, art_id: 3, type: 200}, {...}, {...}]
     */
    static async getAllIndexData(allClassicIds) {
        const result = [];
        // 查询三种类型的数据
        // 要查询三次in查询
        const allClassicObj = {
            100: [],
            200: [],
            300: [],
            400: []
        }
        for(let item of allClassicIds) {
            allClassicObj[item.type].push(item.art_id);
        }
        for(let key in allClassicObj) {
            // 如果allClassicObj中某一个数组为空值，则不进行查询，跳出当前循环
            const tempArray = allClassicObj[key];
            if (tempArray.length === 0) {
                continue;
            }
            result.push(await CommonModel._getSingleDataByType(tempArray, key));
        }
        return flatten(result);
    }
    static async _getSingleDataByType(ids, type) {
        // ids [3, 2, 1, 1]
        let result = [];
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
                result = await Movie.scope('removeTime').findAll(finder);
                break;
            case 200:
                result = await Music.scope('removeTime').findAll(finder);
                break;
            case 300:
                result = await Sentence.scope('removeTime').findAll(finder);
                break;
            case 400:
                // result = await Book.findAll(finder);
                break;
            default:
                break;
        }
        return result;        
    }
    
}

module.exports = {
    CommonModel
}