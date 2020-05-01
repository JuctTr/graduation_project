const { sequelize } = require('../config/dbConfig');
const {
    Sequelize,
    Model
} = require('sequelize');

// 三个类共同的数据表
const commonFields = {
    title: Sequelize.STRING, // 题目
    image: {
        type: Sequelize.STRING, // 海报图片
    },
    back_image: {
        type: Sequelize.STRING, // 海报背面图片
    },
    content: Sequelize.STRING, // 海报图片上的描述
    type: Sequelize.TINYINT, // 卡片类型（书籍、电影、音乐）
    fav_nums: {
        type: Sequelize.INTEGER, // 点赞人数
        defaultValue: 0
    },
    pubdate: Sequelize.DATEONLY, // 发表日期
}

/**
 * @description 电影类
 */
class Movie extends Model {
    // constructor() { // 这里不能设置这个，会出问题？？？
    //     super();
    // }
}

Movie.init(commonFields, {
    sequelize,
    tableName: 'movie'
})

/**
 * @description 书籍类
 */
// class Book extends Model {

// }

// Book.init(commonFields, {
//     sequelize,
//     tableName: '数据表名'
// })

/**
 * @description 音乐类
 */
class Music extends Model {

}
const musicFields = Object.assign({
    url:Sequelize.STRING
}, commonFields)
Music.init(musicFields, {
    sequelize,
    tableName: 'music'
})

class Sentence extends Model {

}

Sentence.init(commonFields, {
    sequelize,
    tableName: 'sentence'
})

module.exports = {
    Movie,
    // Book,
    Music,
    Sentence,
}