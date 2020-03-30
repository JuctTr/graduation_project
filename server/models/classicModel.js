const { sequelize } = require('../config/dbConfig');
const {
    Sequelize,
    Model
} = require('sequelize');

// 三个类共同的数据表
const commonFields = {
    title: Sequelize.STRING,
    image: {
        type: Sequelize.STRING,
    },
    content: Sequelize.STRING,
    cardType: Sequelize.TINYINT,
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    pubdate: Sequelize.DATEONLY
}

/**
 * @description 电影类
 */
class Movie extends Model {
    constructor() {

    }
}

Movie.init(commonFields, {
    sequelize,
    tableName: 'classics'
})

/**
 * @description 书籍类
 */
// class Book extends Model {
//     constructor() {
        
//     }
// }

// Book.init(commonFields, {
//     sequelize,
//     tableName: '数据表名'
// })

/**
 * @description 音乐类
 */
// class Music extends Model {
//     constructor() {
        
//     }
// }

// Music.init(commonFields, {
//     sequelize,
//     tableName: '数据表名'
// })

module.exports = {
    Movie,
    // Book,
    // Music
}