const {
    Movie,
} = require('../models/classicModel');

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
                result = await Movie.findOne(finder);
                break;
            case 200:

                break;
            case 300:

                break;
            case 400:
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