const { sequelize }  = require('../config/dbConfig');
const {
    Sequelize,
    Model,
    Op
} = require('sequelize');
const { Favor } = require('./favorModel');

class HotBook extends Model {
    /**
     * @description 这里要查询一个集合
     * [{
     *      id: 777,
     *      count: 445
     * }, {}, {}, {}]
     */
    static async getAll(){
        const books = await HotBook.findAll({ // 查询数据库中所有的书籍
            order:[
                'index'
            ]
        })
        const ids = [];
        books.forEach(book => { // 如果这里是一个异步操作，不允许在forEach里面的回调函数使用asyns和await，会出现错误
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where:{
                art_id:{
                    [Op.in]: ids,
                },
                type: 400
            },
            group:['art_id'],
            attributes:['art_id', [Sequelize.fn('COUNT','*'),'count']]
        })
        books.forEach(book=>{
            HotBook._getEachBookStatus(book, favors);
        })
        //python 二维矩阵
        return books;
    }

    static _getEachBookStatus(book, favors){
        let count = 0;
        favors.forEach(favor=>{
            if(book.id === favor.art_id){
                count = favor.get('count')
            }
        });
        book.setDataValue('fav_nums',count);
        return book;
    }
}

HotBook.init({
    index: Sequelize.INTEGER, // 排序
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hot_book'
});

module.exports = {
    HotBook
}