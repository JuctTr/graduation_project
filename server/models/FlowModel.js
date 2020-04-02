const { sequelize } = require('../config/dbConfig');
const {
    Sequelize,
    Model
} = require('sequelize');


class Flow extends Model{

}

Flow.init({
    index: Sequelize.INTEGER, // 期刊的期数
    art_id: Sequelize.INTEGER, // 
    type: Sequelize.INTEGER
},{
    sequelize,
    tableName:'flow'
})

module.exports = {
    Flow
}