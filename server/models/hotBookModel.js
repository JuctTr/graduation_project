const { sequelize }  = require('../config/dbConfig');
const {
    Sequelize,
    Model,
    Op
} = require('sequelize');

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
        console.log(ids, 'id数组查询')
        // const favors = await Favor.findAll({
        //     where:{
        //         art_id:{
        //             [Op.in]:ids,
        //         },
        //         type:400
        //         // 国画
        //         // 漫画
        //     },
        //     group:['art_id'],
        //     attributes:['art_id', [Sequelize.fn('COUNT','*'),'count']]
        // })
        // books.forEach(book=>{
        //      HotBook._getEachBookStatus(book, favors)
        // })
        // //python 二维矩阵
        // return books
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